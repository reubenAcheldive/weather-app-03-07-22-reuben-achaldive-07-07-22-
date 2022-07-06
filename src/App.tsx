import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
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

function App() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);
  const { toggleTypeTemperature, error } = useAppSelector(
    (state) => state.cities
  );
  useEffect(() => {
    dispatch(
      fetchForeCastsFiveDays({
        Key: "43543",
        metric: getTemporaryValue("temperature"),
      })
    );
  }, [dispatch, toggleTypeTemperature]);

  useEffect(() => {
    const get = getItemForChangeThemeColor("theme");

    dispatch(changeThemeToggle(get));
  }, [dispatch, theme]);

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
  }, [error]);

  return (
    <div
      className={` App ${theme} ? "white-mode container-fluid" : "gray-dark-mode  container-fluid"`}
    >
      <Row
        className={` App ${theme} ? "white-mode container-fluid" : "gray-dark-mode  container-fluid"`}
      >
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
      </Row>
    </div>
  );
}

export default App;
