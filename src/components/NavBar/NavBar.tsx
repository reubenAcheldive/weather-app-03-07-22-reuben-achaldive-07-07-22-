import * as React from "react";
import AppBar from "@mui/material/AppBar";

import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import { useAppDispatch, useAppSelector } from "../../Hook/reduxHook";
import { toggleTypeTemperature } from "../../state/reducers/WeatherSlice";
import { changeThemeToggle } from "../../state/reducers/ThemeModeSlice";
import { color } from "@mui/system";
import { Row } from "react-bootstrap";
import { setItemToLocalStorage } from '../../utils/localStorage/localStorage';
const NavBar = () => {
  const dispatch = useAppDispatch();
  const select = useAppSelector((state) => state.cities);
  const theme = useAppSelector((state) => state.theme.theme);

  const changeTemperature = () => {
    dispatch(toggleTypeTemperature(!select.toggleTypeTemperature));
    setItemToLocalStorage('temperature',!select.toggleTypeTemperature)
   
  };
  const changeTheme = () => {
    dispatch(changeThemeToggle(!theme));
    setItemToLocalStorage("theme",!theme) 
  };
  return (
    <Row className="mb-5">
      <AppBar id={theme?"white-mode":"darker-mode"}>
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
          >
            My Favorite
            <FavoriteBorderIcon />
          </IconButton>
          <Button   id={theme?"white-mode":"darker-mode"} onClick={changeTemperature}>Change Temperature</Button>
          <Button  id={theme?"white-mode":"darker-mode"} onClick={changeTheme}>Change Theme</Button>
        </Toolbar>
      </AppBar>
    </Row>
  );
};

export default NavBar;
