import React from "react";
import { ICurrentConditions } from "../../../interfaces/CurrentConditions.interface";

import { Col, Row } from "react-bootstrap";

import TemperatureValue from "../../UI/TemperatureValue";
import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Hook/reduxHook";
import { CompleteCities } from "../../../interfaces/Cities.interface";
import currentconditions1 from "../../../mocData/locationConditions.json";
import { saveAndUpdateFavorite } from "../../../utils/localStorage/localStorage";
import { insertFavorite } from "../../../state/reducers/FavoritesSlice";
export interface Props {
  currentconditions: ICurrentConditions[] | null;
  CompleteCities: CompleteCities[] | null;
  toggleTypeTemperature: boolean;
  val: string;
  cityName: string;
}
const CurrentWeather = ({
  currentconditions,
  CompleteCities,
  toggleTypeTemperature,
  val,
  cityName = "tel aviv",
}: Props) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const addCurrentFavoriteConditions = (
    cityName: string,
    current: ICurrentConditions
  ) => {
    const newObject = {
      cityName,
      ...current,
    };
    saveAndUpdateFavorite(newObject);
    let getCities = JSON.parse(localStorage.getItem("favorites")!)!;
    if (getCities?.length) {
      console.log({getCities})
      dispatch(insertFavorite(getCities));
    }
  };
  return (
    <Row className="justify-content-lg-center m-5 p-2 ">
      {currentconditions1?.map((current: ICurrentConditions) => (
        <div key={current?.EpochTime}>
          <Col>
            <Row>
              <Col xxl={9} xl={8} lg={8} md={8} sm={6} xs={12}>
                <h2>{cityName}</h2>
                {toggleTypeTemperature ? (
                  <span>
                    <TemperatureValue
                      Value={current.Temperature.Metric.Value}
                      Unit={current.Temperature.Metric.Unit}
                    />
                  </span>
                ) : (
                  <TemperatureValue
                    Value={current.Temperature.Imperial.Value}
                    Unit={current.Temperature.Imperial.Unit}
                  />
                )}{" "}
                <img
                  src={`https://developer.accuweather.com/sites/default/files/0${current.WeatherIcon}-s.png`}
                  alt=""
                />
              </Col>

              <Col xxl={3} xl={4} lg={4} md={4} sm={6} xs={6}>
                <span>
                  <Button
                    type="button"
                    onClick={() =>
                      addCurrentFavoriteConditions("tel aviv", current)
                    }
                  >
                    {" "}
                    add to favorite
                  </Button>
                </span>
              </Col>
            </Row>
          </Col>
        </div>
      ))}
    </Row>
  );
};

export default CurrentWeather;
