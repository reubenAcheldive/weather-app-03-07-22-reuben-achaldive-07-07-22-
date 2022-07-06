import { createAsyncThunk } from "@reduxjs/toolkit";

import { weatherService } from "../../api/weather.service";
export const fetchCitiesBySearch = createAsyncThunk(
  "fetch/auto-complete/list",
  async (query: string, err) => {
    try {
      const { data } = await weatherService.fetchByAutoComplete(query);
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
      const { data } = await weatherService.fetchLocationConditions(Key);

      return data;
    } catch (error: any) {
      err.rejectWithValue(error.message);
    }
  }
);

export const fetchForeCastsFiveDays = createAsyncThunk(
  "fetch/foreCast/5-days",
  async (payload: { Key: string; metric: boolean }, err) => {
    console.log({ metric: payload.metric });

    try {
      const { data } = await weatherService.fetchForeCastsFiveDays(
        payload.Key,
        (payload.metric = false)
      );
      return data;
    } catch (error: any) {
      err.rejectWithValue(error!.message);
    }
  }
);
