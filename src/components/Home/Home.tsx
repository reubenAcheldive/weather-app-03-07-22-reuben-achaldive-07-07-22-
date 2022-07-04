import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../Hook/reduxHook";

import AutoCompleteSearch from "./AutoCompleteSearch";
import mocCityData from "../../services/mocData/autoComplete.json";
import { Col, Row } from "react-bootstrap";
import { Cities } from "../../interfaces/Cities.modal";
import WeatherPage from "../Weather/WeatherPage";
const Home = () => {
  const [query, setQuery] = useState<string>("");
  const fetchOptionsBySearch = useAppDispatch();
  const [cities, setCities] = useState<Cities[]>(mocCityData);
  // only for test is not use !
  // const { cities, status } = useAppSelector((state) => state.cities);

  // useEffect(() => {

  //   if (query) {
  //     fetchOptionsBySearch(fetchCitiesBySearch(query));
  //   }
  // }, [fetchOptionsBySearch, query]);
  useEffect(() => {}, [query]);

  return (
    
      <div className="home">
        <Col  className="m-4" >
          <AutoCompleteSearch
            cities={cities}
            query={query}
            setQuery={setQuery}
          />
        </Col>
        <Col lg={12} md={12} sm={12} xs={12}>
          <WeatherPage cities={cities} />
        </Col>
      </div>
    
  );
};

export default Home;
