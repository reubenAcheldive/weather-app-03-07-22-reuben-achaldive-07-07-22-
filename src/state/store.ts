import { configureStore } from "@reduxjs/toolkit";
import citiesSlice from "./reducers/WeatherSlice";
import favoriteSlice from "./reducers/FavoritesSlice";
import themeToggleSlice from "./reducers/ThemeModeSlice";
export const store = configureStore({
  reducer: {
    cities: citiesSlice,
    favorite: favoriteSlice,
    theme: themeToggleSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
