import React, { Dispatch, SetStateAction } from "react";
import { Col, Row } from "react-bootstrap";

import { Cities } from "../../interfaces/Cities.modal";
export interface IAutoCompleteSearch {
  cities: Cities[];
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}

const AutoCompleteSearch = ({
  cities,
  query,
  setQuery,
}: IAutoCompleteSearch) => {
  return (
    <Row>
      <Col lg={12} md={12} sm={12} xs={12}>
        <input
          className="input-auto-complete"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          type="text"
          list="cities"
        />
      </Col>
      <Col lg={12} md={12} sm={12} xs={12}>
        <datalist id={"cities"} className="datalist">
          {cities.map((city: Cities, i) => (
            <option  key={city.Key}>
              {" "}
              {city.LocalizedName.toString()} ({city.Country.ID})
            </option>
          ))}
        </datalist>
      </Col>
    </Row>
  );
};

export default AutoCompleteSearch;
