import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../Hook/reduxHook";
import { CompleteCities } from "../../../interfaces/Cities.interface";
import { fetchCitiesBySearch } from "../../../state/actions/weather.action";
import { clearCitiesLists } from "../../../state/reducers/WeatherSlice";
export interface Props {
  setval: any;
  citiesAutoComplete: CompleteCities[] | null;
  error: boolean;
  val: string;
}
const AutoComplete = ({ setval, error, val }: Props) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const { citiesAutoComplete } = useAppSelector((state) => state.cities);
  const dispatch = useAppDispatch();
  const debounceSearch = () =>
    setTimeout(
      () => {
        val.length &&
          /^[a-zA-Z\s]*$/.test(val) &&
          dispatch(fetchCitiesBySearch(val));
      },

      1000
    );
  useEffect(() => {
    if (!val.length) dispatch(clearCitiesLists([]));

    const delayDebounceTimeout = debounceSearch();
    return () => clearTimeout(delayDebounceTimeout);
  }, [val]);

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
              onChange={(e) => setval(e.target.value)}
              list="list-city"
              placeholder="Search for cities..."
            />
          </Col>
          <Col lg={12} md={12} sm={12} xs={12}>
            {!error && (
              <p className="text-center m-2">
                {" "}
                Please enter English letters only{" "}
              </p>
            )}
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
