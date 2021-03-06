/* eslint-disable react/no-array-index-key */
/* eslint-disable no-mixed-operators */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { getAuthId, getDbUrl } from 'src/services/localStorage.service';
import { database, firebaseInit } from 'src/services/firebase';
import { Loader } from 'src/components/Loader';
import PrePieApp from './PrePieApp';
import Popup from 'src/components/Popup';
import "src/resources/css/fonts/fonts.css";

export const PrePie = () => {
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
  useEffect(() => {
    setLoaderPie(true);
    setTimeout(async () => {
      const dbRef = firebaseInit.database(getDbUrl());
      dbRef.ref(`users/${userId}/brew/brewData/${date}`).once('value').then(async (snapshot) => {
        const brewData = snapshot.val();
        if (typeof brewData === 'object' && brewData && brewData.current_avarage) {
          setAverage(brewData.current_avarage);
          setAudio(brewData.audio);
          setDominentEmotion(brewData.dominantemotion);
          setDominentEmotionType(brewData.type);
        }
        setData(brewData?.pieData);
        setLoaderPie(false);
      });
    }, 5000);
  }, []);

  const random = (mn, mx) => Math.random() * (mx - mn) + mn;

  useEffect(() => {
    if (audio !== 'null') {
      const adObj: any = audio[Math.floor(random(1, audio.length - 1))];
      if (adObj && adObj.app_start_key) {
        database.ref('joye_master_data/stress_buster').orderByChild('app_start_key').equalTo(adObj.app_start_key).once('value')
          .then(async (snapshot) => {
            const audioData = snapshot.val();
            if (audioData) {
              const keys = Object.keys(audioData);
              setFireBaseUrl(audioData[keys[0]].url);
              const dataObj: any = { title: audioData[keys[0]].name, author: audioData[keys[0]].author };
              setFireBaseStorage(dataObj);
            }
          });
      }
    }
  }, [audio]);
  function togglePopup() {
    setPopup(!popup);
  }
  const stack = require("../../resources/icons/stack_i.png");
  async function getScreenMessages() {
    const screenMessages = await database.ref('/master/screen_messages/pie_graph').once('value');
    setScreenMessages(["Joye level is your wellbeing index at this moment - 10 being excellent, and 1 being low. This is a personal benchmark and is designed to make you aware of your emotions and behaviour. ThSelf-reflection is the starting point to take charge of your wellbeing.",
      "The five moods which constitute our overall wellbeing are: Joy-Sad continuum, Anxiety, Relationships, Motivation and Anger. The pie-chart shows how they stack at this moment. One of these will be the dominant mood and may need the most attention.",
      <img height="30px" width="28px" src={stack} />, ,
      "Take charge of your wellbeing!",
      <a href={'/faq'}>FAQ</a>]);
  }
  return (
    <>

      {load && (<Loader display="flex" />)}
      {popup && (<Popup screenMessage={screenMessage} closePopup={togglePopup} />)}
      {data && data.length > 0
        && (
          <PrePieApp
            data={data}
            average={average}
            onClickPopup={togglePopup}
            getScreenMessages={getScreenMessages}
            emotion={emotion}
          />
        )}
    </>
  );
};
