import { CompleteCities } from "../interfaces/Cities.interface";

import { ICurrentConditions } from "../interfaces/CurrentConditions.interface";
import axios, { AxiosResponse } from "axios";

import { IForceCastsFiveDays } from "../interfaces/forecastsFiveDays.interface";
export const api_key = "ZfdAAARtlvuZN9j7DjwrTTNUAa0R7AAD";
export const API_URI: string = "http://dataservice.accuweather.com";
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
    Key: string
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
      `/forecasts/v1/daily/5day/43543`,
      {
        params: {
          metric,
        },
      }
    );
  },
};
//https://weather.ls.hereapi.com/static/weather/icon/25.png
// "http://dataservice.accuweather.com/forecasts/v1/daily/5day/43543?apikey=0ezmnfK1vYwdTtchYP0rFTBI4NA8XrMH&metric=false"
