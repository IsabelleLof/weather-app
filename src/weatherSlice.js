import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Använd miljövariabler i din kod:

// Du kan nu använda process.env.REACT_APP_API_KEY i din kod för 
// att få tillgång till din API-nyckel:

const API_KEY = 'SECRET'; // Hämta API key:n från miljövaribaln
const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

console.log(BASE_URL);

// Api som jag ska använda

// const BASE_URL_NEW = 'https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=2a2e982d80f200c93cf7a88136e99895'

// Thunks för att hämta aktuellt väder och prognos
export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather',
  async (city) => {
    const response = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`); // Så det blir i Celcius inte Kelvin
    return response.data;
  }
);

export const fetchForecast = createAsyncThunk(
  'weather/fetchForecast',
  async (city) => {
    const response = await axios.get(`${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`);
    return response.data;
  }
);

// Slice för väderdata
const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    forecast: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentWeather = action.payload;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchForecast.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.forecast = action.payload;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default weatherSlice.reducer;
