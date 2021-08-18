/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable block-spacing */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-await-in-loop */
/* eslint-disable max-len */
/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-indent */
import React, { Fragment, useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { database, firebaseInit } from 'src/services/firebase';
import { getAuthId, getDbUrl } from 'src/services/localStorage.service';
import Chart from './App2';
import OvalPng from 'src/resources/icons/oval.png';
import InfoPic from 'src/resources/icons/infoIcon.png';
import prevArrow from 'src/resources/icons/prev-arrow.png';
import nextArrow from 'src/resources/icons/next-arrow.png';
import legend from 'src/resources/icons/stack_icon.png';
import "src/resources/css/fonts/fonts.css";
import { CloudGradientPng } from 'src/components/CloudGradientPng';
import CloudGradient from 'src/components/CloudGradientSvg';
import { Loader } from 'src/components/Loader';
import { EMOTIONS_MASTER } from 'src/utilities/helper';
import Popup from 'src/components/Popup';
import LegendPopup from './LegendPopup';
import "src/resources/css/global.css";
import '../PrePieScreen/assets/styles/index.css';

export const DailyChart = () => {
  // eslint-disable-next-line no-restricted-globals
  const screenHeight = screen.height;
  const currentWeek: any = moment().format('w');
  const weekdata = [
    ['Week', 'Avarage', 'Joyful', 'Motivated', 'Irritable', 'Anxious', 'Social', 'Day Avarage', 'date'],
    ['Sun', 0, 0, 0, 0, 0, 0, 0],
    ['Mon', 0, 0, 0, 0, 0, 0, 0],
    ['Tue', 0, 0, 0, 0, 0, 0, 0],
    ['Wed', 0, 0, 0, 0, 0, 0, 0],
    ['Thu', 0, 0, 0, 0, 0, 0, 0],
    ['Fri', 0, 0, 0, 0, 0, 0, 0],
    ['Sat', 0, 0, 0, 0, 0, 0, 0],
  ];

  const [titleValue, setTitleValue] = useState('');
  const [focusedID, setFocusId] = useState(null);
  const [cloudColor, setCloudColor] = useState(null);
  const [loading, setLoader] = useState(false);
  const [isCurrentWeek, setIsCurrentWeek] = useState(true);
  const [isPreviousWeek, setIsPreviousWeek] = useState(true);
  const [APIData, setApiData] = useState([]);
  const [startOfWeek, setStartOfWeek] = useState(moment().startOf('week').format('DD-MM-yyyy'));
  const [weekAvarage, setWeekAvarage] = useState(null);
  const [weekNumber, setWeekNumber] = useState(moment().format('w'));
  const [popup, setPopup] = React.useState(false);
  const [legendPopup, setLegendPopup] = React.useState(false);
  const [screenMessage, setScreenMessages] = React.useState([]);
  const [piedata, setPieData] = useState([]);
  const [journalText, setJournalText] = useState('');

  function handleFocus(id) {
    setFocusId(id);
  }

  const getBarChartData = async () => {
    setLoader(true);

    const userId = getAuthId();
    const year = moment().format('yyyy');
    const stdate = moment().format('DD-MM-yyyy');
    const dbRef = firebaseInit.database(getDbUrl());

    const findDetail = await dbRef.ref(`users/${userId}/brew/weeks_average`)
      .once('value');
    const fDetail = await findDetail.val();
    if (fDetail !== null) {
      delete fDetail[0];
      const keysOfObject = Object.keys(fDetail);
      // const newArray = keysOfObject.map(obj => Number(obj.replace('_', '')));
      const result = {};
      const leng = keysOfObject.length;
      let minValue = Number(keysOfObject[0].replace('_', ''));
      for (let i = 0; i < leng; i += 1) {
        const stringInNum = Number(keysOfObject[i].replace('_', ''));
        minValue = stringInNum < minValue ? stringInNum : minValue;
        result[keysOfObject[i]] = stringInNum;
      }
      if (Number(`${weekNumber}${year}`) === minValue) {
        setIsPreviousWeek(false);
      } else {
        setIsPreviousWeek(true);
      }
    }

    // let preWeekAvarageDetail = await dbRef.ref(`users/${userId}/brew/weeks_average/${weekNumber - 1}_${year}`)
    //   .once('value');
    // preWeekAvarageDetail = await preWeekAvarageDetail.val();

    // if (preWeekAvarageDetail === null) {
    //   setIsPreviousWeek(false);
    // } else {
    //   setIsPreviousWeek(true);
    // }
    let weekAvarageDetail: any = await dbRef.ref(`users/${userId}/brew/weeks_average/${weekNumber}_${year}`)
      .once('value');
    weekAvarageDetail = await weekAvarageDetail.val();
    setWeekAvarage(weekAvarageDetail);
    if (weekAvarageDetail && weekAvarageDetail.weekdata !== null) {
      setApiData(weekAvarageDetail.weekdata);
    } else {
      for (let i = 1; i < weekdata.length; i += 1) {
        weekdata[i].push(moment(startOfWeek, 'DD-MM-yyyy').add((i - 1), 'days').format('DD-MM-yyyy'));
      }
      setApiData(weekdata);
    }

    let color = null;
    if (weekAvarageDetail) {
      color = EMOTIONS_MASTER.filter(
        em => em.emotion.toLowerCase() === weekAvarageDetail.dominantemotion.toLowerCase(),
      );
    }
    if (color) {
      setCloudColor(color[0]);
    }

    let wkDtail: any = await dbRef.ref(`users/${userId}/brew/brewData/${stdate}/pieData`).once('value');
    wkDtail = await wkDtail.val();
    setPieData(wkDtail);

    setLoader(false);
  };

  useEffect(() => {
    const dbRef = firebaseInit.database(getDbUrl());
    getBarChartData();
    const userId = getAuthId();
    dbRef.ref(`users/${userId}`).on('child_changed', () => {
      getBarChartData();
    });
  }, [weekNumber]);

  function onPrevious() {
    const week: any = parseInt(weekNumber, 10) - 1;
    const changeWeek = currentWeek - week;
    const startDate = moment().subtract(changeWeek, 'weeks').startOf('week').format('DD-MM-yyyy');
    if (changeWeek > 0) {
      setIsCurrentWeek(false);
    } else {
      setIsCurrentWeek(true);
    }
    setStartOfWeek(startDate);
    setWeekNumber(week);
  }

  function onNext() {
    const week: any = parseInt(weekNumber, 10) + 1;
    const changeWeek = currentWeek - week;
    const startDate = moment().subtract(changeWeek, 'weeks').startOf('week').format('DD-MM-yyyy');
    if (changeWeek > 0) {
      setIsCurrentWeek(false);
    } else {
      setIsCurrentWeek(true);
    }
    setStartOfWeek(startDate);
    setWeekNumber(week);
  }

  function setTitle(val) {
    setTitleValue(val);
  }

  function togglePopup() {
    setPopup(!popup);
  }
  async function getScreenMessages() {
    const screenMessages = isCurrentWeek
      ? await database.ref('/master/screen_messages/main_graph').once('value')
      : await database.ref('/master/screen_messages/prev_graph').once('value');
    setScreenMessages(screenMessages.val());
  }
  console.log('journalText', journalText);
  return (
      <div id="slider" className="is-8 is-offset-2 dailyChart">
        <div className="card article" style={{ height: `${screenHeight}px`, border: '0px' }}>
          {popup && (<Popup text="My Daily Brew" screenMessage={screenMessage} closePopup={togglePopup} />)}
          {legendPopup && (<LegendPopup closePopup={() => setLegendPopup(false)} />)}
          {loading ? <Loader display="flex" />
            : (
              <>
                <div className="legend" style={{ zIndex: 20, position: 'absolute' }}>
                  <button
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '10px',
                      paddingLeft: '20px',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      setLegendPopup(true);
                    }}
                    type="button"
                  >
                    <img
                      src={legend}
                      alt="legend"
                      style={{ height: 25 }}
                    />
                  </button>
                </div>
                <div className="info">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      togglePopup();
                      getScreenMessages();
                    }}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      padding: '10px',
                    }}
                    type="button"
                  >
                    <img alt="info" src={InfoPic} />
                  </button>
                </div>

                {isCurrentWeek && piedata && piedata.length > 0 ? (
                  <>
                    <CloudGradientPng />
                    <div style={{
                      width: '40vh',
                      height: '100%',
                      position: 'relative',
                      alignItems: 'center',
                      overflow: 'hidden',
                      margin: 'auto',
                      marginTop: '15px',
                    }}
                    >
                      <GetPies
                        data={piedata}
                        cardData={[]}
                        direction="clock"
                        // optional props
                        backgroundColor="#ffffff"
                        idToFocus={1}
                        prevIndex={0}
                        heightDifferenceRatio={7}
                        animationDuration=".3s"
                        containerStyle={{}}
                      />
                    </div>
                  </>
                )
                  : (
                    <>
                      {/* <h4 style={{ padding: '50px 20px' }}>{weekAvarage && weekAvarage.dominantemotion}</h4> */}
                      {/* weekAvarage && weekAvarage.dominantemotion && EMOTIONS[weekAvarage.dominantemotion.toLowerCase()].dailyChart.length > 0 && EMOTIONS[weekAvarage.dominantemotion.toLowerCase()].dailyChart[0]
                      && <h4 style={{ paddingTop: '20px', paddingBottom: 0, paddingLeft: '20px' }}>{EMOTIONS[weekAvarage.dominantemotion.toLowerCase()].dailyChart[0]}</h4> */}
                      {/* weekAvarage && weekAvarage.dominantemotion && EMOTIONS[weekAvarage.dominantemotion.toLowerCase()].dailyChart.length > 1 && EMOTIONS[weekAvarage.dominantemotion.toLowerCase()].dailyChart[1]
                      && <h4 style={{ paddingTop: '10px', paddingBottom: 0, paddingLeft: '150px' }}>{EMOTIONS[weekAvarage.dominantemotion.toLowerCase()].dailyChart[1]}</h4> */}
                      {/* weekAvarage && weekAvarage.dominantemotion && EMOTIONS[weekAvarage.dominantemotion.toLowerCase()].dailyChart.length > 2 && EMOTIONS[weekAvarage.dominantemotion.toLowerCase()].dailyChart[2]
                      && <h4 style={{ paddingTop: '0px', paddingBottom: 0, paddingLeft: '50px' }}>{EMOTIONS[weekAvarage.dominantemotion.toLowerCase()].dailyChart[2]}</h4> */}

                      <div
                        className="fadeInEffect display-none"
                        style={{
                          position: 'absolute', width: '20vh', height: '20vh', top: 27, right: '0%',
                        }}
                      >
                        {cloudColor && <CloudGradient color1={cloudColor.cColor} color3={cloudColor.sColor} />}
                      </div>
                    </>
                  )}
                <div className="card-content">
                  <img className="oval display-none" alt="img" src={OvalPng} />
                  <div className="media" style={{ height: '100%' }}>
                    {!isCurrentWeek && weekAvarage && weekAvarage.dominantemotion && weekAvarage.avg && (
                      <p className="average-score">
                        <div className="advertise-text bold text-blue">
                          <span className="text-blue">How are you feeling today?</span>
                        </div>
                        <span className="before-decimal">
                          {weekAvarage.avg.split('.')[0]}
                        .
                        </span>
                        <span className="after-decimal">{weekAvarage && weekAvarage.avg.split('.')[1].charAt(0)}</span>
                      </p>
                    )}
                    <p className="average-score">
                    <div className="advertise-text bold text-blue">
                          <span className="text-blue"  style={{fontSize:'20px'}}>How are you feeling today?</span>
                        </div>
                    <span>{journalText}</span>
                    </p>
                   
                    <div
                      className="media-content has-text-centered"
                      style={{
                        marginTop: !isCurrentWeek && weekAvarage && weekAvarage.dominantemotion && weekAvarage.avg ? 0 : 0,
                      }}
                    >
                      <div className="tags has-addons level-item">
                        <div className="btn-arrow-group" style={{ overflow: 'hidden', padding: '0 10px', position:'absolute',bottom:'42%', left:'0',right:'0' }}>
                          {isPreviousWeek && <button type="button" className="button is-primary back" onClick={onPrevious}><img alt="previous" src={prevArrow} /></button>}
                          {!isCurrentWeek && <button type="button" className="button is-primary next" onClick={onNext}><img alt="next" src={nextArrow} /></button>}
                        </div>
                        {APIData.length !== 0 && (
                          <Chart
                            value={titleValue}
                            setTitle={setTitle}
                            APIData={APIData}
                            onPrevious={onPrevious}
                            onNext={onNext}
                            handleFocus={handleFocus}
                            focusedID={focusedID}
                            isCurrentWeek={isCurrentWeek}
                            graphData={APIData}
                            setJournalText={setJournalText}
                          />
                        )}
                        <div style={{
                          display: 'flex', flexDirection: 'row', zIndex: 3, justifyContent: 'space-between', padding: '0px 15px',
                        }}
                        >
                          <div className="bottom-btn">
                          <Link to="/pie-chart" className="n-btn">
                           Previous
                          </Link>
                          <Link to="/journal" className="n-btn">
                            Next
                          </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="content article-body" />
                </div>
              </>
            )}
        </div>
      </div>
  );
};

