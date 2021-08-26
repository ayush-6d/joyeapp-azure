/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swiper from "swiper";
import InfoPic from "src/resources/icons/infoIcon.png";
import "@reach/slider/styles.css";
import "swiper/css/swiper.min.css";
import "./assets/styles/prepie.css";
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
    const that = this;
    console.log('EMOTIONS', EMOTIONS, this.props.emotion);
  }

  

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

        <div className="login-form home-screen"
          id="main"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            backgroundColor: "#ffffff",
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
                  backgroundColor="#ffffff"
                  idToFocus={index}
                  prevIndex={prevIndex}
                  heightDifferenceRatio={7}
                  animationDuration=".3s"
                  containerStyle={{}}
                />
              </div>
            </div>
          </div>

          <div
            // className="swiper-container"
            style={{ paddingTop: "15px", paddingBottom: "80px" }}
          >
            <div className="swiper-wrapper">
              {/* {cardData.map(e => ( */}
              <>
                {/* {e.desc !== '-' && ( */}
                <div
                  key={1}
                  // className="swiper-slide "
                  style={{
                    backgroundColor: "#ffffff",
                    width: "100%",
                    padding: "20px"

                  }}
                >
                  {/* {JSON.stringify(e)}  */}
                  <div style={{ width: "100%" }}>
                    <div>
                      <div>
                        <p className="cardHeading">
                          Your Joye-level is <span className="avenier-font-bold">{pieAverage}</span> and your dominant mood
                          is <span className="avenier-font-bold">{EMOTIONS[emotion.toLowerCase()].pie} </span>- {EMOTIONS[emotion.toLowerCase()].prePieMessage}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
                {/* )} */}
              </>
              {/* // ))} */}
            </div>
            <div className="bottom-bttn">
              <Link to="#" className="n-btn">Previous</Link>
              <Link to="/pie-chart" className="n-btn"> Next </Link>
            </div>
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
