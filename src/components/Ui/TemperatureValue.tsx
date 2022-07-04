import React from "react";
import { Maximum } from "../../interfaces/forecastsFiveDays";
export interface ITemperatureValue {
  Value: number;
  Unit: string;
  UnitType?: number;
}
const TemperatureValue = ({ Unit, Value }: ITemperatureValue) => {
  return (
    <>
      {" "}
      <span>{Value}&#176;</span>
      <span>{Unit}</span>
    </>
  );
};

export default TemperatureValue;
