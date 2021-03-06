import { CompleteCities } from "../interfaces/Cities.interface";

import { ICurrentConditions } from "../interfaces/CurrentConditions.interface";
import axios, { AxiosResponse } from "axios";

import { IForceCastsFiveDays } from "../interfaces/ForecastsFiveDays.interface";
export const api_key = process.env.REACT_APP_API_KEY ? process.env.REACT_APP_API_KEY :"H0c4BG7A8HokHMbK5BvzF5GujWGVIG9k";
export const API_URI: string =  process.env.REACT_APP_BASR_URL ? process.env.REACT_APP_BASR_URL : 'http://dataservice.accuweather.com';;
export const instance = axios.create({
  baseURL: API_URI,
  timeout: 1000,
  params: {
    apikey: api_key,
  },
});

export const weatherService = {
  fetchByAutoComplete: async (
    query: string 
  ): Promise<AxiosResponse<CompleteCities[]>> => {
    return await instance.get<CompleteCities[]>(
      `/locations/v1/cities/autocomplete`,
      {
        params: {
          q: query,
        },
      }
    );
  },
  fetchLocationConditions: async (
    Key: string = ""
  ): Promise<AxiosResponse<ICurrentConditions[]>> => {
    return await instance.get<ICurrentConditions[]>(
      `/currentconditions/v1/${Key}`
    );
  },
  fetchForeCastsFiveDays: async (
    Key: string,
    metric: boolean
  ): Promise<AxiosResponse<IForceCastsFiveDays>> => {
    return await instance.get<IForceCastsFiveDays>(
      `/forecasts/v1/daily/5day/${Key}`,
      {
        params: {
          metric,
        },
      }
    );
  },
  fetchLocationByGeoPosition: async ({
    latitude,
    longitude,
  }: {
    latitude: number;
    longitude: number;
  }): Promise<AxiosResponse> => {
    return instance.get(`/locations/v1/cities/geoposition/search`, {
      params: {
        q: `${latitude},${longitude}`,
      },
    });
  },
};
