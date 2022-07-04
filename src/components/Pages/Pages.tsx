import React from "react";
import { Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./../Home/Home";

const Pages = () => {
  return (
    <div className="container">
      <Row>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Row>
    </div>
  );
};

export default Pages;
