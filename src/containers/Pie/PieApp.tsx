/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Swiper from 'swiper';
import Overflow from 'react-overflow-indicator';
import {
  SliderInput,
  SliderTrack,
  SliderHandle,
} from '@reach/slider';
import CloudGradient from "src/components/CloudGradientSvg";
import InfoPic from 'src/resources/icons/infoIcon.png';
import Close from "src/resources/icons/Close.png";
import AudioPlayer from 'src/components/AudioPlayer';
import Tracker from './StyledTracker';
import { EMOTIONS } from 'src/utilities/helper';

export interface IPieAppProps {
  average: number;
  onClickPopup: any;
  getScreenMessages: any;
  fireBaseUrl: string;
  fireBaseStorage: any;
  data?: any;
  setShowScreen?: Function;
}
export interface IPieAppState {
  index?: number;
  prevIndex?: number;
  direction?: string;
  cardData?: any;
  showAudioPlayer?: boolean;
  history?: any;
}

export default class V2 extends React.Component<IPieAppProps, IPieAppState> {
  constructor(props) {
    super(props);
    this.state = {
      index: 1,
      prevIndex: 0,
      direction: 'clock',
      cardData: this.props.data && this.props.data.length > 0
        ? [this.props.data[0], ...this.props.data.slice(1).reverse()]
        : [],
      showAudioPlayer: false,
      // fireBaseUrl: '',
    };
  }
  mySwiper = null;
  componentDidMount() {
    // const ref = storage.refFromURL('gs://joye-768f7.appspot.com/joye.png');
    // ref.getDownloadURL().then((url) => {
    //   console.log('urls:: ', url);
    // });
    const that = this;
    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 30,
      loopedSlides: 3,
      speed: 400,
      longSwipes: false,
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });


    this.mySwiper.on('slideChange', () => {
      const { realIndex, activeIndex, previousIndex } = this.mySwiper;
      const cardDataIndex = realIndex ? that.state.cardData[realIndex].order : 1;

      let direction = '';
      if (previousIndex < activeIndex) {
        direction = 'anticlock';
      } else {
        direction = 'clock';
      }

      that.setState({ prevIndex: that.state.index, index: cardDataIndex, direction });
    });
  }

  handleClickPrev = () => {
    this.mySwiper.slideNext();
  }

  render() {
    const {
      data, average, onClickPopup, getScreenMessages, fireBaseUrl, fireBaseStorage
    } = this.props;
    const addDescription = (desc) => {
      let description = '';
      if (desc && desc.includes('//')) {
        const dsc = desc.split('//');
        for (let i = 0; i < dsc.length; i += 1) {
          description += `<div class="fff" style="fontSize: 16px">${dsc[i].replace(/\\n/g, '')}</div>`;
        }
        return description;
      }
      const descrip = desc.toString().replace(/\\n/g, '');
      return `<div class="fff" style="fontSize: 16px">${descrip}</div>`;
    };
    const pieAverage = average ? parseFloat(average.toString()).toFixed(1) : '0.0';
    const pieAverageVal = pieAverage.toString().split('.');
    const {
      index, prevIndex, direction, cardData,
    } = this.state;
    // console.log('Datata: ', data);
    const indexData = data.find(e => e.order === index) || {};

    return (
      <>

        <div className="login-form home-screen"
          id="main"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            position: 'relative',
            height: '100%',
          }}
        >
          <div className="info">
            <button
              onClick={(e) => {
                e.preventDefault();
                onClickPopup();
                getScreenMessages();
              }}
              style={{ background: 'transparent', border: 'none', padding: '10px' }}
              type="button"
            >
              <img alt="info" src={InfoPic} />
            </button>
          </div>
          <div className="close-icon">
            <button
              // onClick={(e) => {
              //   e.preventDefault();
              //   togglePopup();
              //   getScreenMessages();
              // }}
              onClick={() => {
                <Link to={"/"} />
              }}
              style={{
                background: "transparent",
                border: "none",
                padding: "10px",
              }}
              type="button"
            >
              <img alt="Clsoe" src={Close} />
            </button>
          </div>
          <div>
            <div style={{
              width: '100%', display: 'flex', justifyContent: 'center', position: 'relative', marginTop: '15px',
            }}
            >
              <div className="pie_value">
                <div>
                  <span>
                    {pieAverageVal[0]}
                  </span>
                  <span>{`.${pieAverageVal[1]}`}</span>
                </div>
              </div>
              <div style={{
                width: '40vh', height: '100%', position: 'relative', alignItems: 'center', overflow: 'hidden',
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
              {!this.state.showAudioPlayer && (
                <div
                  className="fadeInEffect"
                  key={`key${index}`}
                  style={{
                    position: 'absolute', width: '20vh', height: '20vh', bottom: -21, right: '-15%', zIndex: 1,
                  }}
                >
                  <CloudGradient color1={indexData.cColor} color3={null} />
                </div>
              )}
            </div>
          </div>

          <div className="swiper-container">
            <AudioPlayer
              aPlayerVisible={fireBaseUrl !== '' && this.state.showAudioPlayer}
              audioData={{
                audioSrc: fireBaseUrl || 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                audioTitle: fireBaseStorage ? fireBaseStorage.title : '',
                author: fireBaseStorage ? fireBaseStorage.author : '',
              }}
            />
            {!this.state.showAudioPlayer && (
              <div className="swiper-wrapper">
                {cardData.map(e => (
                  <>
                    <div
                      key={e.order}
                      className="swiper-slide"
                      style={{
                        backgroundColor: e.cColor,
                        width: '65%',
                        padding: '6px',
                        marginRight: '20px',
                        textJustify: 'inter-word',
                        height: '90%',
                      }}
                    >
                      {/* {JSON.stringify(e)}  */}
                      <div style={{ width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                          <div style={{ width: '50%' }}>
                            <p className="fff cardHeading">
                              {EMOTIONS[e.title.toLowerCase()].pie}
                            </p>
                          </div>
                          <div style={{
                            width: '50%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                          }}
                          >
                            <SliderInput min={0} max={100} step={10} defaultValue={e && (Number(e.slider_value) * 10)} disabled>
                              <SliderTrack>
                                <Tracker color={e.color} sColor={e.sColor} />
                                <SliderHandle />
                              </SliderTrack>
                            </SliderInput>
                          </div>
                        </div>
                        <Overflow style={{ maxHeight: '210px' }}>
                          <Overflow.Content>
                            <div dangerouslySetInnerHTML={{ __html: addDescription(e.desc) }} />
                          </Overflow.Content>
                        </Overflow>

                        {/* {console.log(addDescription(e.desc))}
                      <div className="fff" style={{ fontSize: '16px' }}>{e.desc}</div>
                    </div> */}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            )}
            {
              !this.state.showAudioPlayer && (
                <>
                  <div className='swiper-button-next'></div>
                  <div className='swiper-button-prev'></div>
                </>
              )
            }
            <div className="bottom-bttn">
              <Link to="#" className="n-btn" onClick={() => {
                if (this.state.showAudioPlayer) {
                  this.setState({ showAudioPlayer: false });
                } else {
                  this.props.setShowScreen("1");
                }
              }}>Previous</Link>
              <Link className="n-btn"
                onClick={
                  () => {
                    this.setState({ showAudioPlayer: true });
                  }
                }
                to={this.state.showAudioPlayer || fireBaseUrl === '' ? "/daily-chart" : "#"}
              > Next</Link>
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
    <div style={{
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
