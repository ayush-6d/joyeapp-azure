/* eslint-disable react/no-array-index-key */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import { getAuthId, getDbUrl } from 'src/services/localStorage.service';
import { database, firebaseInit } from 'src/services/firebase';
import { Loader } from 'src/components/Loader';
import PieApp from './PieApp';
import PrePieApp from './PrePieApp';
import Popup from 'src/components/Popup';
import "@reach/slider/styles.css";
import "src/resources/css/fonts/fonts.css";
import 'swiper/css/swiper.min.css';
import './assets/styles/prepie.css';
import './assets/styles/index.css';



export const Pie = () => {
  const [data, setData] = useState([]);
  const [load, setLoaderPie] = useState(true);
  const [average, setAverage] = useState(0.0);
  const [emotion, setDominentEmotion] = useState('');
  const [emotionType, setDominentEmotionType] = useState('');
  const [audio, setAudio] = useState('');
  const userId = getAuthId();
  const date = moment().format('DD-MM-yyyy');
  const [popup, setPopup] = React.useState(false);
  const [screenMessage, setScreenMessages] = React.useState([]);
  const [fireBaseUrl, setFireBaseUrl] = useState('');
  const [fireBaseStorage, setFireBaseStorage] = useState('');
  const [showScreen, setShowScreen] = useState('1');
  const dbRef = firebaseInit.database(getDbUrl());
  useEffect(() => {
    setLoaderPie(true);
    setTimeout(async () => {
      const snapshot = await dbRef.ref(`users/${userId}/brew/brewData/${date}`).once('value');
      const brewData = snapshot.val();
      console.log('brewData', brewData);
      if (typeof brewData === 'object' && brewData && brewData.current_avarage) {
        setAverage(brewData.current_avarage);
        setAudio(brewData.podcast);
        setDominentEmotion(brewData.dominantemotion);
        setDominentEmotionType(brewData.type);
      }
      setData(brewData?.pieData);
      setLoaderPie(false);
    }, 5000);
  }, []);

  const random = (mn, mx) => Math.random() * (mx - mn) + mn;

  useEffect(() => {
    if (audio !== 'null') {
      const adObj: any = audio[Math.floor(random(1, audio.length - 1))];
      if (adObj && adObj.app_start_key) {
        console.log(adObj);
        setFireBaseUrl(adObj.url);
        setFireBaseStorage(adObj);
      }
    }
  }, [audio]);
  function togglePopup() {
    setPopup(!popup);
  }
  const stack = require("../../resources/icons/stack_i.png");
  const dominant_mood_info = require("../../resources/icons/dominant_mood_info.png");
  const pie_chart_info = require("../../resources/icons/pie_chart_info.png");
  async function getScreenMessages() {
    const screenMessages = await database.ref('/master/screen_messages/pie_graph').once('value');
    setScreenMessages([/*"Joye level is your wellbeing index at this moment - 10 being excellent, and 1 being low. This is a personal benchmark and is designed to make you aware of your emotions and behaviour. ThSelf-reflection is the starting point to take charge of your wellbeing.",
      "The five moods which constitute our overall wellbeing are: Joy-Sad continuum, Anxiety, Relationships, Motivation and Anger. The pie-chart shows how they stack at this moment. One of these will be the dominant mood and may need the most attention.",
      <img height="30px" width="28px" src={stack} />,*/
      <img width="500px" src={pie_chart_info} />,
      "This is your state of wellbeing at a moment in time. It is your personal benchmark, on a scale of 10. It is natural for the joy-level to be low from time to time - that is when Joye could help you the most with contextual suggestions to take charge of your behaviour and emotions. Though if your joy-level is consistently low for days and weeks, it is time to seek help from your family, friends, manager and other support services - it is recommended to ask for help!",
      "Wellbeing is a mix of the desirable and not-so-desirable emotions and behaviours. Joye has simplified the science of wellbeing to show your state of mind as a mix of 5 mega moods - the pies in the circle: Joyful, Anxiety, Motivation, Relationships, Anger. As you can guess, within each of these there will be a desirable and not-so-desirable state.",
      <img width="500px" src={dominant_mood_info} />,
      "Self-awareness is the starting point to do something about the not-so-desirable state of mind. Joye will help you to measure, understand and behave in ways which will help you to be positive and productive. It will suggest to you how to be in-charge of your wellbeing - as your mentor or a dear friend may have guided you! ",
      "Take charge of your wellbeing!",
      <a href={'/faq'}>FAQ</a>]);
  }

  return (
    <>
      {load && (<Loader display="flex" />)}
      {popup && (<Popup screenMessage={screenMessage} alignStart={true} closePopup={togglePopup} />)}
      {data && data.length > 0
        && (
          showScreen === '1' ? (
            <PrePieApp
              data={data}
              average={average}
              onClickPopup={togglePopup}
              getScreenMessages={getScreenMessages}
              emotion={emotion}
              setShowScreen={setShowScreen}
            />
          )
            :
            <PieApp
              data={data}
              average={average}
              onClickPopup={togglePopup}
              getScreenMessages={getScreenMessages}
              fireBaseUrl={fireBaseUrl}
              fireBaseStorage={fireBaseStorage}
              setShowScreen={setShowScreen}
            />
        )}
    </>
  );
};
