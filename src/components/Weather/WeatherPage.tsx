import React, { FC, useState } from "react";
import { WeatherDetails } from "./WeatherDetails";
import locationConditions from "../../services/mocData/locationConditions.json";
import { ICurrentConditions } from "../../interfaces/CurrentConditions.modal";
import ForceCastsFiveDay from "../Fo/ForceCastsFiveDay";
import { Cities } from "../../interfaces/Cities.modal";
import { Col, Row } from "react-bootstrap";

const WeatherPage: FC<{ cities: Cities[] }> = ({ cities }) => {
  const [currentConditions, setCurrentConditions] =
    useState<ICurrentConditions[]>(locationConditions);
  return (
    <Row>
      <Col lg={12} md={12} sm={12} xs={12} className="text-center">
        <WeatherDetails currentConditions={currentConditions} cities={cities} />
      </Col>

      <Col >
        <ForceCastsFiveDay />
      </Col>
    </Row>
  );
};

export default WeatherPage;
