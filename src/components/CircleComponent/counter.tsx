import * as React from "react";
import "./CircularCounter.scss";
import { useState, useEffect } from "react";
import MicRecorder from "mic-recorder-to-mp3";



export interface ICircularCounterProps {
  OnClick?: any;
  convertBase64?: any;
}
let timer = null;
let seconds = 10;
export const CircularCounter = props => {
  const [isBlocked, setIsBlocked] = useState(true);

  useEffect(() => {
    if (seconds === 10) {
      start();
    }

    timer = setInterval(() => {
      if (seconds > 0) {
        seconds = seconds - 1;
      } else {
        stop();
        clearInterval(timer);
      }
    }, 1000);
  }, []);

  const Mp3Recorder = new MicRecorder({ bitRate: 128 });

  const start = () => {
    Mp3Recorder.start()
      .then(() => {})
      .catch(e => console.error(e));
  };

  const stop = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        
        const file = new File(buffer, "me-at-thevoice.mp3", {
          type: blob.type,
          lastModified: Date.now()
        });
        
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
          props.convertBase64(reader.result);
        };
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="circular_counter">
      <div className="l-half"></div>
      <div className="r-half"></div>
    </div>
  );
};

export default CircularCounter;
