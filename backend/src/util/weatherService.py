"""
Weather service layer for interacting with OpenWeatherMap API.
Handles API calls and data transformation.
"""

import httpx
from typing import Dict, Any, List
from datetime import datetime
from fastapi import HTTPException, status
from ..core.settings import settings
from ..schema.weatherSchema import (
    WeatherResponse,
    ForecastResponse,
    LocationSchema,
    CurrentWeatherSchema,
    ForecastItemSchema
)


class WeatherService:
    """Service for fetching and processing weather data."""

    def __init__(self):
        self.api_key = settings.WEATHER_APIKEY
        self.base_url = settings.WEATHER_BASEURL
        self.timeout = 10.0

    async def _make_request(self, endpoint: str, params: Dict[str, Any]) -> Dict[str, Any]:

        params["appid"] = self.api_key
        params["units"] = "metric"

        url = f"{self.base_url}/{endpoint}"

        try:
            async with httpx.AsyncClient(timeout=self.timeout) as client:
                response = await client.get(url, params=params)

                # Handle 404
                if response.status_code == 404:
                    raise HTTPException(
                        status_code=status.HTTP_404_NOT_FOUND,
                        detail="City not found"
                    )

                # Handle other errors
                if response.status_code != 200:
                    raise HTTPException(
                        status_code=status.HTTP_502_BAD_GATEWAY,
                        detail=f"External API error: {response.text}"
                    )

                return response.json()

        except httpx.TimeoutException:
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail="Weather API request timeout"
            )

        except httpx.RequestError as e:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Request failed: {str(e)}"
            )

    def _parse_current_weather(self, data: Dict[str, Any]) -> WeatherResponse:

        location = LocationSchema(
            city=data["name"],
            country=data["sys"]["country"]
        )

        current = CurrentWeatherSchema(
            tempC=round(data["main"]["temp"], 1),
            feelsLikeC=round(data["main"]["feels_like"], 1),
            condition=data["weather"][0]["main"],
            humidity=data["main"]["humidity"],
            windKph=round(data["wind"]["speed"] * 3.6, 1),
            updatedAt=datetime.fromtimestamp(data["dt"])
        )

        return WeatherResponse(location=location, current=current)

    def _parse_forecast(self, data: Dict[str, Any]) -> ForecastResponse:

        location = LocationSchema(
            city=data["city"]["name"],
            country=data["city"]["country"]
        )

        forecast_items: List[ForecastItemSchema] = []

        for item in data["list"][:5]:
            forecast_items.append(
                ForecastItemSchema(
                    time=datetime.fromtimestamp(item["dt"]),
                    tempC=round(item["main"]["temp"], 1),
                    condition=item["weather"][0]["main"],
                    humidity=item["main"]["humidity"],
                    windKph=round(item["wind"]["speed"] * 3.6, 1)
                )
            )

        return ForecastResponse(location=location, forecast=forecast_items)

    async def get_weather_by_city(self, city: str) -> WeatherResponse:

        if not city or not city.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="City name cannot be empty"
            )

        params = {"q": city.strip()}
        data = await self._make_request("weather", params)
        return self._parse_current_weather(data)

    async def get_weather_by_coordinates(self, lat: float, lon: float) -> WeatherResponse:

        if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid latitude or longitude"
            )

        params = {"lat": lat, "lon": lon}
        data = await self._make_request("weather", params)
        return self._parse_current_weather(data)

    async def get_forecast_by_city(self, city: str) -> ForecastResponse:

        if not city or not city.strip():
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="City name cannot be empty"
            )

        params = {"q": city.strip()}
        data = await self._make_request("forecast", params)
        return self._parse_forecast(data)

    async def get_forecast_by_coordinates(self, lat: float, lon: float) -> ForecastResponse:

        if not (-90 <= lat <= 90) or not (-180 <= lon <= 180):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid latitude or longitude"
            )

        params = {"lat": lat, "lon": lon}
        data = await self._make_request("forecast", params)
        return self._parse_forecast(data)


# Singleton instance
weather_service = WeatherService()
