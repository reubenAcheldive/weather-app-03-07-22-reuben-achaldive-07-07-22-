import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

import { weatherService } from "../../api/weather.service";
export const fetchCitiesBySearch = createAsyncThunk(
  "fetch/auto-complete/list",
  async (query: string, err) => {
    try {
      const { data } = await weatherService.fetchByAutoComplete(query);
      return data;
    } catch (error: any) {
      if(error.code=== "ERR_NETWORK") return err.rejectWithValue('Error Network Try letter');
      
    return  err.rejectWithValue('Please try searching another city');
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
      return  err.rejectWithValue('Network Error');
    }
  }
);

export const fetchForeCastsFiveDays = createAsyncThunk(
  "fetch/foreCast/5-days",
  async (payload: { Key: string; metric: boolean }, err) => {
    try {
      const { data } = await weatherService.fetchForeCastsFiveDays(
        payload.Key,
        (payload.metric = false)
      );
      return data;
    } catch (error: any) {
      return  err.rejectWithValue('Network Error');
    }
  }
);

export const fetchLocationByGeoPosition = createAsyncThunk(
  "fetch/locations-by Geolocation",
  async (
    {
      latitude,
      longitude,
    }: {
      latitude: number;
      longitude: number;
    },
    err
  ) => {
    try {
      const { data } = await weatherService.fetchLocationByGeoPosition({
        latitude,
        longitude,
      });
      return data;
    } catch (error:any) {
  
      console.log("🚀 ~ file: weather.action.ts ~ line 67 ~ error", error)
      return  err.rejectWithValue('Network Error');
    }
  }
);
