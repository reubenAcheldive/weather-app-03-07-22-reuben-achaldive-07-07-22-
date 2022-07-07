import React from "react";

export interface ITemperatureValue {
  Value: number;
  Unit: string;
  UnitType?: number;
}
const TemperatureValue = ({ Unit, Value }: ITemperatureValue) => {
  console.log({Unit, Value})
  return (
    <>
      {" "}
      <span>{Value}&#176;</span>
      <span>{Unit}</span>
    </>
  );
};

export default TemperatureValue;
