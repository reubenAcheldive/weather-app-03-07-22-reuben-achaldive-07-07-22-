import React, { Dispatch, SetStateAction } from "react";
import { ICurrentConditions } from "../../../interfaces/CurrentConditions.interface";

import { Col, Row } from "react-bootstrap";
import moment from "moment";
import TemperatureValue from "../../UI/TemperatureValue";
import { Button } from "@mui/material";
import { useAppSelector } from "../../../Hook/reduxHook";
import { CompleteCities } from "../../../interfaces/Cities.interface";

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
  cityName,
}: Props) => {
 
  
  const theme = useAppSelector((state) => state.theme.theme);
  const addCurrentFavoriteConditions = () => {};
  return (
    <Row className="justify-content-lg-center m-5 p-2 ">
      {currentconditions?.map((current: ICurrentConditions) => (
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
                    // onClick={() =>
                    //   addCurrentFavoriteConditions("tel aviv", current)
                    // }
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
