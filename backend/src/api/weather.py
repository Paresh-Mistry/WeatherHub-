"""
API routes for weather endpoints.
Handles HTTP requests and responses.
"""
from fastapi import APIRouter, Query, HTTPException
from typing import Optional
from ..schema.weatherSchema import WeatherResponse, ForecastResponse, ErrorResponse
from ..util.weatherService import weather_service
from datetime import datetime

router = APIRouter(prefix="/api", tags=["weather"])


@router.get(
    "/weather",
    response_model=WeatherResponse,
    responses={
        404: {"model": ErrorResponse, "description": "City not found"},
        400: {"model": ErrorResponse, "description": "Invalid input"},
        503: {"model": ErrorResponse, "description": "External API error"}
    },
    summary="Get current weather",
    description="Get current weather data for a city or coordinates"
)
async def get_weather(
    city: Optional[str] = Query(None, description="City name (e.g., 'London', 'New York')"),
    lat: Optional[float] = Query(None, description="Latitude coordinate", ge=-90, le=90),
    lon: Optional[float] = Query(None, description="Longitude coordinate", ge=-180, le=180)
) -> WeatherResponse:
    """
    Get current weather data.
    
    Provide either:
    - `city`: City name
    - `lat` and `lon`: Geographic coordinates
    """
    try:
        # Validate input
        if city:
            return await weather_service.get_weather_by_city(city)
        elif lat is not None and lon is not None:
            return await weather_service.get_weather_by_coordinates(lat, lon)
        else:
            raise HTTPException(
                status_code=400,
                detail="Either 'city' or both 'lat' and 'lon' must be provided"
            )
    # except WeatherAPIException as e:
    #     raise HTTPException(status_code=e.status_code, detail=e.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get(
    "/forecast",
    response_model=ForecastResponse,
    responses={
        404: {"model": ErrorResponse, "description": "City not found"},
        400: {"model": ErrorResponse, "description": "Invalid input"},
        503: {"model": ErrorResponse, "description": "External API error"}
    },
    summary="Get weather forecast",
    description="Get weather forecast for the next 5 time points (3-hour intervals)"
)
async def get_forecast(
    city: Optional[str] = Query(None, description="City name (e.g., 'London', 'New York')"),
    lat: Optional[float] = Query(None, description="Latitude coordinate", ge=-90, le=90),
    lon: Optional[float] = Query(None, description="Longitude coordinate", ge=-180, le=180)
) -> ForecastResponse:
    """
    Get weather forecast data.
    
    Provide either:
    - `city`: City name
    - `lat` and `lon`: Geographic coordinates
    
    Returns forecast for the next 5 time points (15 hours in 3-hour intervals).
    """
    try:
        # Validate input
        if city:
            return await weather_service.get_forecast_by_city(city)
        elif lat is not None and lon is not None:
            return await weather_service.get_forecast_by_coordinates(lat, lon)
        else:
            raise HTTPException(
                status_code=400,
                detail="Either 'city' or both 'lat' and 'lon' must be provided"
            )
    # except WeatherAPIException as e:
    #     raise HTTPException(status_code=e.status_code, detail=e.message)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")


@router.get(
    "/health",
    summary="Health check",
    description="Check if the API is running"
)
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy", 
        "message": "Weather API is running",
        "time": datetime.utcnow()
    }