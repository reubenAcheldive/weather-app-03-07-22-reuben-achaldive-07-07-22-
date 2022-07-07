import React from "react";
import { Col, Row } from 'react-bootstrap';
import  moment  from 'moment';
import { DailyForecast, IForceCastsFiveDays } from "../../../interfaces/ForecastsFiveDays.interface";
import { Card } from "@mui/material";
import TemperatureValue from "../../UI/TemperatureValue";
import { useAppSelector } from "../../../Hook/reduxHook";

export interface Props {
    forceCastsFiveDay: IForceCastsFiveDays|null
}
const ForeCastsFiveDays = ({forceCastsFiveDay}:Props) => {

  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <Row>
      <Col>
        <Row className="text-center justify-content-lg-center">
          
          {forceCastsFiveDay?.DailyForecasts.map((val: DailyForecast,i) => (
            <Col key={val.MobileLink+i} className='m-2 itemContainer' xl={2} lg={2} md={2} sm={12} xs={12}>
              <Card  className={theme?"white-mode ":"gray-dark-mode  " }>
                <Row className="m-3"> 
                  <Col>
                    <h4 >{moment(val.Date).format("dddd")}</h4>
                    <h6>{val.Day.IconPhrase}</h6>
                    <img
                      width={100}
                      src={`https://developer.accuweather.com/sites/default/files/0${val.Day.Icon}-s.png`}
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

export default ForeCastsFiveDays;
