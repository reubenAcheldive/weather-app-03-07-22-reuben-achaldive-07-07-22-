import React from "react";
import { Row } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from './../components/Home/Home';
import Favorite from './../components/Favorite/Favorite';

export const Pages = () => {
  return (
    <div className="container">
      <Row>
       
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorite" element={<Favorite />} />
            <Route path="*" element={<Home />} />
          </Routes>
        
      </Row>
    </div>
  );
};
