import axios from "axios";
import React, { useState } from "react";
import './Weather.css';

const Weather = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeatherData = async () => {
    try {
      const apiKey = '0e5e8b99daba7da39090a67eed2e480b'; // Directly using the API key
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-container">
      <form className="weather-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(event) => setCity(event.target.value)}
          className="city-input"
        />
        <button type="submit" className="get-weather-button">Get Weather</button>
      </form>
      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p className="description">{weatherData.weather[0].description}</p>
          <div className="details">
            <p>Temperature: {Math.round(weatherData.main.temp - 273.15)}°C</p>
            <p>Humidity: {weatherData.main.humidity}%</p>
            <p>Wind Speed: {weatherData.wind.speed} m/s</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
