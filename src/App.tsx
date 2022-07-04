import React from "react";
import { Col, Row } from "react-bootstrap";

import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Pages from "./components/Pages/Pages";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container-fluid">
      <Row>
        <Col lg={12} md={12} sm={12} xs={12}>
          <NavBar />
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <Pages  />
        </Col>
      </Row>
    </div>
  );
}

export default App;
