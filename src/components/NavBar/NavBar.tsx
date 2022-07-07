import * as React from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useAppDispatch, useAppSelector } from "../../Hook/reduxHook";
import { toggleTemperature } from "../../state/reducers/WeatherSlice";
import { changeThemeToggle } from "../../state/reducers/ThemeModeSlice";

import { Row } from "react-bootstrap";
import { setItemToLocalStorage } from "../../utils/localStorage/localStorage";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";

import BedtimeIcon from "@mui/icons-material/Bedtime";
import LightModeIcon from '@mui/icons-material/LightMode';
import { RiCelsiusLine, RiFahrenheitLine } from 'react-icons/ri';
const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const select = useAppSelector((state) => state.cities);
  const theme = useAppSelector((state) => state.theme.theme);

  const changeTemperature = () => {
    console.log(select.TypeTemperature)
    dispatch(toggleTemperature(!select.TypeTemperature));
    setItemToLocalStorage("temperature", !select.TypeTemperature);
  };
  const changeTheme = () => {

    dispatch(changeThemeToggle(!theme));
    setItemToLocalStorage("theme", !theme);
  };
  return (
    <Row className="mb-5">
      <AppBar id={theme ? "white-mode" : "darker-mode"}>
        <Toolbar className="appBar">
          <Typography
            color="inherit"
            className="title-nav"
            variant="h6"
            component="div"
            sx={{ flexGrow: 3 }}
          >
            Weather App
          </Typography>

          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("favorite")}
          >
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => navigate("/")}
          >
            <HomeIcon />
          </IconButton>
        
        
          {!select.TypeTemperature ? (
            <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id={theme ? "white-mode" : "darker-mode"}

            onClick={changeTemperature}
          >
            <RiFahrenheitLine />
          </IconButton>
          ) : (
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={changeTemperature}
              id={theme ? "white-mode" : "darker-mode"}

            >
              <RiCelsiusLine />
            </IconButton>
          )}

        
          {!theme ? (
            <IconButton
            size="small"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={changeTheme}
          >
            <LightModeIcon />
          </IconButton>
          ) : (
            <IconButton
              size="small"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={changeTheme}
            >
              <BedtimeIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
    </Row>
  );
};

export default NavBar;
