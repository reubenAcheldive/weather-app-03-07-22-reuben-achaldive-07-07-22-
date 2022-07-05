import { createSlice } from "@reduxjs/toolkit";
import { CompleteCities } from "../../interfaces/Cities.interface";
import { ICurrentConditions } from "../../interfaces/CurrentConditions.interface";
import {
  fetchCitiesBySearch,
  fetchCurrentWeather,
  fetchForeCastsFiveDays,
} from "../actions/weather.action";

export interface State {
  currentconditions: ICurrentConditions[] | null;
  cities: CompleteCities[] | null;
  loading: boolean | null;
  error: any | null;
}

const initialState: State = {
  cities: ([] as CompleteCities[]) || null,
  loading: false || null,
  error: null,
  currentconditions: [] || null,
};

const citiesSlice = createSlice({
  name: "auto-complete",
  initialState,
  reducers: {},
  extraReducers: (builder): void => {
    builder
      .addCase(fetchCitiesBySearch.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCitiesBySearch.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cities = payload!.data;
      })
      .addCase(fetchCitiesBySearch.rejected, (state, action) => {
        state.loading = false;
        state.cities = [];
        state.error = action.error.message;
      })
      .addCase(fetchCurrentWeather.pending, (state, actions) => {
        state.loading = true;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, actions) => {
        state.loading = false;
        state.currentconditions = actions.payload!.data;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.cities = [];
        state.error = action.error.message;
      });
  },
});

export const { actions } = citiesSlice;

export default citiesSlice.reducer;
