import { FC } from "react";
import Typography from "@mui/material/Typography";
import { Cities } from "../../interfaces/Cities.modal";
import { Col, Row } from "react-bootstrap";
import { ICurrentConditions } from "../../interfaces/CurrentConditions.modal";
import TemperatureValue from "../Ui/TemperatureValue";

export const WeatherDetails: FC<{
  cities: Cities[];
  currentConditions: ICurrentConditions[];
}> = ({ cities, currentConditions }) => {
  return (
    <>
      <Row className="text-center details-container ">
        <Col lg={12} className="">
          <div>
            <Typography gutterBottom variant="h4" component="span">
              <p>{cities[0].LocalizedName}</p>
            </Typography>
            <Typography variant="h6">
              <TemperatureValue
                Value={currentConditions[0].Temperature.Metric.Value}
                Unit={currentConditions[0].Temperature.Metric.Unit}
              />
            </Typography>
            <div>
              <img
                width={200}
                height={100}
                src={`https://developer.accuweather.com/sites/default/files/0${currentConditions[0].WeatherIcon}-s.png`}
                alt=""
              />
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};
