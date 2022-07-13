import React, { useEffect, useState } from "react";
import { ICurrentConditions } from "../../../interfaces/CurrentConditions.interface";

import { Col, Row } from "react-bootstrap";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";

import { Button } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Hook/reduxHook";
import { CompleteCities } from "../../../interfaces/Cities.interface";

import { saveAndUpdateFavorite } from "../../../utils/localStorage/localStorage";
import {
  insertFavorite,
  removeOne,
} from "../../../state/reducers/FavoritesSlice";

import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import TemperatureValue from "../../UI/TemperatureValue";

export interface Props {
  currentconditions: ICurrentConditions[] | null;
  CompleteCities: CompleteCities[] | null;
  TypeTemperature: boolean;
  val: string;
  cityName: string;
}
const CurrentWeather = ({
  currentconditions,
  CompleteCities,
  TypeTemperature,
  val,
  cityName,
}: Props) => {
  const dispatch = useAppDispatch();

  const { favorites } = useAppSelector((state) => state.favorite);
  const { theme } = useAppSelector((state) => state.theme);
  const { getLocationByGeoPosition } = useAppSelector((state) => state.cities);
  const [like, setLike] = useState<boolean>(false);

  useEffect(() => {
    if (!currentconditions) return;
    const isLocationIsFavorite = favorites?.find(
      ({ EpochTime }: ICurrentConditions) =>
        EpochTime === currentconditions[0].EpochTime
    );
    setLike(isLocationIsFavorite?.EpochTime ? true : false);
  }, [currentconditions, favorites]);

  const addCurrentFavoriteConditions = (
    cityName: string,
    current: ICurrentConditions
  ) => {
    const saveToLocal = {
      cityName,
      ...current,
    };
    saveAndUpdateFavorite(saveToLocal);
    let getCities = JSON.parse(localStorage.getItem("favorites")!)!;
    if (getCities?.length) {
      dispatch(insertFavorite(getCities));
    }
  };
  const deleteItemFavorite = (
    cityName: string,
    current: ICurrentConditions
  ) => {
    let saveToLocal = { cityName, ...current };
    dispatch(removeOne(saveToLocal));
  };
  return (
    <Row className="justify-content-lg-center m-5 p-2 ">
      {currentconditions?.map((current: ICurrentConditions, i) => (
        <div key={current?.EpochTime + i} className={` card${theme} ? "white-mode container-fluid" : "gray-dark-mode  container-fluid"`}>
          <Col>
            <Row>
              <Col xxl={9} xl={8} lg={8} md={8} sm={6} xs={12}>
                <h2>
                  { cityName || getLocationByGeoPosition?.EnglishName|| CompleteCities![0]?.Country?.LocalizedName}
                </h2>
                {TypeTemperature ? (
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
                  {!like ? (
                    <Button
                      type="button"
                      onClick={() =>
                        addCurrentFavoriteConditions(cityName || getLocationByGeoPosition?.EnglishName!, current)
                      }
                    >
                      {" "}
                      <ThumbUpIcon />
                      Favorite
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={() => deleteItemFavorite(cityName||getLocationByGeoPosition?.EnglishName!, current)}
                    >
                      {" "}
                      <ThumbDownOffAltIcon />
                      unFavorite
                    </Button>
                  )}
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
