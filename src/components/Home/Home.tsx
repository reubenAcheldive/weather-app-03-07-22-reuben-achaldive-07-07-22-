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

import { insertFavorite } from "../../state/reducers/FavoritesSlice";

const Home = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const [val, setval] = useState<string>("");
  const [cityName, setCityName] = useState<string>();
  const [error, setError] = useState<boolean>(false);
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
    TypeTemperature,
  } = useAppSelector((state) => state.cities);
  const selectTheme = useAppSelector((state) => state.theme);
  const setLocation = async (latitude: number, longitude: number) => {
    await dispatch(fetchLocationByGeoPosition({ latitude, longitude }));
    console.log({ getLocationByGeoPosition }, "text");
  };
  useEffect(() => {
    if (getLocationByGeoPosition) {
      dispatch(fetchCurrentWeather(getLocationByGeoPosition?.Key));

      dispatch(
        fetchForeCastsFiveDays({
          Key: getLocationByGeoPosition?.Key,
          metric: TypeTemperature,
        })
      );
    }
  }, [TypeTemperature, dispatch, getLocationByGeoPosition]);
  useEffect(() => {
    let getCities = JSON.parse(localStorage.getItem("favorites")!)!;

    if (getCities?.length) {
      dispatch(insertFavorite(getCities));
    }
  }, [dispatch]);

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
    setCityName(getLocationByGeoPosition?.EnglishName);
  }, []);
  useEffect(() => {
    const findKeyCity = getKeyOfCity(citiesAutoComplete, val);
    console.log({ findKeyCity });

    if (findKeyCity) {
      dispatch(fetchCurrentWeather(findKeyCity.Key));
      dispatch(
        fetchForeCastsFiveDays({
          Key: findKeyCity.Key,
          metric: TypeTemperature,
        })
      );
      setCityName(findKeyCity.LocalizedName);
    }
  }, [TypeTemperature, val]);

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
            setval={setval}
            error={error!}
            val={val}
          />
        </Col>
        <Col>
          {currentconditions ? (
            <>
              <CurrentWeather
                CompleteCities={citiesAutoComplete}
                currentconditions={currentconditions}
                TypeTemperature={TypeTemperature}
                val={val}
                cityName={cityName!}
              />
              <ForeCastsFiveDays forceCastsFiveDay={forceCastsFiveDay} />
            </>
          ) : (
            <div className="d-flex justify-content-center align-items-center w-100 m-3">
              {getLocationByGeoPosition ? (
                <div
                  className={`spinner-border ${
                    selectTheme.theme ? "text-light" : "text-dark"
                  }`}
                  style={{ width: "3rem", height: "3rem" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                <p className="fw-bold">
                  There is'nt a location to watch, please try to search one with
                  search field above.
                </p>
              )}
            </div>
          )}
        </Col>
      </Card>
    </Row>
  );
};

export default Home;
