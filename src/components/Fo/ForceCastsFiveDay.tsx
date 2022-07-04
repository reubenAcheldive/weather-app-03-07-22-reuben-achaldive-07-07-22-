import React, { useState } from "react";
import {
  DailyForecast,
  IForceCastsFiveDays,
} from "../../interfaces/forecastsFiveDays";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import Forecasts from "../../services/mocData/foreCasts5days.json";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import TemperatureValue from "../Ui/TemperatureValue";
const ForceCastsFiveDay = () => {
  const [schema, setSchema] = useState<IForceCastsFiveDays>(Forecasts);

  return (
    <Row>
      <Col>
        <Row className="text-center justify-content-lg-center">
          <h3 className="m-2 p-1">
            {moment(schema.Headline.EffectiveDate).format("MMMM Do YYYY")}
          </h3>
          {schema.DailyForecasts.map((val: DailyForecast) => (
            <Col className="m-2" xl={2} lg={2} md={2} sm={12} xs={12}  >
              <Card >
                <Row>
                  <Col  >
                    <h4>{moment(val.Date).format("dddd")}</h4>
                    <h6>{val.Day.IconPhrase}</h6>
                    <img
                      width={100}
                      src="https://developer.accuweather.com/sites/default/files/02-s.png"
                      alt=""
                      loading="lazy"
                    />

                    <Col lg={12}>
                      <span>
                        <TemperatureValue
                          Unit={""}
                          Value={val.Temperature.Minimum.Value}
                        />
                        -
                        <TemperatureValue
                          Unit={val.Temperature.Maximum.Unit}
                          Value={val.Temperature.Maximum.Value}
                        />
                      </span>
                    </Col>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
};

export default ForceCastsFiveDay;
