/* eslint-disable max-len */
import React from "react";
import Design from "./Design";
import "src/resources/css/util.scss";
import "src/resources/css/global.css";
import "src/resources/css/fonts/fonts.css";

const NewDashboard = (props: any) => {
  const sliderRef = React.useRef([]);
  const [sliderValue, handleSliderValue] = React.useState(5);
  const onMoveImage = (e) => {
    const { pageX } = e.changedTouches[0];
  };
  return (
    <Design
      sliderRef={sliderRef}
      sliderState={sliderValue}
      handleSliderValue={handleSliderValue}
      onMoveImage={onMoveImage}
    />
  );
};

export { NewDashboard };
