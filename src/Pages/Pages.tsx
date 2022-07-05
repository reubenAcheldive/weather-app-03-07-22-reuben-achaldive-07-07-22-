import React from "react";
import { Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './../components/Home/Home';

export const Pages = () => {
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
