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
import * as microsoftTeams from "@microsoft/teams-js";
import { firebaseInit } from "src/services/firebase";
import { getAuthId, getDbUrl } from "src/services/localStorage.service";
import moment from "moment";
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
  isLoaded:boolean
}

export class DeepBreathClass extends React.PureComponent<IDeepBreathProps, IDeepBreathState> {
  constructor(props: IDeepBreathProps) {
    super(props);
    let path = ((window as any).location.hostname === "localhost") ? "/public/" : '/';
    this.state = { isPlaying: false, audioMute: false, path: path, isLoaded: false };
  }

  componentDidMount() {
    microsoftTeams.initialize();
    fetch(`${this.state.path}deep-bell01.mp3`).then(x => x.blob()).then(x => {
      (window as any).audio = new Audio(URL.createObjectURL(x));
      (window as any).audio.load();
      this.setState({ isLoaded: true });
    });
    window.addEventListener('beforeunload', this.componentCleanup);
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
      this.updateUserActivity()
    }
  }

  updateUserActivity = async () => {
    const userId = getAuthId();
    if(!userId){
      console.log("assdasd");
      return false;
    }
    let dbUrl = getDbUrl();
    let dbRef = firebaseInit.database(dbUrl);
    let todaysDate = moment(new Date()).format("DD-MM-YYYY");
    let oldBrew = await dbRef.ref(`users/${userId}/brew/brewData/${todaysDate}`).once('value');
    let oldBrewData = oldBrew.val()
    if(!oldBrewData){
      oldBrewData = {
        Anxious: { sub_slider: 'Anxious', value: 0, weightvalue: 0 },
        Irritable: { sub_slider: 'Irritable', value: 0, weightvalue: 0 },
        Joyful: { sub_slider: 'Optimistic', value: 0, weightvalue: 0 },
        Motivated: { sub_slider: 'Active', value: 0, weightvalue: 0 },
        Social: { sub_slider: 'Social', value: 0, weightvalue: 0 },
        total: 0,
        count: 0,
        avarage: 0,
        date: todaysDate,
        users: {},
      }
    }
    dbRef
      .ref(`users/${userId}/brew/brewData/${todaysDate}`)
      .set(oldBrewData)
    return true;
  }

  onMute = (e) => {
    this.setState({ audioMute: !this.state.audioMute });
    (window as any).audio.muted = !this.state.audioMute;
  }

  componentCleanup(e) { // this will hold the cleanup code
    if (e) {
      e.preventDefault();
    }
    if (this.state.isPlaying) {
      (window as any).audio.pause();
      (window as any).audio.currentTime = 0;
      this.setState({ isPlaying: false });
    }
    microsoftTeams.executeDeepLink("https://teams.microsoft.com/l/entity/6c75be83-05a8-4515-9c7b-b5f759b99b7f/joyeapp");
  }

  componentWillUnmount() {
    this.componentCleanup(undefined);
    window.removeEventListener('beforeunload', this.componentCleanup); // remove the event handler for normal unmounting
  }

  render() {
    return (
      <>
        <BasePage withCross showInfoIcon className="login-form home-screen deepbreath-page" unload={this.componentCleanup.bind(this)}>
          <div style={{ width: "100%" }}>
            <div style={{ width: "100%", margin: "auto" }}>
              <Circles isPlaying={this.state.isPlaying} complete={() => { this.setState({ isPlaying: false }); }}></Circles>
            </div>
          </div>
          <div className="display-flex">
            <input className="checkbox" type="checkbox" id="mute-audio" defaultChecked={this.state.audioMute} onChange={this.onMute} />
            <label htmlFor="mute-audio" className="index-advertise-text  font-15"> Mute audio</label><br></br>
          </div>
          <br />
          <div onClick={this.onPlay} className="btn-play">
            <img src={!this.state.isLoaded ? '' : this.state.isPlaying ? stopIcon : playIcon} />
          </div>
          <div className="" style={{ cursor: "pointer", marginTop: "35px" }}>
            <div className="n-btn" onClick={this.componentCleanup.bind(this)}>Daily Brew</div>
          </div>
        </BasePage>
      </>
    );
  }
}
export const DeepBreath = withRouter(DeepBreathClass);