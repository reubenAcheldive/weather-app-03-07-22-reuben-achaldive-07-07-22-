import React from 'react';
import { Container, Row } from 'react-bootstrap';

import './App.css';
import NavBar from './components/NavBar/NavBar';
import Pages from './components/Pages/Pages';


function App() {
  
  
  return (
    <Container className="container-fluid" >
      <Row>
      <NavBar/>
      <Pages/>
      </Row>
 
    </Container>
  );
}

export default App;
