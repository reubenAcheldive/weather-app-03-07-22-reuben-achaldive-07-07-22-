import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./NavBar.css"
const NavBar = () => {
    return (
        <>
            <AppBar className='appBar' position="static">
                <Toolbar  className='appBar'>

                    <Typography className='title-nav' variant="h6" component="div" sx={{ flexGrow: 3 }}>
                        Weather App
                    </Typography>
                    <Button color="inherit"><IconButton
                        size="small"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        My Favorite 
                        <FavoriteBorderIcon />
                    </IconButton>
                    </Button>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default NavBar