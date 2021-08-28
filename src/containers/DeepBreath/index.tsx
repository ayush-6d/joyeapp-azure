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
import Page from "../Dashboards/Categories/Main/page"
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
    if (!localStorage.userId) {
      localStorage.setItem("userId", "42f19b36-aa73-4f26-babc-1bf7c6ccfd4a");
      localStorage.setItem("tid", "c93aeb09-e175-49b2-8982-9f00f6f8c073");
    }
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
        <Page route={this.props.route} openModal={this.props.openModal} history={this.props.history}></Page>
      </>
    );
  }
}
export const DeepBreath = withRouter(DeepBreathClass);