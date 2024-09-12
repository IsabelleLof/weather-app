import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    favoriteCities: [],
    settings: {
      temperatureUnit: 'Celsius',
    },
  },
  reducers: {
    addFavoriteCity: (state, action) => {
      state.favoriteCities.push(action.payload);
    },
    removeFavoriteCity: (state, action) => {
      state.favoriteCities = state.favoriteCities.filter(city => city !== action.payload);
    },
    updateSettings: (state, action) => {
      state.settings = { ...state.settings, ...action.payload };
    },
  },
});

export const { addFavoriteCity, removeFavoriteCity, updateSettings } = userSlice.actions;
export default userSlice.reducer;
