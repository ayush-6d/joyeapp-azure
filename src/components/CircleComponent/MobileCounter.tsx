import * as React from "react";
import "./MobileCircularCounter.scss";
import { useState, useEffect } from "react";



export interface ICircularCounterProps {
  OnClick?: any;
}
let timer = null;

export const MobileCircularCounter = props => {
  const [isBlocked, setIsBlocked] = useState(true);
return (
    <div className="circular_counter">
      <div className="ml-half"></div>
      <div className="mr-half"></div>
    </div>
  );
};

export default MobileCircularCounter;
