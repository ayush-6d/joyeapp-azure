/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-loop-func */
/* eslint-disable react/no-danger */
/* eslint-disable indent */
/* eslint-disable no-undef */
/* eslint-disable max-len */
/* eslint-disable no-mixed-operators */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
/* eslint-disable no-multi-assign */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-await-in-loop */
/* eslint-disable react/jsx-indent */
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { anime } from "react-anime";
import moment from "moment";
import { database, firebaseInit } from "src/services/firebase";
import {
  shuffle,
  weightedValue,
  mappingMessages,
  pieLogic,
  EMOTIONS_MASTER,
  EMOTIONS,
} from "src/utilities/helper";
import useWindowDimensions from "src/utilities/useWindowDimensions";
import { getAuthId, getDbUrl } from "src/services/localStorage.service";
import { Loader } from "src/components/Loader";
import "src/resources/css/fonts/fonts.css";
import HandPic from "src/resources/icons/hand1.gif";
import ArrowPic from "src/resources/icons/arrow.png";
// import InfoPic from "src/resources/icons/info.svg";
import InfoPic from "src/resources/icons/whiteinfo.png";

import Popup from "src/components/Popup";

const startColor = {
  joyful: "#00EAFF",
  irritable: "#FFEE00",
  motivated: "#75FF00",
  social: "#FF07BF",
  anxious: "#CDA7FB",
  active: "#CDA7FB",
  optimistic: "#FFEE00",
};
const stopColor = {
  joyful: "#006CFF",
  irritable: "#FF2267",
  motivated: "#007026",
  social: "#FD83F2",
  anxious: "#6A2EDF",
  active: "#6A2EDF",
  optimistic: "#007026",
};

