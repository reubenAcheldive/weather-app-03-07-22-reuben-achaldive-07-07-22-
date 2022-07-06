import { CompleteCities } from "../interfaces/Cities.interface";

import { ICurrentConditions } from "../interfaces/CurrentConditions.interface";
import axios, { AxiosResponse } from "axios";

import { IForceCastsFiveDays } from "../interfaces/forecastsFiveDays.interface";
export const api_key = "cSs2riuGjEBrz8F8O3mbL2Gxmz3ZPnfv";
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
    query: string = "tel aviv"
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
      `/forecasts/v1/daily/5day/${Key}`,
      {
        params: {
          metric,
        },
      }
    );
  },
  fetchLocationByGeoPosition: async (
    latitude: number,
    longitude: number
  ): Promise<AxiosResponse> => {
    return axios.get(`/locations/v1/cities/geoposition/search`, {
      params: {
        q: `${latitude},${longitude}`,
      },
    });
  },
};
//https://weather.ls.hereapi.com/static/weather/icon/25.png
// "http://dataservice.accuweather.com/forecasts/v1/daily/5day/43543?apikey=0ezmnfK1vYwdTtchYP0rFTBI4NA8XrMH&metric=false"
