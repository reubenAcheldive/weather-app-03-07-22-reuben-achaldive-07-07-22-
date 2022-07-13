import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./favorite.css";
import { useEffect } from "react";
import { ICurrentConditions } from "../../interfaces/CurrentConditions.interface";
import { useAppDispatch, useAppSelector } from "../../Hook/reduxHook";

import { insertFavorite } from "../../state/reducers/FavoritesSlice";

import { FavoriteItems } from "./FavoriteItems";
import { Link } from "react-router-dom";

const Favorite = () => {
  const { favorites } = useAppSelector((state) => state.favorite);
  const { theme } = useAppSelector((state) => state.theme);
  const { TypeTemperature } = useAppSelector((state) => state.cities);

  const [cities, setCities] = useState<ICurrentConditions[]>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (favorites) setCities(favorites);
  }, [favorites]);
  useEffect(() => {
    let getCities = JSON.parse(localStorage.getItem("favorites")!)!;

    if (getCities?.length) {
      dispatch(insertFavorite(getCities));
    }
  }, [dispatch]);

  return (
    <Row>
      <Col>
        {favorites?.length ? (
          <FavoriteItems
            cities={cities!}
            theme={theme}
            TypeTemperature={TypeTemperature}
          />
        ) : (
          <div className="h-100 d-flex justify-content-center align-items-center">
            <div className="text-center">
              <h3>There are no favorite items to show.</h3>
              <p>
                To add item to favorites, please go back to{" "}
                <Link to={"/"}>Home Page</Link>, search for location and click
                "Add to favorites" button.
              </p>
            </div>
          </div>
        )}
      </Col>
    </Row>
  );
};

export default Favorite;
