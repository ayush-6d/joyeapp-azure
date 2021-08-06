/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swiper from "swiper";
import Overflow from "react-overflow-indicator";
import CloudGradient from "./CloudGradientSvg";
import cloud1 from "./assets/media/cloud1.png";
import cloud2 from "./assets/media/cloud2.png";
import InfoPic from "src/resources/icons/new_I.png";
import "@reach/slider/styles.css";

import "swiper/css/swiper.min.css";
import "./assets/styles/index.css";
// import { storage } from '../../firebase/firebase.config';
import btmShw from "src/resources/icons/bottomShadow.png";
import topShw from "src/resources/icons/topShadow.png";
import { EMOTIONS } from "src/utilities/helper";

interface IPrePieProps {
  data?: any;
  average?: number;
  onClickPopup?: Function;
  getScreenMessages?: Function;
  emotion?: string;
  index?: number;
}

export interface IPrePieState {
  index?: number;
  prevIndex?: number;
  direction?: string;
  cardData?: any;
}

let mySwiper;

export default class PrePieApp extends React.PureComponent<IPrePieProps, IPrePieState> {
  constructor(props: IPrePieState) {
    super(props);
    this.state = {
      index: 1,
      prevIndex: 0,
      direction: "clock",
      cardData:
        this.props.data && this.props.data.length > 0
          ? [this.props.data[0], ...this.props.data.slice(1).reverse()]
          : [],
      // fireBaseUrl: '',
    };
  }

  componentDidMount() {
    // const ref = storage.refFromURL('gs://joye-768f7.appspot.com/joye.png');
    // ref.getDownloadURL().then((url) => {
    //   console.log('urls:: ', url);
    // });
    const that = this;
    mySwiper = new Swiper(".swiper-container", {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 30,
      // loopedSlides: 3,
      speed: 400,
      longSwipes: false,
      // loop: true,
    });

    mySwiper.on("slideChange", () => {
      const { realIndex, activeIndex, previousIndex } = mySwiper;
      const cardDataIndex = realIndex
        ? that.state.cardData[realIndex].order
        : 1;

      let direction = "";
      if (previousIndex < activeIndex) {
        direction = "anticlock";
      } else {
        direction = "clock";
      }

      that.setState({
        prevIndex: that.state.index,
        index: cardDataIndex,
        direction,
      });
    });
  }

  handleClickPrev = () => {
    mySwiper.slideNext();
  };

  render() {
    const { data, average, onClickPopup, getScreenMessages, emotion } =
      this.props;
    const pieAverage = average ? parseFloat(average.toString()).toFixed(1) : "0.0";
    const pieAverageVal = pieAverage.toString().split(".");
    const { index, prevIndex, direction, cardData } = this.state;
    // console.log('Datata: ', data);
    const indexData = data.find((e) => e.order === index) || {};
    return (
      <>
        <div
          id="main"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: "rgb(30, 0, 163)",
            position: "relative",
            height: "100%",
          }}
        >
          <div className="info">
            <button
              onClick={(e) => {
                e.preventDefault();
                onClickPopup();
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
          <img
            style={{
              position: "absolute",
              width: "13vh",
              top: 5,
              left: 5,
              zIndex: 10,
              opacity: 0.4,
            }}
            alt="cloud1"
            src={cloud1}
          />
          <img
            style={{
              position: "absolute",
              width: "14vh",
              top: "6%",
              right: 10,
              zIndex: 10,
              opacity: 0.4,
            }}
            alt="cloud2"
            src={cloud2}
          />
          <div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                position: "relative",
                marginTop: "15px",
              }}
            >
              <div className="pie_value">
                <div>
                  <span>{pieAverageVal[0]}</span>
                  <span>{`.${pieAverageVal[1]}`}</span>
                </div>
              </div>
              <div
                style={{
                  width: "40vh",
                  height: "100%",
                  position: "relative",
                  alignItems: "center",
                  overflow: "hidden",
                }}
              >
                <GetPies
                  data={data}
                  cardData={cardData}
                  direction={direction}
                  // optional props
                  backgroundColor="#1E00A3"
                  idToFocus={index}
                  prevIndex={prevIndex}
                  heightDifferenceRatio={7}
                  animationDuration=".3s"
                  containerStyle={{}}
                />
              </div>
              <div
                className="fadeInEffect"
                key={`key${index}`}
                style={{
                  position: "absolute",
                  width: "20vh",
                  height: "20vh",
                  bottom: -18,
                  right: "-15%",
                  zIndex: 1,
                }}
              >
                <CloudGradient color1={indexData.cColor} color3={null} />
              </div>
            </div>
          </div>

