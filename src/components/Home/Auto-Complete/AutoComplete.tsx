import React from "react";
import { Col, Row } from "react-bootstrap";
import { useAppSelector } from "../../../Hook/reduxHook";
import { CompleteCities } from "../../../interfaces/Cities.interface";
export interface Props {
  handleSearch: any;
  citiesAutoComplete: CompleteCities[] | null;
  error: boolean;
}
const AutoComplete = ({ handleSearch, citiesAutoComplete, error }: Props) => {
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <Row className="text-center mt-5 p-1 ">
      <Col lg={12} md={12} sm={12} xs={12}>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <input
              className={
                theme ? "input-autocomplete-white" : "input-autocomplete-dark"
              }
              type="text"
              onChange={(e) => handleSearch(e)}
              list="list-city"
              placeholder="Search for cities..."
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            {!error && <p className="text-center m-2"> Please enter English letters only </p>}
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            <datalist id="list-city">
              {citiesAutoComplete &&
                citiesAutoComplete?.map((c, i) => (
                  <option key={c.Key}>{c.LocalizedName.toString()}</option>
                ))}
            </datalist>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default AutoComplete;