export const GetPies = (props) => {
  const [degree, setDegree] = useState(0);

  const viewBox = 120;
  const cx = viewBox / 2; const
    cy = viewBox / 2;
  const radius = 58;
  const fragmentLen = viewBox * 0.60;
  const padding = 0;
  let offset = padding;

  const {
    idToFocus = 1, backgroundColor = '#fff', animationDuration = '1s', heightDifferenceRatio = 2, containerStyle = {}, prevIndex, direction = 'clock',
  } = props;
  let { data = [] } = props;
  const summation = data.reduce((acc, e) => acc + e.slider_value, 0);
  data = data.map(e => ({ ...e, ratio: Math.ceil(e.slider_value / summation * 360) }));
  // let temp = 0;
  // const fixedAnglePoints = data.map(e => { temp += e.ratio / 2; return temp })

  const getDegree = () => {
    // let elemToFocus = data.reduce((a, e) => e.order < idToFocus ? a + e.ratio : a, 0)
    // elemToFocus += data.find(e => e.order === idToFocus).ratio / 2
    // elemToFocus += padding * idToFocus
    // const newDegree = 90 - elemToFocus
    // setDegree(newDegree)
    let newDegree = 0;
    const prevHalf = (prevIndex ? data.find(e => e.order === prevIndex).ratio : 0) / 2;
    console.log('data', data);
    console.log('idToFocus', idToFocus);
    const targetHalf = data.find(e => e.order === idToFocus).ratio / 2;
    newDegree = prevHalf + targetHalf;
    // newDegree = getFixedAnglePoints(newDegree)
    if (direction === 'clock') {
      setDegree(degree + newDegree);
    } else {
      setDegree(degree - newDegree);
    }
  };

  useEffect(() => {
    if (idToFocus !== prevIndex) {
      getDegree();
    }
  }, [idToFocus, prevIndex]);

  return (
    <div className="display-none" style={{
      minHeight: '120px', minWidth: '120px', height: '75%', width: '75%', display: 'block', position: 'relative', margin: 'auto', ...containerStyle,
    }}
    >
      <svg
        viewBox={`0 0 ${viewBox} ${viewBox}`}
        style={{
          transform: `rotate(${90 - degree}deg)`, borderRadius: '50%', transitionDuration: animationDuration, transitionProperty: 'transform',
        }}
      >
        <defs>
          {data.map((e, i) => (
            <Fragment key={i}>
              <linearGradient id={`gradient${i}`} gradientUnits="objectBoundingBox" x1="1" y1="0.3" x2="1" y2="1">
                <stop offset="0%" stopColor={e.sColor || 'silver'} />
                <stop offset="100%" stopColor={e.color} />
              </linearGradient>
            </Fragment>
          ))}
        </defs>
        {data.map((e, i) => {
          let strokeDashValue = e.ratio;
          if (i === data.length - 1) {
            strokeDashValue += 5;
          }
          const rotatedArray = data.slice(idToFocus - 1).concat(data.slice(0, idToFocus - 1));
          const circle = (
            <Fragment key={i}>
              <circle fill="transparent" strokeWidth={fragmentLen} strokeDasharray={`${strokeDashValue - (padding)} 360`} strokeDashoffset={-offset} stroke={`url(#gradient${i})`} cx={cx} cy={cy} r={radius} />
              <circle fill="transparent" strokeWidth={rotatedArray.findIndex(ex => ex.order == e.order) * heightDifferenceRatio} strokeDasharray={`${strokeDashValue - (padding) + 1} 360`} strokeDashoffset={-offset + 0.5} stroke={backgroundColor} cx={cx} cy={cy} r={radius} />
            </Fragment>
          );
          offset = e.ratio + offset + padding;
          return circle;
        })}
        <circle fill="#1E00A3" cx={cx} cy={cy} r={21} opacity={1} />
        <circle fill="#1E00A3" cx={cx} cy={cy} r={27} opacity={0.1} />
        <circle fill="#1E00A3" cx={cx} cy={cy} r={34} opacity={0.1} />
      </svg>
    </div>
  );
};
