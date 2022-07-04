import { configureStore } from "@reduxjs/toolkit";
import  citiesSlice from "./reducers/WeatherSlice" 
export const store = configureStore({
  reducer: {
    cities:citiesSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
