import * as React from "react";
import ReactPlayer from "react-player";
import "./index.scss";
import { PageImage, BasePage } from "src/components";
import pageHeader from "src/resources/icons/pageHeader2.png";
import play from "src/resources/icons/play.png";
import stop from "src/resources/icons/stop.png";
import brew from "src/resources/icons/brew.png";
import right from "src/resources/icons/right.png";
import wrong from "src/resources/icons/wrong.png";
import saysomething from "src/resources/saysomething.mp4";
import dbvideo from "src/resources/icons/db-video.jpg";




export interface IDeepBreathProps {
  route?: any;
  openModal?: any;
  analysisPage?: boolean;
}
export interface IDeepBreathState {
  todaysFeeling?: string;
  counter?: number;
  timer?: object;
  counterStart?: boolean;
  route?: any;
  audioMute?: boolean;
  isPlaying?: boolean;
  isStop?: boolean;
  viedoUrl?: string;
}
let timer = null;
export class DeepBreath extends React.PureComponent<IDeepBreathProps, IDeepBreathState> {
  constructor(props: IDeepBreathState) {
    super(props);
    this.state = {
      todaysFeeling: "",
      counter: 10,
      counterStart: false,
      timer: null,
      audioMute: true,
      isPlaying: false,
      isStop: false,
    };
  }
  setCounter(startCounter) {
    console.log(startCounter);
    if (startCounter) {
      timer = setInterval(() => {
        if (this.state.counter > 0) {
          this.setState({
            counter: this.state.counter - 1,
            counterStart: true
          });
        } else {
          clearInterval(timer);
          this.setState({
            counterStart: false
          });
        }
      }, 1000);
    } else {
      clearInterval(timer);
      this.setState({
        counter: 10,
        counterStart: false
      });
    }
  }
  setPlay() {
    this.setState({ isPlaying: !this.state.isPlaying });
  }
  setPuse() {
    this.setState({ isPlaying: !this.state.isPlaying });
  }
  
  componentDidMount() {
    console.log('componentDidMount');
    setTimeout(x=>{
      document.getElementsByTagName("video")[0].setAttribute("poster","https://joyeapp.netlify.app/images/db-video.jpg")
    },10);
  }

  handleChange = e => {
    const value = e.target.value;
    if (this.state.todaysFeeling.length <= 150) {
      this.setState({
        todaysFeeling: value
      });
    }
  };
  handleChangeChk = () => {
    this.setState({ audioMute: !this.state.audioMute });
  };
  render() {
    const { route, analysisPage } = this.props;
    const { todaysFeeling, counter, counterStart, isPlaying ,audioMute } = this.state;
    return (
      <>
        <BasePage withMenu showInfoIcon className="login-form">
         {/*<div className="pageHeader">
            <img src={pageHeader} />
          </div> */} 
          <div
            className="render-component"
            style={{
              textAlign: "center",
              minHeight: "87vh",
              height: "auto",
              width: "100%",
              justifyContent: "space-around",
              display: "flex",
              flexDirection: "column"
            }}
          >
         

          {counter > 0 && !analysisPage ? (
            <>
             <div className="text-container">
             <div  className="advertise-text bold text-blue" style={{  marginTop: "35px" }}>
              {`${counter > 0 ? "Just 10 deep breaths!" : "Feeling better?"}`}
            </div>          
         
          </div>
              <div className="player-wrapper">
              <ReactPlayer 
                    className="react-player" 
                    playsinline 
                    muted={!audioMute} 
                    playing={isPlaying} 
                    pip={false} 
                    stopOnUnmount={this.state.isStop} 
                    url={[ { src: saysomething, type: 'video/mp4'} ]} 
                    width="100%" 
                    height="100%"
                    config={{
                      file: {
                        forceVideo: true
                      }
                    }}
                    />
                
                <div className="checkbox" style={{ marginTop: "10px" }}>
            <input type="checkbox" defaultChecked={this.state.audioMute} onChange={this.handleChangeChk} />
            <label className="checkbox-text">Turn audio on</label>
          </div>
              </div> 
            
              <div className="btn-play">
              {this.state.isPlaying ? 
             
              <PageImage setCounter={e => this.setPuse()} height="20px" width="20px"  logo={stop} /> : 
              <PageImage setCounter={e => this.setPlay()} height="20px" width="20px"  logo={play} />}
</div>
              <div className="skip-txt" onClick={e => route("congratulation")} >
               <img src={brew} style={{ width: "40px" }} /> <div className="n-btn margin-top-10" >skip </div> 
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <PageImage height="82px" width="82px" marginTop="72px" logo={wrong} />
                <PageImage height="82px" width="82px" marginTop="72px" setCounter={e => this.props.route("congratulation")} logo={right} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-around" }}>
                <span>No</span>
                <span>Yes</span>
              </div>
            </>
          )}
          
          </div>
        </BasePage>
      </>
    );
  }
}
