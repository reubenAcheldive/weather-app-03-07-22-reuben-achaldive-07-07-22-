import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../Hook/reduxHook";
import AutoComplete from "./Auto-Complete/AutoComplete";
import {
  fetchCitiesBySearch,
  fetchCurrentWeather,
  fetchForeCastsFiveDays,
} from "../../state/actions/weather.action";
import { getKeyOfCity } from "../../utils/getKeyCity";
import { clearCitiesLists } from "../../state/reducers/WeatherSlice";
import CurrentWeather from "./Weather/CurrentWeather";
import { Card } from "@mui/material";
import ForeCastsFiveDays from "./Fore-Cast-Five-Days/ForeCastsFiveDays";
import { ICurrentConditions } from "../../interfaces/CurrentConditions.interface";
import { getCurrentGeoLocation } from "../../utils/Geolocation/locations";
const Home = () => {
  const theme = useAppSelector((state) => state.theme.theme);
  const [val, setVal] = useState<string>("");
  const [favorite, setFavorite] = useState<{
    cityName: string;
    favorite: ICurrentConditions;
  }>();
  const dispatch = useAppDispatch();
  const {
    cities,
    currentconditions,
    error,
    loading,
    forceCastsFiveDay,
    toggleTypeTemperature,
  } = useAppSelector((state) => state.cities);

  useEffect(() => {
    console.log({currentconditions})
    getCurrentGeoLocation(currentconditions);
  },[currentconditions])


  useEffect(() => {
    console.log(toggleTypeTemperature);
    if (!val) {
      console.log(1);
      dispatch(clearCitiesLists());
    }

    const debounceSearch = setTimeout(
      () => dispatch(fetchCitiesBySearch(val)),
      300
    );
    const findKeyCity = getKeyOfCity(cities, val);

    if (findKeyCity) {
      dispatch(fetchCurrentWeather(findKeyCity.Key));
      dispatch(
        fetchForeCastsFiveDays({
          Key: findKeyCity.Key,
          metric: toggleTypeTemperature,
        })
      );
    }
    if (cities?.length) {
      console.log(cities[0].LocalizedName.toString());
    }

    return () => clearTimeout(debounceSearch);
  }, [val, toggleTypeTemperature, dispatch]);

  return (
    <Row className="m-4">
      <Card
        className={theme ? "white-mode" : "darker-mode card"}
        style={{
          minWidth: "15rem",
          minHeight: "15rem",
          border: "1px solid black",
        }}
      >
        <Col>
          <AutoComplete citiesAutoComplete={cities} setVal={setVal} />
        </Col>
        <Col>
          <CurrentWeather
            currentconditions={currentconditions}
            toggleTypeTemperature={toggleTypeTemperature}
            val={val}
            cityName={cities}
          />
          <ForeCastsFiveDays forceCastsFiveDay={forceCastsFiveDay} />
        </Col>
      </Card>
    </Row>
  );
};

export default Home;
