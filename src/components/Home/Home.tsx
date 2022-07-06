import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../Hook/reduxHook";
import AutoComplete from "./Auto-Complete/AutoComplete";
import {
  fetchCitiesBySearch,
  fetchCurrentWeather,
  fetchForeCastsFiveDays,
  fetchLocationByGeoPosition,
} from "../../state/actions/weather.action";
import { getKeyOfCity } from "../../utils/getKeyCity";
import { clearCitiesLists } from "../../state/reducers/WeatherSlice";
import CurrentWeather from "./Weather/CurrentWeather";
import { Card } from "@mui/material";
import ForeCastsFiveDays from "./Fore-Cast-Five-Days/ForeCastsFiveDays";
import { ICurrentConditions } from "../../interfaces/CurrentConditions.interface";
import { unwrapResult } from "@reduxjs/toolkit";
import { insertFavorite } from "../../state/reducers/FavoritesSlice";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
const Home = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const [val, setVal] = useState<string>("");
  const [cityName, setCityName] = useState<string>("tel aviv");
  const [favorite, setFavorite] = useState<{
    cityName: string;
    favorite: ICurrentConditions;
  }>();
  const dispatch = useAppDispatch();
  const {
    citiesAutoComplete,
    currentconditions,
    getLocationByGeoPosition,
    forceCastsFiveDay,
    toggleTypeTemperature,
    error,
  } = useAppSelector((state) => state.cities);

  const setLocation = (latitude: number, longitude: number) => {
    dispatch(fetchLocationByGeoPosition({ latitude, longitude }));

    dispatch(fetchCurrentWeather("212541"));
  };
  useEffect(() => {
    let getCities = JSON.parse(localStorage.getItem("favorites")!)!;
    console.log({getCities});
    
    if (getCities?.length) {
      dispatch(insertFavorite(getCities));
    }
  },[dispatch]);

  // useEffect(()=>{
  //   if(error){
  //     alert(error)
  //   }
  // },[error])

  function getDefaultLocation() {
    if (currentconditions) return;
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }
  function successCallback(position: GeolocationPosition) {
    const {
      coords: { latitude, longitude },
    } = position;
    setLocation(latitude, longitude);
  }
  function errorCallback() {
    dispatch(fetchCurrentWeather("43543"));
  }

  useEffect(() => {
    getDefaultLocation();
  }, []);

  useEffect(() => {
    if (getLocationByGeoPosition?.LocalizedName!) {
    }
    if (!val) {
      dispatch(clearCitiesLists());
      return;
    }

    const debounceSearch = setTimeout(
      () => dispatch(fetchCitiesBySearch(val)),
      300
    );
    const findKeyCity = getKeyOfCity(citiesAutoComplete, val);

    if (findKeyCity) {
      dispatch(fetchCurrentWeather(findKeyCity.Key));
      dispatch(
        fetchForeCastsFiveDays({
          Key: findKeyCity.Key,
          metric: toggleTypeTemperature,
        })
      );
    }
    if (citiesAutoComplete?.length) {
      setCityName(citiesAutoComplete[0].LocalizedName.toString());
    }

    return () => clearTimeout(debounceSearch);
  }, [val, toggleTypeTemperature, dispatch]);

  return (
    <Row className="m-4">
      <Card
        className={theme ? "white-mode m-1" : "darker-mode card m-1"}
        style={{
          minWidth: "15rem",
          minHeight: "15rem",
          border: "1px solid black",
        }}
      >
        <Col>
          <AutoComplete
            citiesAutoComplete={citiesAutoComplete}
            setVal={setVal}
          />
        </Col>
        <Col>
          <CurrentWeather
            CompleteCities={citiesAutoComplete}
            currentconditions={currentconditions}
            toggleTypeTemperature={toggleTypeTemperature}
            val={val}
            cityName={cityName}
          />
          <ForeCastsFiveDays forceCastsFiveDay={forceCastsFiveDay} />
        </Col>
      </Card>
    </Row>
  );
};

export default Home;
