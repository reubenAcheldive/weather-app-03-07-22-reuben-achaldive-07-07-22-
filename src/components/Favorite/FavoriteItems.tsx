import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { ICurrentConditions } from "../../interfaces/CurrentConditions.interface";
import TemperatureValue from "../UI/TemperatureValue";
export interface Props {
  cities: ICurrentConditions[];
  theme: boolean;
  TypeTemperature: boolean;
}
export const FavoriteItems = ({ cities,theme,TypeTemperature }:Props) => {
  return (
    <Row className="text-center justify-content-lg-center">
      {cities?.map((favorite: ICurrentConditions,i) => (
        <Col
          className="itemContainer m-2"
          key={i}
          xl={2}
          lg={2}
          md={2}
          sm={12}
          xs={12}
        >
          <Card className={theme ? "white-mode " : "gray-dark-mode  "}>
            <Row className="m-3">
              <Col>
                <h4>{favorite.cityName}</h4>

                <img
                  width={100}
                  src={`https://developer.accuweather.com/sites/default/files/0${favorite.WeatherIcon}-s.png`}
                  alt=""
                  loading="lazy"
                />

                <Col lg={12}>
                  {TypeTemperature ? (
                    <span>
                      <TemperatureValue
                        Value={favorite.Temperature.Metric.Value}
                        Unit={favorite.Temperature.Metric.Unit}
                      />
                    </span>
                  ) : (
                    <TemperatureValue
                      Value={favorite.Temperature.Imperial.Value}
                      Unit={favorite.Temperature.Imperial.Unit}
                    />
                  )}{" "}
                 
                </Col>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
