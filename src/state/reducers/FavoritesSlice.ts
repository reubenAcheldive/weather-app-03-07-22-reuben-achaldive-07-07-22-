import { createSlice } from "@reduxjs/toolkit";
import { ICurrentConditions } from "../../interfaces/CurrentConditions.interface";

export interface State {
  favorites: ICurrentConditions[] | null;
}

const initialState: State = {
  favorites: null,
};

const favoritesSlice = createSlice({
  name: "auto-complete",
  initialState,
  reducers: {
    insertFavorite: (state, action) => {
      console.log(action.payload);

      state.favorites = action.payload;
    },
    // removeOne : (state,action) =>{
    //    state.favorites = {...state.favorites?.filter((c)=>c.cities.EpochTime !== action.payload.EpochTime)}
    // }
  },
});

export const { insertFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