          <div
            className="swiper-container"
            style={{ paddingTop: "15px", paddingBottom: "80px" }}
          >
            <div className="swiper-wrapper">
              {/* {cardData.map(e => ( */}
              <>
                {/* {e.desc !== '-' && ( */}
                <div
                  key={1}
                  className="swiper-slide boxShadow"
                  style={{
                    backgroundColor: "#ffffff",
                    width: "65%",
                    padding: "6px",
                    marginRight: "20px",
                    textJustify: "inter-word",
                    height: "80%",
                  }}
                >
                  {/* {JSON.stringify(e)}  */}
                  <div style={{ width: "100%" }}>
                    <div style={{ display: "flex" }}>
                      <div style={{ width: "50%" }}>
                        <p className="cardHeading">
                          Your Joye-level is {pieAverage} and your dominant mood
                          is {EMOTIONS[emotion.toLowerCase()].pie} - all about
                          your relationships and interaction with people in your
                          life
                        </p>
                      </div>
                    </div>
                    <Overflow style={{ maxHeight: "210px" }}>
                      <Overflow.Indicator direction="up">
                        <img
                          src={topShw}
                          style={{ position: "absolute", left: 10, top: -3 }}
                          alt="overflow-indicator-img"
                        />
                      </Overflow.Indicator>
                      <Overflow.Content>
                        <div>
                          Joye level is your wellbeing score on a scale of 10.
                          Higher mix of Social, Joy, Motivation improves your
                          wellbeing, while higher Anxiety and Anger reduces your
                          wellbeing.
                        </div>
                      </Overflow.Content>

                      <Overflow.Indicator direction="down">
                        <img
                          style={{ position: "absolute", left: 10, bottom: -3 }}
                          src={btmShw}
                          alt="overflow-indicator-img"
                        />
                      </Overflow.Indicator>
                    </Overflow>
                  </div>
                </div>
                {/* )} */}
              </>
              {/* // ))} */}
            </div>
            <Link to="/pie-chart">
              <p
                className="hand fff"
                style={{
                  fontSize: 18,
                  marginTop: "10px",
                  position: "absolute",
                  left: "45%",
                  bottom: "60px",
                }}
                // onClick={this.handleClickPrev}
              >
                Next
              </p>
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              zIndex: 3,
              justifyContent: "center",
              height: "60px",
            }}
          >
            {/* {index <= data.length && <p className="hand fff" onClick={handleClickNext}>
                    {index === data.length ? 'Start over' : 'Next'}
                </p>} */}
          </div>
        </div>
      </>
    );
  }
}

export const GetPies = (props) => {
  const [degree, setDegree] = useState(0);

  const viewBox = 120;
  const cx = viewBox / 2;
  const cy = viewBox / 2;
  const radius = 58;
  const fragmentLen = viewBox * 0.6;
  const padding = 0;
  let offset = padding;

  const {
    idToFocus = 1,
    backgroundColor = "#fff",
    animationDuration = "1s",
    heightDifferenceRatio = 2,
    containerStyle = {},
    prevIndex,
    direction = "clock",
  } = props;
  let { data = [] } = props;
  const summation = data.reduce((acc, e) => acc + e.slider_value, 0);
  data = data.map((e) => ({
    ...e,
    ratio: Math.ceil((e.slider_value / summation) * 360),
  }));
  // let temp = 0;
  // const fixedAnglePoints = data.map(e => { temp += e.ratio / 2; return temp })

  const getDegree = () => {
    // let elemToFocus = data.reduce((a, e) => e.order < idToFocus ? a + e.ratio : a, 0)
    // elemToFocus += data.find(e => e.order === idToFocus).ratio / 2
    // elemToFocus += padding * idToFocus
    // const newDegree = 90 - elemToFocus
    // setDegree(newDegree)
    let newDegree = 0;
    const prevHalf =
      (prevIndex ? data.find((e) => e.order === prevIndex).ratio : 0) / 2;
    const targetHalf = data.find((e) => e.order === idToFocus).ratio / 2;
    newDegree = prevHalf + targetHalf;
    // newDegree = getFixedAnglePoints(newDegree)
    if (direction === "clock") {
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
    <div
      style={{
        minHeight: "120px",
        minWidth: "120px",
        height: "75%",
        width: "75%",
        display: "block",
        position: "relative",
        margin: "auto",
        ...containerStyle,
      }}
    >
      <svg
        viewBox={`0 0 ${viewBox} ${viewBox}`}
        style={{
          transform: `rotate(${90 - degree}deg)`,
          borderRadius: "50%",
          transitionDuration: animationDuration,
          transitionProperty: "transform",
        }}
      >
        <defs>
          {data.map((e, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={`fragment-${i}`}>
              <linearGradient
                id={`gradient${i}`}
                gradientUnits="objectBoundingBox"
                x1="1"
                y1="0.3"
                x2="1"
                y2="1"
              >
                <stop offset="0%" stopColor={e.sColor || "silver"} />
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
          const rotatedArray = data
            .slice(idToFocus - 1)
            .concat(data.slice(0, idToFocus - 1));
          const circle = (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={i}>
              <circle
                fill="transparent"
                strokeWidth={fragmentLen}
                strokeDasharray={`${strokeDashValue - padding} 360`}
                strokeDashoffset={-offset}
                stroke={`url(#gradient${i})`}
                cx={cx}
                cy={cy}
                r={radius}
              />
              <circle
                fill="transparent"
                strokeWidth={
                  rotatedArray.findIndex((ex) => ex.order == e.order) *
                  heightDifferenceRatio
                }
                strokeDasharray={`${strokeDashValue - padding + 1} 360`}
                strokeDashoffset={-offset + 0.5}
                stroke={backgroundColor}
                cx={cx}
                cy={cy}
                r={radius}
              />
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
