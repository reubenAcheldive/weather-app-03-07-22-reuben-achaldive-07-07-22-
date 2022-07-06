import React from "react";
import { Col, Row } from "react-bootstrap";
import { useAppSelector } from "../../../Hook/reduxHook";
import { CompleteCities } from "../../../interfaces/Cities.interface";
export interface Props {
  setVal: React.Dispatch<React.SetStateAction<string>>;
  citiesAutoComplete: CompleteCities[] | null;
}
const AutoComplete = ({ setVal, citiesAutoComplete }: Props) => {
  const theme = useAppSelector((state) => state.theme.theme);
  return (
    <Row
      className="text-center mt-5 p-1 "
    
    >
      <Col lg={12} md={12} sm={12} xs={12}   >
        <input
        className={theme ?"input-autocomplete-white" : 'input-autocomplete-dark'}
          type="text"
          onChange={(e) => setVal(e.target.value)}
          list="list-city"
          placeholder="Search for cities..."
        />
        <datalist id="list-city" >
          {citiesAutoComplete &&
            citiesAutoComplete?.map((c, i) => (
              <option key={c.Key}>{c.LocalizedName.toString()}</option>
            ))}
        </datalist>
      </Col>
    </Row>
  );
};

export default AutoComplete;
