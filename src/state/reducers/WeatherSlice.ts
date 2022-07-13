import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CompleteCities } from "../../interfaces/Cities.interface";
import { ICurrentConditions } from "../../interfaces/CurrentConditions.interface";
import { IForceCastsFiveDays } from "../../interfaces/ForecastsFiveDays.interface";

import { IGeoLocation } from "../../interfaces/GeoPosition.interface";
import {
  fetchCitiesBySearch,
  fetchCurrentWeather,
  fetchForeCastsFiveDays,
  fetchLocationByGeoPosition,
} from "../actions/weather.action";

export interface State {
  currentconditions: ICurrentConditions[] | null;
  citiesAutoComplete: CompleteCities[] | null;
  loading: boolean | null;
  error: string;
  forceCastsFiveDay: null | IForceCastsFiveDays;
  TypeTemperature: boolean;
  getLocationByGeoPosition: IGeoLocation | null;
}

const initialState: State = {
  citiesAutoComplete: ([] as CompleteCities[]) || null,
  loading: false || null,
  error: "",
  currentconditions: null,
  forceCastsFiveDay: null,
  TypeTemperature: false,
  getLocationByGeoPosition: null,
};

const citiesSlice = createSlice({
  name: "auto-complete",
  initialState,
  reducers: {
    clearCitiesLists: (state, { payload }) => {
     
      state.citiesAutoComplete = payload;
     
    },
    toggleTemperature: (state, action) => {
      state.TypeTemperature = action.payload;
    },
  },
  extraReducers: (builder): void => {
    builder
      .addCase(fetchCitiesBySearch.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCitiesBySearch.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.citiesAutoComplete = payload as CompleteCities[];
      })
      .addCase(fetchCitiesBySearch.rejected, (state, { payload }) => {
        state.loading = false;
        state.citiesAutoComplete = [];
        state.error = payload as string;
      })
      .addCase(fetchCurrentWeather.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, actions) => {
        state.loading = false;
        state.currentconditions = actions.payload as ICurrentConditions[];
      })
      .addCase(fetchCurrentWeather.rejected, (state, { payload }) => {
        state.loading = false;

        state.error = payload as string;
      })
      .addCase(fetchForeCastsFiveDays.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(fetchForeCastsFiveDays.fulfilled, (state, actions) => {
        state.loading = false;
        state.forceCastsFiveDay = actions.payload!;
      })
      .addCase(fetchForeCastsFiveDays.rejected, (state, { payload }) => {
        state.loading = false;

        state.error = payload as string;
      })
      .addCase(fetchLocationByGeoPosition.pending, (state, { payload }) => {
        state.loading = true;
      })
      .addCase(fetchLocationByGeoPosition.fulfilled, (state, action) => {
        state.loading = false;
        state.getLocationByGeoPosition = action.payload!;
      })
      .addCase(fetchLocationByGeoPosition.rejected, (state, { payload }) => {
        state.loading = false;

        state.error = payload as string;
      });
  },
});

export const { clearCitiesLists, toggleTemperature } = citiesSlice.actions;

export default citiesSlice.reducer;
