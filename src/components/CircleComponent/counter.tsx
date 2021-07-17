import * as React from "react";
import "./CircularCounter.scss";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useState } from "react";
export interface ICircularCounterProps {
  OnClick?: any;
}

export const CircularCounter = props => {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [speechStarted, setSpeechStarted] = useState(false);

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  const startSpeech = () => {
    console.log("speech started");
    setSpeechStarted(true);
    SpeechRecognition.startListening();
  };

  return (
    <div className="circular_counter" onClick={startSpeech}>
      <div className="l-half"></div>
      <div className="r-half"></div>
      <p>{transcript}</p>
    </div>
  );
};

export default CircularCounter;
