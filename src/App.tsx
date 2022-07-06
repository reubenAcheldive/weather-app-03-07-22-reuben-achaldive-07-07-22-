import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import "./App.css";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/NavBar/NavBar";
import { Pages } from "./Pages/Pages";
import { useAppDispatch, useAppSelector } from "./Hook/reduxHook";
import {
  fetchCurrentWeather,
  fetchForeCastsFiveDays,
} from "./state/actions/weather.action";
import {
  getItemForChangeThemeColor,
  setItemToLocalStorage,
} from "./utils/localStorage/toggleTheme";
import { changeThemeToggle } from "./state/reducers/ThemeModeSlice";

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const { toggleTypeTemperature } = useAppSelector((state) => state.cities);
  useEffect(() => {
    // dispatch(fetchCurrentWeather("43543"));
    // dispatch(
    //   fetchForeCastsFiveDays({ Key: "43543", metric: toggleTypeTemperature })
    // );
  }, []);

  useEffect(() => {
   
    const get = getItemForChangeThemeColor("theme");

    dispatch(changeThemeToggle(get));
  }, [dispatch, theme]);

  return (
    <div
      className={
        theme ? "white-mode container-fluid" : "gray-dark-mode  container-fluid"
      }
    >
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <NavBar />
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Pages />
        </Col>
      </Row>
    </div>
  );
}

export default App;
