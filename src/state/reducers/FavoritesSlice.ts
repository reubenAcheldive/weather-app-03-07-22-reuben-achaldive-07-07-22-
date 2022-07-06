import { createSlice } from "@reduxjs/toolkit";
import { ICurrentConditions } from "../../interfaces/CurrentConditions.interface";

export interface State {
  favorites:
    | {
        nameCity: string;
        cities: ICurrentConditions;
      }[]
    | null;
}

const initialState: State = {
  favorites: null,
};

const favoritesSlice = createSlice({
  name: "auto-complete",
  initialState,
  reducers: {
    getFavoriteCities: (state, action) => {
      state.favorites?.concat(action.payload);
    },
    // removeOne : (state,action) =>{
    //    state.favorites = {...state.favorites?.filter((c)=>c.cities.EpochTime !== action.payload.EpochTime)}
    // }
  },
});

export const { getFavoriteCities } = favoritesSlice.actions;

export default favoritesSlice.reducer;
