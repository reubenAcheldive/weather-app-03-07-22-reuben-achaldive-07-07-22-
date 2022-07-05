import { createAsyncThunk } from "@reduxjs/toolkit";

import { weatherService } from "../../api/weather.service";
export const fetchCitiesBySearch = createAsyncThunk(
  "fetch/auto-complete/list",
  async (query: string, err) => {
    try {
      const data = await weatherService.fetchByAutoComplete(query);
      return data;
    } catch (error: any) {
      err.rejectWithValue(error.message);
    }
  }
);

export const fetchCurrentWeather = createAsyncThunk(
  "fetch/current/conditions",
  async (Key: string, err) => {
    try {
      return await weatherService.fetchLocationConditions(Key);
    } catch (error: any) {
      err.rejectWithValue(error.message);
    }
  }
);

export const fetchForeCastsFiveDays = createAsyncThunk(
  "fetch/foreCast/5-days",
  async (payload: { Key: string; metric: boolean }, err) => {
    try {
      return await weatherService.fetchForeCastsFiveDays(
        payload.Key,
        (payload.metric = false)
      );
    } catch (error: any) {
      err.rejectWithValue(error!.message);
    }
  }
);
