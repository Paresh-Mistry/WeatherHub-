"""
Pydantic models for API request/response schemas.
Defines the contract between frontend and backend.
"""
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime


class LocationSchema(BaseModel):
    """Location information schema."""
    city: str = Field(..., description="City name")
    country: str = Field(..., description="Country code (e.g., GB, US)")


class CurrentWeatherSchema(BaseModel):
    """Current weather data schema."""
    temp_c: float = Field(..., alias="tempC", description="Temperature in Celsius")
    feels_like_c: float = Field(..., alias="feelsLikeC", description="Feels like temperature in Celsius")
    condition: str = Field(..., description="Weather condition description")
    humidity: int = Field(..., description="Humidity percentage")
    wind_kph: float = Field(..., alias="windKph", description="Wind speed in km/h")
    updated_at: datetime = Field(..., alias="updatedAt", description="Last update timestamp")
    
    class Config:
        populate_by_name = True


class WeatherResponse(BaseModel):
    """Complete weather response schema."""
    location: LocationSchema
    current: CurrentWeatherSchema


class ForecastItemSchema(BaseModel):
    """Single forecast item schema."""
    time: datetime = Field(..., description="Forecast time")
    temp_c: float = Field(..., alias="tempC", description="Temperature in Celsius")
    condition: str = Field(..., description="Weather condition")
    humidity: int = Field(..., description="Humidity percentage")
    wind_kph: float = Field(..., alias="windKph", description="Wind speed in km/h")
    
    class Config:
        populate_by_name = True


class ForecastResponse(BaseModel):
    """Complete forecast response schema."""
    location: LocationSchema
    forecast: List[ForecastItemSchema]


class ErrorResponse(BaseModel):
    """Error response schema."""
    error: str = Field(..., description="Error message")
    detail: str = Field(None, description="Detailed error information")