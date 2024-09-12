export const selectCurrentWeather = (state) => state.weather.currentWeather;
export const selectForecast = (state) => state.weather.forecast;
export const selectWeatherStatus = (state) => state.weather.status;
export const selectWeatherError = (state) => state.weather.error;
export const selectFavoriteCities = (state) => state.user.favoriteCities;
export const selectUserSettings = (state) => state.user.settings;
