import { configureStore } from "@reduxjs/toolkit";
import  autoCompleteSlice from "./reducers/autoComplete" 
export const store = configureStore({
  reducer: {
    autoComplete:autoCompleteSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
