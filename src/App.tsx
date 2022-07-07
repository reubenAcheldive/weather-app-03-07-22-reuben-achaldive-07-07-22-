import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "remixicon/fonts/remixicon.css";
import NavBar from "./components/NavBar/NavBar";
import { Pages } from "./Pages/Pages";
import { useAppDispatch, useAppSelector } from "./Hook/reduxHook";
import { ToastContainer, toast } from "react-toastify";

import { changeThemeToggle } from "./state/reducers/ThemeModeSlice";
import {
  getItemForChangeThemeColor,
  getTemporaryValue,

} from "./utils/localStorage/localStorage";
import {
  fetchCurrentWeather,
  fetchForeCastsFiveDays,
} from "./state/actions/weather.action";
import { BrowserRouter } from "react-router-dom";
import { toggleTemperature } from "./state/reducers/WeatherSlice";

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const { TypeTemperature, error } = useAppSelector(
    (state) => state.cities
  );
  useEffect(() => {
    dispatch(
      fetchForeCastsFiveDays({
        Key: "43543",
        metric: getTemporaryValue("temperature"),
      })
    );
  }, [ TypeTemperature]);

  useEffect(() => {
    const getTheme = getItemForChangeThemeColor("theme"); 
    const TypeTemperature = getTemporaryValue("temperature");
     
    dispatch(toggleTemperature(TypeTemperature))
    dispatch(changeThemeToggle(getTheme));
  }, [ theme, TypeTemperature]);

  useEffect(() => {
    if (error)
      toast(error, {
        theme: `${!theme ? "dark" : "light"}`,
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  }, [error, theme]);

  return (
    <div
      className={` App ${theme} ? "white-mode container-fluid" : "gray-dark-mode  container-fluid"`}
    >
      <Row
        className={` App ${theme} ? "white-mode container-fluid" : "gray-dark-mode  container-fluid"`}
      >
        <BrowserRouter>
          <Col lg={12} md={12} sm={12} xs={12}>
            <NavBar />
          </Col>

          <Col lg={12} md={12} sm={12} xs={12}>
            <Pages />
          </Col>
          <ToastContainer
            limit={3}
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
          />
        </BrowserRouter>
      </Row>
    </div>
  );
}

export default App;
