import * as React from "react";
import "./CircularCounter.scss";
import { useState, useEffect } from "react";



export interface ICircularCounterProps {
  OnClick?: any;
}
let timer = null;
let seconds = 10;
export const CircularCounter = props => {
  const [isBlocked, setIsBlocked] = useState(true);
return (
    <div className="circular_counter">
      <div className="l-half"></div>
      <div className="r-half"></div>
    </div>
  );
};

export default CircularCounter;
