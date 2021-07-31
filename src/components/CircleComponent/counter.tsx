import * as React from "react";
import "./CircularCounter.scss";
import { useState, useEffect } from "react";



export interface ICircularCounterProps {
  OnClick?: any;
  start?: any;
  stop?: any;
}
let timer = null;
let seconds = 10;
export const CircularCounter = props => {
  const [isBlocked, setIsBlocked] = useState(true);
 
  useEffect(() => {
    if (seconds === 10) {
        props.start();
    }

    timer = setInterval(() => {
      if (seconds > 0) {
        seconds = seconds - 1;
      } else {
        props.stop();
        seconds=10;
        clearInterval(timer);
      }
    }, 1000);
  }, []);

  
return (
    <div className="circular_counter">
      <div className="l-half"></div>
      <div className="r-half"></div>
    </div>
  );
};

export default CircularCounter;
