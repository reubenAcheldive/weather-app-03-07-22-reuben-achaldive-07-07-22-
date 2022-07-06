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
    removeOne: (state, { payload }) => {
      console.log(payload);
      state.favorites = state.favorites?.filter((item: ICurrentConditions) => {
        return (
          item.cityName?.toLocaleLowerCase() !==
          payload?.cityName!.toLocaleLowerCase()
        );
      })!;
     
    if(state.favorites)  localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { insertFavorite, removeOne } = favoritesSlice.actions;

export default favoritesSlice.reducer;