const Design = (props: any) => {
  const { height, width } = useWindowDimensions();
  const [counter, setCounter] = React.useState(0);
  const [isFirstTimeLoad, setFirstTimeLoad] = React.useState(true);
  const [isFirstTimeLoadIcon, setFirstTimeLoadIcon] = React.useState(true);
  const [sliders, setSliders] = React.useState([]);
  const [loading, setLoadingData] = React.useState(true);
  const [popup, setPopup] = React.useState(false);
  const [screenMessage, setScreenMessages] = React.useState([]);
  const [imagePos, setImagePos] = React.useState(null);
  const rangeWrapper = React.useRef(null);
  const rangeInput = React.useRef(null);
  const rangeValues = React.useRef(null);
  const rangeValueNumberTop = React.useRef(null);
  const rangeValueNumberBottom = React.useRef(null);
  const rangeSliderPaths = React.useRef(null);
  const svgWidth = width;
  const svgHeight = height;
  let mouseX = 0;
  let mouseY = 0;
  let mouseInitialX = 0;
  let mouseDx = 0;
  const mouseDxLimit = 150;
  const mouseDxFactor = 3;
  const max = 10;
  let rangeMin = 0;
  let rangeMax = 9;
  let rangeValue = props.sliderValue || 5;
  const rangeWidth = svgWidth;
  let currentX = (rangeWidth * rangeValue) / max;
  const rangeMinX = (rangeWidth * rangeMin) / max;
  const rangeMaxX = (rangeWidth * rangeMax) / max;
  const scaleMax = 0.32;
  let scale;
  let newPath;
  let newX;
  let newSliderX = 0;
  let lastMouseDx = 0;
  let rangeWrapperLeft;
  let pageY;
  let pageX;

  const updateValue = () => {
    setFirstTimeLoad(false);
    setFirstTimeLoadIcon(false);
    if (rangeSliderPaths.current) {
      anime.remove([rangeValues.current, rangeSliderPaths.current]);
    }
    // rangeValue = parseInt((currentX * max) / rangeWidth, 4);
    let curr = (currentX * max) / rangeWidth;
    rangeValue = parseInt(curr.toString(), 10);
    scale = ((rangeValue - rangeMin) / (rangeMax - rangeMin)) * scaleMax;
    rangeInput.current.value = rangeValue;
    rangeValueNumberTop.current.innerText = max - rangeValue;
    rangeValueNumberBottom.current.innerText = 10 - rangeValue;
    rangeValues.current.style.transform = `translateX(${rangeWidth} - ${currentX}%)`;
    setImagePos(`translateX(${rangeWidth - currentX - 90}px)`);
    rangeValueNumberTop.current.style.transform = `scale(1 - ${scale})`;
    rangeValueNumberBottom.current.style.transform = `scale(1 - (${scaleMax} - ${scale}))`;
    if (Math.abs(mouseDx) < mouseDxLimit) {
      lastMouseDx = mouseDx;
    } else {
      lastMouseDx = mouseDx < 0 ? -mouseDxLimit : mouseDxLimit;
    }

    newSliderX = currentX + lastMouseDx / mouseDxFactor;

    if (newSliderX < rangeMinX || newSliderX > rangeMaxX) {
      newSliderX = newSliderX < rangeMinX ? rangeMinX : rangeMaxX;
    }

    newPath = buildPath(lastMouseDx, rangeWidth - newSliderX);
    rangeSliderPaths.current.setAttribute("d", newPath);
  };

  function mouseDown(e) {
    mouseX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
    mouseInitialX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
    rangeWrapperLeft = rangeWrapper.current.getBoundingClientRect().left;
  }

  function mouseMove(e) {
    if (mouseX) {
      pageY = e.targetTouches ? e.targetTouches[0].pageY : e.pageY;
      pageX = e.targetTouches ? e.targetTouches[0].pageX : e.pageX;
      if (
        isFirstTimeLoad &&
        pageY > 40 &&
        pageY < 70 &&
        pageX > 300 &&
        pageX < 400
      ) {
        return;
      }
      mouseY = pageY - rangeWrapperLeft;
      mouseDx = (pageX - mouseInitialX) * mouseDxFactor;
      newX = currentX + mouseX - pageX;
      if (newX >= rangeMinX && newX <= rangeMaxX) {
        currentX = newX;
        mouseX = pageX;
      } else {
        currentX = newX < rangeMinX ? rangeMinX : rangeMaxX;
      }
      updateValue();
    }
  }

  function mouseUp() {
    if (mouseDx) {
      elasticRelease();
    }
    mouseX = mouseDx = 0;
  }

  React.useEffect(() => {
    database
      .ref("/master/sub_sliders")
      .once("value")
      .then(async (snapshot) => {
        let subSliders = snapshot.val();
        const slidersData = [];
        let flag = true;
        if (subSliders !== null) {
          for (let i = 0; i < 5; i += 1) {
            const shuffleSubSliders = shuffle(subSliders);
            if (flag) {
              const slider = await shuffleSubSliders.find(
                (ele) => ele.type === "Positive"
              );
              const key: string = Object.keys(EMOTIONS)
                .filter((em) => slider.name.toLowerCase() === em.toLowerCase())
                .toString();
              const emotion = EMOTIONS[key];
              const sliderTitles = await shuffle(emotion.slider);
              slider.name = slider.name;
              slider.showName = sliderTitles[0];
              subSliders = await shuffleSubSliders.filter((ele) => {
                if (ele.slider !== slider.slider) return ele;
                return null;
              });
              slider.value = 0;
              slidersData.push(slider);
            } else if (!flag) {
              const slider = await shuffleSubSliders.find(
                (ele) => ele.type === "Negative"
              );
              const key: string = Object.keys(EMOTIONS)
                .filter((em) => slider.name.toLowerCase() === em.toLowerCase())
                .toString();
              const emotion = EMOTIONS[key];
              const sliderTitles = await shuffle(emotion.slider);
              // slider.name = emotion;
              slider.showName = sliderTitles[0];
              slider.name = slider.name;
              subSliders = await shuffleSubSliders.filter((ele) => {
                if (ele.slider !== slider.slider) return ele;
                return null;
              });
              slider.value = 0;
              slidersData.push(slider);
            }
            flag = !flag;
          }
          setSliders(slidersData);
          setLoadingData(false);
        }
      });
  }, []);

  React.useEffect(() => {
    props.sliderRef.current.push(React.createRef());
    if (
      rangeWrapper.current !== null &&
      rangeInput.current !== null &&
      rangeValues.current !== null &&
      rangeValueNumberTop.current !== null &&
      rangeValueNumberBottom.current !== null &&
      rangeSliderPaths.current !== null
    ) {
      rangeMin = parseInt(rangeInput.current.min, 10);
      rangeMax = parseInt(rangeInput.current.max, 10);
      rangeValue = parseInt(rangeInput.current.value, 10);
      rangeWrapper.current.addEventListener("mousedown", mouseDown);
      rangeWrapper.current.addEventListener("touchstart", mouseDown);
      rangeWrapper.current.addEventListener("mousemove", mouseMove);
      rangeWrapper.current.addEventListener("touchmove", mouseMove);
      rangeWrapper.current.addEventListener("mouseup", mouseUp);
      rangeWrapper.current.addEventListener("mouseleave", mouseUp);
      rangeWrapper.current.addEventListener("touchend", mouseUp);
      updateValue();
      setFirstTimeLoad(true);
      setFirstTimeLoadIcon(true);
      setLoadingData(true);
      return () => {
        rangeWrapper.current.removeEventListener("mousedown", mouseDown);
        rangeWrapper.current.removeEventListener("touchstart", mouseDown);
        rangeWrapper.current.removeEventListener("mousemove", mouseMove);
        rangeWrapper.current.removeEventListener("touchmove", mouseMove);
        rangeWrapper.current.removeEventListener("mouseup", mouseUp);
        rangeWrapper.current.removeEventListener("mouseleave", mouseUp);
        rangeWrapper.current.removeEventListener("touchend", mouseUp);
      };
    }
  }, [
    rangeWrapper,
    rangeInput,
    rangeValues,
    rangeValueNumberTop,
    rangeValueNumberBottom,
    rangeSliderPaths,
  ]);

  function resetValue() {
    props.sliderRef.current.push(React.createRef());
    if (
      rangeWrapper.current !== null &&
      rangeInput.current !== null &&
      rangeValues.current !== null &&
      rangeValueNumberTop.current !== null &&
      rangeValueNumberBottom.current !== null &&
      rangeSliderPaths.current !== null
    ) {
      rangeMin = parseInt(rangeInput.current.min, 10);
      rangeMax = parseInt(rangeInput.current.max, 10);
      rangeValue = parseInt(rangeInput.current.value, 10);
      rangeWrapper.current.addEventListener("mousedown", mouseDown);
      rangeWrapper.current.addEventListener("touchstart", mouseDown);
      rangeWrapper.current.addEventListener("mousemove", mouseMove);
      rangeWrapper.current.addEventListener("touchmove", mouseMove);
      rangeWrapper.current.addEventListener("mouseup", mouseUp);
      rangeWrapper.current.addEventListener("mouseleave", mouseUp);
      rangeWrapper.current.addEventListener("touchend", mouseUp);
      updateValue();
      setFirstTimeLoad(true);
    }
  }
  // const rangeWrapper = document.querySelector('.range__wrapper');

  function buildPath(dy, ty) {
    return `M 0 ${ty} q ${mouseY}  ${dy}  ${svgHeight} 0 l 0 ${svgWidth} l -${svgHeight} 0 Z`;
  }

  function elasticRelease() {
    anime({
      targets: rangeSliderPaths.current,
      d: buildPath(
        -lastMouseDx * 1.3,
        rangeWidth - (currentX - lastMouseDx / mouseDxFactor)
      ),
      duration: 150,
      easing: "linear",
      complete() {
        anime({
          targets: rangeSliderPaths.current,
          d: buildPath(0, rangeWidth - currentX),
          duration: 4000,
          elasticity: 880,
        });
      },
    });

    anime({
      targets: rangeValues.current,
      translateX: rangeWidth - (currentX + lastMouseDx / mouseDxFactor / 4),
      duration: 150,
      easing: "linear",
      complete() {
        anime({
          targets: rangeValues.current,
          translateX: rangeWidth - currentX,
          duration: 4000,
          elasticity: 880,
        });
      },
    });
  }

  const prevCounterRef: any = React.useRef();

  useEffect(() => {
    prevCounterRef.current = counter;
  });

  const prevCounter = prevCounterRef.current;

  if (counter !== prevCounter) {
    if (rangeValueNumberBottom.current) {
      rangeValueNumberBottom.current.innerText = 5;
    }
    // console.log(`now count ${counter} and prev counter ${prevCounter}`);
  }

  const setSlidersVal = (cnt, val) => {
    if (sliders && sliders[cnt])
      sliders[cnt].value = val;
  };

  useEffect(() => {
    if (sliders.length > 0 && rangeValueNumberBottom.current !== null) {
      sliders[counter].value = rangeValueNumberBottom.current.innerText;
    }
  }, [rangeValueNumberBottom, rangeValueNumberBottom.current]);

  const random = (mn, mx) => Math.random() * (mx - mn) + mn;
  const getMessages = async (pieResp) => {
    let sprint;
    if (mappingMessages[pieResp.x][pieResp.y] === "Nutral") {
      sprint = await database
        .ref(
          `joye_master_data/sprint_new/default_application_messages/${pieResp.x}`
        )
        .once("value");
      sprint = sprint.val();
      sprint = sprint[Math.floor(random(1, sprint.length - 1)) - 1];
      var desc = String(sprint); // TODO
      var theme = 1;
      return { desc, theme };
    }
    sprint = await database
      .ref(`joye_master_data/sprint_new/${mappingMessages[pieResp.x].type}`)
      .orderByChild("title")
      .equalTo(pieResp.x)
      .once("value");
    sprint = await sprint.val();
    if (sprint && Array.isArray(sprint)) {
      sprint.map((item) => {
        sprint = item[mappingMessages[pieResp.x][pieResp.y]];
        // sprint.push(item[mappingMessages[pieResp.x][pieResp.y]]);
        return true;
      });
      if (sprint) {
        sprint = sprint[Math.floor(random(1, sprint.length)) - 1];
      }
    } else if (typeof sprint === "object") {
      const keys = Object.keys(sprint);
      sprint = sprint[keys[0]][mappingMessages[pieResp.x][pieResp.y]];
      sprint = sprint[Math.floor(random(1, sprint.length)) - 1];
    }
    var desc = String(sprint);
    var theme = Number(desc.slice(desc.length - 4, desc.length - 2));
    desc = desc.slice(0, desc.length - 7);
    return { desc, theme };
    // return sprint
  };

  async function getJournalQuestion(theme,prevDetail) {
    let orgTheme = theme;
    if (orgTheme.toString().length < 2) {
      orgTheme = (0 + `${theme}`).slice(-2)
    }
    let jQuestion = prevDetail?.journalQuestion || '';
    let todaysFeeling = prevDetail?.todaysFeeling || '';

    if (jQuestion.length > 0 && todaysFeeling.length > 0) {
      return jQuestion;
    } else {
      let journalQuestion: any = await database
        .ref(
          `joye_master_data/sprint_new/theme/${orgTheme}/journal_question`
        )
        .once("value");
      journalQuestion = await journalQuestion.val();
      console.log(journalQuestion)
      return journalQuestion[Math.floor(random(1, journalQuestion.length || 0)) - 1];
    }
  }

  async function getCongratulationQuestion(theme) {
    let orgTheme = theme;
    if (orgTheme.toString().length < 2) {
      orgTheme = (0 + `${theme}`).slice(-2)
    }
    console.log('getCongratulationQuestionTheme', orgTheme);
    let congratulationQuestion: any = await database
      .ref(
        `joye_master_data/sprint_new/theme/${orgTheme}/congratulations_questions`
      )
      .once("value");
    congratulationQuestion = await congratulationQuestion.val();
    return congratulationQuestion[Math.floor(random(1, congratulationQuestion.length || 0)) - 1];
  }

  async function getPodcast(theme) {
    let orgTheme = theme;
    if (orgTheme.toString().length < 2) {
      orgTheme = (0 + `${theme}`).slice(-2)
    }
    console.log('getPodcastTheme', orgTheme);
    let podcast: any = await database
      .ref(
        `joye_master_data/sprint_new/theme/${orgTheme}/podcasts`
      )
      .once("value");
    podcast = await podcast.val();
    return podcast;
  }



  const getAudio = async (pieResp) => {
    let sprint;
    console.log('${mappingMessages[pieResp.x].type}', mappingMessages[pieResp.x].type);
    sprint = await database
      .ref(`joye_master_data/sprint_new/${mappingMessages[pieResp.x].type}`)
      .orderByChild("title")
      .equalTo(pieResp.x)
      .once("value");
    sprint = sprint.val();
    console.log('sprint', sprint);
    if (sprint && Array.isArray(sprint)) {
      sprint.map((item) => {
        sprint = item.audio[mappingMessages[pieResp.x][pieResp.y]];
        return true;
      });
    } else if (typeof sprint === "object") {
      const keys = Object.keys(sprint);
      sprint = sprint[keys[0]].audio[mappingMessages[pieResp.x][pieResp.y]];
    }
    if (!sprint) {
      sprint = "null";
    }
    console.log('sprint final', sprint);
    return sprint;
  };

  // getAudio({ x: 'Social', y: 7 });
  const dateWiseAvarage = (allUserDetail) => {
    const keys = Object.keys(allUserDetail);
    const startOfWeek = moment().startOf("isoWeek").format("DD-MM-yyyy");
    const endOfWeek = moment().endOf("isoWeek").format("DD-MM-yyyy");
    const avarages = {};
    let count = 0;
    for (let i = 0; i < keys.length; i += 1) {
      const user = allUserDetail[keys[i]].brew
        ? allUserDetail[keys[i]].brew.brewData
        : null;
      if (user) {
        count += 1;
        const userKeys = Object.keys(user);
        for (let j = 0; j < userKeys.length; j += 1) {
          if (userKeys[j] >= startOfWeek && userKeys[j] <= endOfWeek) {
            if (!avarages[userKeys[j]]) {
              avarages[userKeys[j]] = 0;
            }
            avarages[userKeys[j]] += parseFloat(user[userKeys[j]].avarage);
          }
        }
      }
    }
    const avaragesKeys = Object.keys(avarages);
    for (let k = 0; k < avaragesKeys.length; k += 1) {
      avarages[avaragesKeys[k]] /= count;
    }
    return avarages;
  };

  const submit = async (slider) => {
    // debugger;
    // console.log("Submit::: ", slider);
    const userId = getAuthId();
    const date = moment().format("DD-MM-yyyy");
    const weekOfYear = moment().format("w_yyyy");
    const brewData: any = {
      date,
    };
    let avg = 0;
    let dominantemotion = "";
    let maxval = 0;
    let pieData = [];
    let type = "";
    let dayTotal = 0;
    const audio = [];
    // console.log("getDbUrl:: ", getDbUrl());
    try {
      const dbRef = firebaseInit.database(getDbUrl());
      let prevDetail: any = await dbRef
        .ref(`users/${userId}/brew/brewData/${date}`)
        .once("value");
      prevDetail = await prevDetail.val();
      // console.log('prevDetail', prevDetail);
      if (prevDetail !== null && prevDetail.day_total) {
        dayTotal += Number(prevDetail.day_total);
      }
      let oldDominant = '';
      for (let i = 0; i < slider.length; i += 1) {
        const value = pieLogic[slider[i].value];
        if (Number(maxval) <= Number(value)) {
          dominantemotion = slider[i].name;
          maxval = pieLogic[slider[i].value];
          type = mappingMessages[slider[i].name][slider[i].value];
        }
        let dayValueSum = 0;
        if (prevDetail !== null) {
          if (prevDetail[slider[i].slider]) {
            dayValueSum +=
              Number(prevDetail[slider[i].slider].day_value_sum) || 0;
          }
        }
        const weightvalue = await weightedValue(
          slider[i].weight,
          slider[i].value
        );
        avg += parseInt(weightvalue.toString(), 10);
        // avg += parseInt(slider[i].value, 10);
        const brewSlider = {
          value: slider[i].value,
          weightvalue,
          sub_slider: slider[i].name,
          // day_value_sum: Number(dayValueSum) + Number(slider[i].value),
        };
        dayTotal += Number(slider[i].value);
        // @ts-ignore: Type 'string[]' cannot be used as an index type.
        brewData[[slider[i].slider]] = brewSlider;
        brewData.dominantemotion = dominantemotion;
        brewData.type = type;

        const emotion = EMOTIONS_MASTER.filter(
          (em) => em.emotion.toLowerCase() === slider[i].slider.toLowerCase()
        );
        const messages = await getMessages({
          x: slider[i].name,
          y: slider[i].value,
        });
        if (oldDominant !== dominantemotion) {
          brewData.theme = messages.theme;
          oldDominant = dominantemotion;
          console.log('dominantemotion', dominantemotion, messages.theme, brewData.theme);
        }
        pieData.push({
          title: slider[i].name,
          color: emotion[0].color,
          value: Number.parseInt(pieLogic[slider[i].value], 10),
          slider_value: Number.parseInt(slider[i].value, 10),
          // desc: await getMessages({
          //     x: slider[i].name,
          //     y: slider[i].value,
          //   }),
          desc: messages.desc,
          sColor: emotion[0].sColor,
          cColor: emotion[0].cColor,
        });
      }
      brewData.journalQuestion = await getJournalQuestion(brewData.theme, prevDetail);
      brewData.congratulationQuestion = await getCongratulationQuestion(brewData.theme);
      brewData.podcast = await getPodcast(brewData.theme);

      for (let s = 0; s < slider.length; s += 1) {
        let dayValueSum = 0;
        if (prevDetail !== null) {
          if (prevDetail[slider[s].slider]) {
            dayValueSum +=
              Number(prevDetail[slider[s].slider].day_value_sum) || 0;
          }
        }
        // const day_value_sum = (brewData[[slider[s].slider]].weightvalue / avg).toFixed(2);
        // @ts-ignore: Type 'string[]' cannot be used as an index type.
        const day_value_sum = brewData[[slider[s].slider]].value;
        // @ts-ignore: Type 'string[]' cannot be used as an index type.
        brewData[[slider[s].slider]].day_value_sum =
          Number(day_value_sum) + dayValueSum;
      }

      pieData.sort((a, b) => {
        if (a.value > b.value) {
          return -1;
        }
        if (a.value < b.value) {
          return 1;
        }
        return 0;
      });
      pieData = pieData.map((o, i) => ({
        ...o,
        order: i + 1,
      }));
      brewData.pieData = pieData;

      let count: number | object = 1;
      let avarage: number | string = avg / 7;
      // let avarage = (avg / 5);
      let total = avarage;
      if (prevDetail !== null) {
        count += prevDetail.count;
        total += prevDetail.total ? parseFloat(prevDetail.total) : 0;
      }
      const current_avarage = avarage;
      avarage = (total / count).toFixed(2);
      brewData.total = total.toFixed(2);
      brewData.day_total = dayTotal;
      brewData.avarage = avarage;
      brewData.journalText = prevDetail?.journalText || "";
      brewData.fellingBetter = prevDetail?.fellingBetter || false;
      brewData.isSkip = prevDetail?.isSkip || false;
      brewData.todaysFeeling = prevDetail?.todaysFeeling || "";
      brewData.jounrnalCheck = prevDetail?.jounrnalCheck || "";
      brewData.count = count;
      brewData.current_avarage = current_avarage;
      brewData.audio = await getAudio({
        x: dominantemotion,
        y: maxval,
      });

      await dbRef
        .ref(`users/${userId}/brew`)
        .child("brewData")
        .update({
          [date]: brewData,
        });

      const weekdata = [
        [
          "Week",
          "Avarage",
          "Anxious",
          "Irritable",
          "Joyful",
          "Motivated",
          "Social",
          "Day Avarage",
          "date",
        ],
      ];

      // let allUserDetail = await dbRef.ref('users').once('value');
      // allUserDetail = await allUserDetail.val();
      // const avarages = await dateWiseAvarage(allUserDetail);

      // const startOfWeek = moment().startOf('week');
      const startOfWeek = moment().startOf("isoWeek");
      let weekAvg = 0;
      const dominantEmotions = [];
      let weekDominantEmotion = "";
      let length = 0;
      for (let i = 0; i < 7; i += 1) {
        let barChart = [];
        const stdate = moment(startOfWeek).add(i, "days").format("DD-MM-yyyy");
        let weekDetail = await dbRef
          .ref(`users/${userId}/brew/brewData/${stdate}`)
          .once("value");
        weekDetail = await weekDetail.val();
        const currentDetail: any = weekDetail;
        if (weekDetail !== null) {
          barChart = [moment(stdate, "DD-MM-yyyy").format("ddd"), avarage];
          length += 1;
          let dayAvg = 0;
          await Object.entries(weekDetail).map((week) => {
            if (week[0] === "avarage") {
              barChart[1] = parseFloat(week[1]);
            }
            if (week[0] === "Anxious") {
              // const anxi = Math.round(parseInt(week[1].day_value_sum || week[1].value, 10) / parseInt(currentDetail.count, 10));
              const anxi =
                Number(week[1].day_value_sum) / parseInt(currentDetail.count, 10);
              barChart.push(Number(anxi.toFixed(2)));
              dayAvg += anxi;
            }
            if (week[0] === "Irritable") {
              // const irrit = Math.round(parseInt(week[1].day_value_sum || week[1].value, 10) / parseInt(currentDetail.count, 10));
              const irrit =
                Number(week[1].day_value_sum) / parseInt(currentDetail.count, 10);
              barChart.push(Number(irrit.toFixed(2)));
              dayAvg += irrit;
            }
            if (week[0] === "Joyful") {
              // const joy = Math.round(parseInt(week[1].day_value_sum || week[1].value, 10) / parseInt(currentDetail.count, 10));
              const joy =
                Number(week[1].day_value_sum) / parseInt(currentDetail.count, 10);
              barChart.push(Number(joy.toFixed(2)));
              dayAvg += joy;
            }
            if (week[0] === "Motivated") {
              // const moti = Math.round(parseInt(week[1].day_value_sum || week[1].value, 10) / parseInt(currentDetail.count, 10));
              const moti =
                Number(week[1].day_value_sum) / parseInt(currentDetail.count, 10);
              barChart.push(Number(moti.toFixed(2)));
              dayAvg += moti;
            }
            if (week[0] === "Social") {
              // const soci = Math.round(parseInt(week[1].day_value_sum || week[1].value, 10) / parseInt(currentDetail.count, 10));
              const soci =
                Number(week[1].day_value_sum) / parseInt(currentDetail.count, 10);
              barChart.push(Number(soci.toFixed(2)));
              dayAvg += soci;
            }
            if (week[0] === "avarage") {
              weekAvg += parseFloat(week[1]);
            }
            if (week[0] === "dominantemotion") {
              dominantEmotions.push(week[1]);
            }
            return week;
          });
          // barChart.push(avarages[stdate] ? avarages[stdate].toFixed(2) : 0);
          // barChart.push(dayAvg / 5);
          barChart.push(barChart[1]);
          barChart.push(stdate);
          count = {};
          dominantEmotions.forEach((j) => {
            count[j] = (count[j] || 0) + 1;
          });
          const keysSorted = Object.keys(count).sort(
            (a, b) => count[a] - count[b]
          );
          weekDominantEmotion = keysSorted[keysSorted.length - 1];
        } else {
          barChart = [
            moment(stdate, "DD-MM-yyyy").format("ddd"),
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            stdate,
          ];
        }
        weekdata.push(barChart);
      }

      const year = moment().format('yyyy');
      const currentWeek: any = moment().format('w');
      const query = await dbRef.ref(`users/${userId}/brew/weeks_average/${currentWeek}_${year}`);
      let snapshot: any = await query.once("value");
      snapshot = snapshot.val() || {};
      let happinessCounter = snapshot.happinessCounter
      let journalCount = snapshot.journalCount


      await dbRef
        .ref(`users/${userId}/brew`)
        .child("weeks_average")
        .update({
          [weekOfYear]: {
            avg: (weekAvg /= length).toFixed(2),
            dominantemotion: weekDominantEmotion,
            happinessCounter: happinessCounter ? happinessCounter : 0,
            journalCount: journalCount ? journalCount : 0,
            weekdata,
          },
        });
      // setLoading(false);
      // history.push("/pie-chart");
      // return <Redirect push={false} to="/pie-chart" />;
    } catch (e) {
      console.log('error', e);
    }
  };
  let colorFirst = "#00EAFF";
  let colorSecond = "#006CFF";
  if (sliders.length > 0 && sliders[counter].slider) {
    colorFirst = startColor[sliders[counter].slider.toLowerCase()];
    colorSecond = stopColor[sliders[counter].slider.toLowerCase()];
  }
  let imgClassName = "hide";
  let spanRefClassName = "show";
  if (isFirstTimeLoad) {
    imgClassName = "show";
    spanRefClassName = "hide";
  }

  let html = "";
  if (sliders && sliders.length === 0) {
    // setLoadingData(false);
  }
  if (sliders && sliders.length > 0) {
    for (let s = 0; s < sliders.length; s += 1) {
      let className = "";
      if (s === counter) {
        className = "active";
      }
      html += `<span class="${className}"></span>`;
    }
  }
  function togglePopup() {
    setPopup(!popup);
  }
  async function getScreenMessages() {
    const screenMessages = await database
      .ref("/master/screen_messages/sliders")
      .once("value");
    setScreenMessages(screenMessages.val());
  }
  // if (loading) {
  //   return <Loader display="flex" />;
  // }
  return (
    <>
      {/* <Popup text='Click "Close Button" to hide popup' /> */}
      <div
        className="range__wrapper"
        style={{
          background: `linear-gradient(to right,  ${colorFirst}  0%,${colorSecond} 100%)`,
          filter: `progid:DXImageTransform.Microsoft.gradient( startColorstr='${colorFirst}', endColorstr='${colorSecond}',GradientType=1 )`,
          // display: loading ? 'none' : 'flex',
        }}
        ref={rangeWrapper}
      >
        <input
          className="range__input"
          ref={rangeInput}
          type="range"
          min={2}
          max={10}
          value={props.sliderValue}
          onChange={props.handleSliderValue}
        />
        <svg className="range__slider" width="100%" height="100%" viewBox='0 0 0'>
          <defs>
            <symbol id="range__marks" shapeRendering="crispEdges">
              <path className="range__marks__path" d="M 257 30 l 33 0" />
              <path className="range__marks__path" d="M 268 60 l 22 0" />
              <path className="range__marks__path" d="M 278 90 l 12 0" />
              <path className="range__marks__path" d="M 278 120 l 12 0" />
              <path className="range__marks__path" d="M 278 150 l 12 0" />
              <path className="range__marks__path" d="M 278 180 l 12 0" />
              <path className="range__marks__path" d="M 278 210 l 12 0" />
              <path className="range__marks__path" d="M 278 240 l 12 0" />
              <path className="range__marks__path" d="M 278 270 l 12 0" />
              <path className="range__marks__path" d="M 278 300 l 12 0" />
              <path className="range__marks__path" d="M 278 330 l 12 0" />
              <path className="range__marks__path" d="M 278 360 l 12 0" />
              <path className="range__marks__path" d="M 278 390 l 12 0" />
              <path className="range__marks__path" d="M 268 420 l 22 0" />
              <path className="range__marks__path" d="M 257 450 l 33 0" />
            </symbol>
            <clipPath id="range__slider__clip-path">
              <path
                className="range__slider__path"
                d="M 0 0 l 0 0 l 0 0 l -0 0 Z"
                ref={rangeSliderPaths}
              />
            </clipPath>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={`${colorFirst}`} />
              <stop offset="100%" stopColor={`${colorSecond}`} />
            </linearGradient>
          </defs>
          <path
            className="range__slider__path"
            d={`M 0 ${svgWidth / 2} q ${mouseY}  0  ${svgHeight} 0 l 0 ${svgWidth} l -${svgHeight} 0 Z`}
            ref={rangeSliderPaths}
          />
        </svg>
        {isFirstTimeLoadIcon && (
          <div className="info">
            <button
              onClick={(e) => {
                e.preventDefault();
                togglePopup();
                getScreenMessages();
              }}
              style={{
                background: "transparent",
                border: "none",
                padding: "10px",
              }}
              type="button"
            >
              <img alt="info" src={InfoPic} />
            </button>
          </div>
        )}
        <div
          className="slide_pagination"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <h3 className="hdngTitle">
          How <span>{sliders.length > 0 && sliders[counter].showName}</span> are
          you
          <br /> feeling today?
        </h3>
        <div className="range__values" ref={rangeValues}>
          <div className="range__value range__value--top">
            <span
              className="range__value__number range__value__number--top"
              ref={rangeValueNumberTop}
            />
          </div>
          <div
            id="present__value"
            ref={props.sliderRef[counter]}
            className="range__value range__value--bottom"
          >
            <img className={`${imgClassName}`} alt="img" src={HandPic} />
            <span
              className={`range__value__number range__value__number--bottom ${spanRefClassName}`}
              ref={rangeValueNumberBottom}
            />
          </div>
        </div>
        <div className="bottomButton">
          {sliders.length !== counter + 1 ? (
            <>
              {isFirstTimeLoadIcon && (
                <Link to="/">
                  <p className="n-btn">
                    Cancel
                  </p>
                  {/* <img alt="mic" src={MicPic} /> */}
                </Link>
              )}
              {!isFirstTimeLoad && (
                <button
                  type="button"
                  onClick={() => {
                    setSlidersVal(
                      counter,
                      rangeValueNumberBottom.current.innerText
                    );
                    setCounter(counter + 1);
                    resetValue();
                  }}
                >
                  {" "}
                  <img alt="img" src={ArrowPic} />{" "}
                </button>
              )}
            </>
          ) : (
            <>
              {!isFirstTimeLoad && (
                <Link
                  onClick={() => {
                    setSlidersVal(
                      counter,
                      rangeValueNumberBottom.current.innerText
                    );
                    setCounter(counter + 1);
                    submit(sliders);
                  }}
                  to="/pie-chart"
                >
                  <img alt="img" src={ArrowPic} />
                </Link>
              )}
            </>
          )}
        </div>
      </div>
      {popup && (
        <Popup
          text="My Daily Brew"
          screenMessage={screenMessage}
          closePopup={togglePopup}
        />
      )}
    </>
  );
};
export default Design;
