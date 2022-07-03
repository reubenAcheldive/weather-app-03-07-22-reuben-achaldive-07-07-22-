import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Hook/reduxHook";
import { fetchCitiesBySearch } from "../../state/reducers/citieAutoComplete";

import AutoCompleteSearch from "./AutoCompleteSearch";
import mocCityData from "../../services/mocData/autoComplete.json";
import { Col, Row } from 'react-bootstrap';
import { Cities } from "../../interfaces/Cities.modal";
import WeatherPage from "../Weather/WeatherPage";
const Home = () => {
  const [query, setQuery] = useState<string>("");
  const fetchOptionsBySearch = useAppDispatch();
  const [cities, setCities] = useState<Cities[]>(mocCityData)
  // only for test is not use ! 
  // const { cities, status } = useAppSelector((state) => state.cities);

  // useEffect(() => {

  //   if (query) {
  //     fetchOptionsBySearch(fetchCitiesBySearch(query));
  //   }
  // }, [fetchOptionsBySearch, query]);
  useEffect(() => {
 
    
  
  },[query])

  return (
    <Row>
      <Col lg={12}>
        <AutoCompleteSearch cities={cities} query={query} setQuery={setQuery} />
       
      </Col>
      <Col>
      <WeatherPage/>
      </Col>
    </Row>
  );
};

export default Home;
