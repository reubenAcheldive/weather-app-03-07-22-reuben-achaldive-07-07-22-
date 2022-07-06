import { createSlice } from "@reduxjs/toolkit";
import { CompleteCities } from "../../interfaces/Cities.interface";
import { ICurrentConditions } from "../../interfaces/CurrentConditions.interface";
import { IForceCastsFiveDays } from "../../interfaces/forecastsFiveDays.interface";
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
  forceCastsFiveDay: null | IForceCastsFiveDays;
  toggleTypeTemperature: boolean 
}

const initialState: State = {
  cities: ([] as CompleteCities[]) || null,
  loading: false || null,
  error: null,
  currentconditions: null,
  forceCastsFiveDay: null ,
  toggleTypeTemperature: false
};

const citiesSlice = createSlice({
  name: "auto-complete",
  initialState,
  reducers: {
    clearCitiesLists: (state) => {
      state.cities = [];
    },
    toggleTypeTemperature : (state,action) =>{
        state.toggleTypeTemperature = action.payload;
    }
  },
  extraReducers: (builder): void => {
    builder
      .addCase(fetchCitiesBySearch.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCitiesBySearch.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.cities = payload as CompleteCities[];
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
        state.currentconditions = actions.payload as ICurrentConditions[];
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.cities = [];
        state.error = action.error.message;
      })
      .addCase(fetchForeCastsFiveDays.pending, (state, actions) => {
        state.loading = true;
      })
      .addCase(fetchForeCastsFiveDays.fulfilled, (state, actions) => {
        state.loading = false;
        state.forceCastsFiveDay = actions.payload! 
       
      })
      .addCase(fetchForeCastsFiveDays.rejected, (state, action) => {
        state.loading = false;
        state.cities = [];
        state.error = action.error.message;
      });
  },
});

export const { clearCitiesLists,toggleTypeTemperature } = citiesSlice.actions;

export default citiesSlice.reducer;
