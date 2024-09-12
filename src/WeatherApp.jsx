// Pseudo code
// Göra om koden till enskilda komponenter
// Skicka props emellan eller det kanske inte behövs, ju för 
// de "tomma" datan så behövs props


import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather, fetchForecast } from './weatherSlice';
import {
  selectCurrentWeather,
  selectForecast,
  selectWeatherStatus,
  selectWeatherError,
} from './weatherSelectors';

// Fixa filter states för temperatur, nederbörd och vindstyrka t.ex.

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();

  const currentWeather = useSelector(selectCurrentWeather);
  const forecast = useSelector(selectForecast);
  const status = useSelector(selectWeatherStatus);
  const error = useSelector(selectWeatherError);

  const handleSearch = () => {
    if (city) {
      dispatch(fetchWeather(city));
      dispatch(fetchForecast(city));
    }
  };

  // Inline styles
  const containerStyle = {
    textAlign: 'center',
    padding: '20px',
  };

  const searchBarStyle = {
    marginBottom: '20px',
  };

  const inputStyle = {
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#0056b3',
  };

  const cardStyle = {
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    padding: '20px',
    margin: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    display: 'inline-block',
    verticalAlign: 'top',
  };

  const forecastContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const errorMessageStyle = {
    color: 'red',
  };

  return (
    <div style={containerStyle}>
      <h1>Weather App</h1>
      <div style={searchBarStyle}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          style={inputStyle}
        />
        <button
          onClick={handleSearch}
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
        >
          Search
        </button>
      </div>

      {status === 'loading' && <p>Loading...</p>}
      {error && <p style={errorMessageStyle}>{error}</p>}

      {currentWeather && (
        <div style={cardStyle}>
          <h2>Current Weather in {currentWeather.name}</h2>
          <p>Temperature: {currentWeather.main.temp}°C</p>
          <p>Weather: {currentWeather.weather[0].description}</p>
        </div>
      )}

      {forecast && (
        <div style={forecastContainerStyle}>
          <h2>5-Day Forecast</h2>
          {forecast.list.map((item, index) => (
            <div key={index} style={cardStyle}>
              <p>{item.dt_txt}</p>
              <p>Temperature: {item.main.temp}°C</p>
              <p>Weather: {item.weather[0].description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
