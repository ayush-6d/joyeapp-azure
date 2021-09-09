import * as React from "react";
import "./index.scss";
import { BasePage } from "src/components";
import playIcon from "src/resources/icons/play.png";
import stopIcon from "src/resources/icons/stop.png";
import Circles from "./circles";
import "../Dashboards/Categories/Main/index.scss";
import "src/resources/css/fonts/fonts.css";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router";
export interface IDeepBreathProps extends RouteComponentProps {
  history: any;
  route?: any;
  openModal?: any;
  analysisPage?: boolean;
}
export interface IDeepBreathState {
  todaysFeeling?: string;
  counter?: number;
  timer?: object;
  counterStart?: boolean;
  audioMute: boolean;
  isPlaying: boolean;
  isStop?: boolean;
  path: string;
}
export class DeepBreathClass extends React.PureComponent<IDeepBreathProps, IDeepBreathState> {
  constructor(props: IDeepBreathProps) {
    super(props);
    let path = ((window as any).location.hostname === "localhost") ? "/public/" : '/';
    this.state = { isPlaying: false, audioMute: false, path: path };
  }

  componentDidMount() {
    fetch(`${this.state.path}deep-bell01.mp3`).then(x => x.blob()).then(x => {
      (window as any).audio = new Audio(URL.createObjectURL(x));
      (window as any).audio.load();
    });
  }

  onPlay = (e) => {
    e.preventDefault();
    if ((window as any).audio === undefined) return;
    if (this.state.isPlaying) {
      (window as any).audio.pause();
      (window as any).audio.currentTime = 0;
      this.setState({ isPlaying: false });
    } else {
      try { (navigator as any).wakeLock.request('screen'); } catch (e) { }
      (window as any).audio.play();
      this.setState({ isPlaying: true });
    }
  }

  onMute = (e) => {
    this.setState({ audioMute: !this.state.audioMute });
    (window as any).audio.muted = !this.state.audioMute;
  }

  componentWillUnmount() {
    if (this.state.isPlaying) {
      (window as any).audio.pause();
      (window as any).audio.currentTime = 0;
      this.setState({ isPlaying: false });
    }
  }

  render() {
    return (
      <>
        <BasePage withCross showInfoIcon className="login-form home-screen deepbreath-page">
          <div style={{ width: "100%" }}>
            <div style={{ width: "80%", margin: "auto" }}>
              <Circles isPlaying={this.state.isPlaying} complete={() => { this.setState({ isPlaying: false }); }}></Circles>
            </div>
          </div>
          <div className="display-flex">
            <input className="checkbox" type="checkbox" id="mute-audio" defaultChecked={this.state.audioMute} onChange={this.onMute} />
            <label htmlFor="mute-audio" className="index-advertise-text  font-15"> Mute audio</label><br></br>
          </div>
          <br />
          <div onClick={this.onPlay} className="btn-play">
            <img src={this.state.isPlaying ? stopIcon : playIcon} />
          </div>
          <div className="" style={{ cursor: "pointer", marginTop: "35px" }}>
            <div className="n-btn" onClick={() => {
              this.props.history.push("/")
            }}>Daily Brew</div>
          </div>
        </BasePage>
      </>
    );
  }
}
export const DeepBreath = withRouter(DeepBreathClass);