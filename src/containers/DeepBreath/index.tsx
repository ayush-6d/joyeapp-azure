import * as React from "react";
import "./index.scss";
import { PageImage, BasePage } from "src/components";
import playIcon from "src/resources/icons/play.png";
import stopIcon from "src/resources/icons/stop.png";
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
  audioMute: boolean;
  isPlaying: boolean;
  isStop?: boolean;
}
let timer = null;
export class DeepBreath extends React.PureComponent<IDeepBreathProps, IDeepBreathState> {
  constructor(props: IDeepBreathState) {
    super(props);
    this.state = { isPlaying: false, audioMute: false };
  }

  componentDidMount() {
    fetch('https://joyeapp.netlify.app/deep-bell01.mp3').then(x => x.blob()).then(x => {
      (window as any).audio = new Audio(URL.createObjectURL(x));
      (window as any).audio.load();
    });
  }

  onPlay = (e) => {
    e.preventDefault();
    if (this.state.isPlaying) {
      (window as any).audio.pause();
      (window as any).audio.currentTime = 0;
      document.getElementById("svg-display").setAttribute('data', 'https://joyeapp.netlify.app/preview.svg');
      this.setState({ isPlaying: false });
    } else {
      try { (navigator as any).wakeLock.request('screen'); } catch (e) { }
      (window as any).audio.play();
      document.getElementById("svg-display").setAttribute('data', 'https://joyeapp.netlify.app/deep-bell01.svg');
      this.setState({ isPlaying: true });
    }
  }

  onMute = (e) => {
    this.setState({ audioMute: !this.state.audioMute });
    (window as any).audio.muted = !this.state.audioMute;
  }

  render() {
    return (
      <>
        <BasePage withMenu showInfoIcon  className="login-form home-screen">
          <div className="advertise-text bold text-blue">Just 10 deep breaths!</div>
          <br />
          <div className="svg-div">
            <img style={{ "display": "none" }} src="https://joyeapp.netlify.app/deep-bell01.svg" />
            <object id="svg-display" className="svg-display" data="https://joyeapp.netlify.app/preview.svg" width="320px" height="320px"></object>
          </div>
          <input className="checkbox" type="checkbox" id="mute-audio" defaultChecked={this.state.audioMute} onChange={this.onMute} />
          <label htmlFor="mute-audio" className="index-advertise-text  font-15"> Mute audio</label><br></br>
          <br />
          <div onClick={this.onPlay} className="btn-play">
            <img src={this.state.isPlaying ? stopIcon : playIcon} />
          </div>
          <br />
        </BasePage>
      </>
    );
  }
}
