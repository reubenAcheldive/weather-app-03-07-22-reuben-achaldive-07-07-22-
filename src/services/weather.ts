import { instance } from "./instance";
import { Cities } from "../interfaces/Cities.modal";

import { ICurrentConditions } from "../interfaces/CurrentConditions.modal";
import { AxiosResponse } from "axios";
import { Key } from "@mui/icons-material";
import { IForceCastsFiveDays } from "../interfaces/forecastsFiveDayes";

export const weatherService = {
  fetchByAutoComplete: async (
    query: string
  ): Promise<AxiosResponse<Cities[]>> => {
    return await instance.get<Cities[]>(`/locations/v1/autocomplete`, {
      params: {
        q: query,
      },
    });
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
  ): Promise<AxiosResponse<IForceCastsFiveDays[]>> => {
    return await instance.get<IForceCastsFiveDays[]>(
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
