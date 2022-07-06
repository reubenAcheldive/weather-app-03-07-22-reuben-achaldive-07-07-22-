import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./favorite.css";
import { useEffect } from "react";
import { ICurrentConditions } from "../../interfaces/CurrentConditions.interface";
import { useAppDispatch, useAppSelector } from "../../Hook/reduxHook";


import { insertFavorite } from "../../state/reducers/FavoritesSlice";

import { FavoriteItems } from "./FavoriteItems";

const Favorite = () => {
  const { favorites } = useAppSelector((state) => state.favorite);
  const { theme } = useAppSelector((state) => state.theme);
  const { toggleTypeTemperature } = useAppSelector((state) => state.cities);
  
  const [cities, setCities] = useState<ICurrentConditions[]>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (favorites) setCities(favorites);
  }, [favorites]);
  useEffect(() => {
    let getCities = JSON.parse(localStorage.getItem("favorites")!)!;
    console.log({ getCities });

    if (getCities?.length) {
      dispatch(insertFavorite(getCities));
    }
  }, [dispatch]);

  return (
    <Row>
      <Col>
        <FavoriteItems cities={cities!} theme={theme} toggleTypeTemperature={toggleTypeTemperature} />
      </Col>
    </Row>
  );
};

export default Favorite;
