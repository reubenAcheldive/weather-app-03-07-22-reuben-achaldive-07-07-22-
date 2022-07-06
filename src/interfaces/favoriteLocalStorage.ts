import { Temperature } from "./CurrentConditions.interface";


    export interface IFavoriteLocalStorage {
        cityName?: string;
        LocalObservationDateTime: Date;
        EpochTime: number;
        WeatherText: string;
        WeatherIcon: number;
        HasPrecipitation: boolean;
        PrecipitationType?: any;
        IsDayTime: boolean;
        Temperature: Temperature;
        MobileLink: string;
        Link: string;
    }
