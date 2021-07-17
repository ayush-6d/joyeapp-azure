import * as React from "react";
import { BasePage, CircularCounter, Circle, ImportLoader, PageImage } from "src/components";
import Mic from "../../../../resources/icons/mic.png";
import rightTick from "../../../../resources/icons/rightTick.png";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import Gibberish from "../../../../resources/icons/gibberish.png";
import recycle from "../../../../resources/icons/recycle.png";
import Gesture from "../../../../resources/icons/gesture.png";
import ExcellentTick from "../../../../resources/icons/ExcellentTick.png";
import speakingcircle from "../../../../resources/icons/speakingcircle.png";
import Shield from "../../../../resources/icons/Privacyshield.png";
import InfoIcon from "../../../../resources/icons/infoIcon.png";
import { ScorePoint } from "../scorepoints";
import ProcessComplete from "../../../../resources/icons/ProcessCompleted.png";
import axios from "axios";
import { removeAlert, setAlert } from "src/actions/alertAction";
import { loginUser } from "src/actions/loginActions";
import { UserModel } from "src/Models/UserModel";
import { parseJwt, saveUserDataForSession } from "src/utilities/generalUtils";
import { SVGData } from "src/components/Loader/SVGData";

export interface IMainProps {
  route?: any;
  openModal?: any;
}
let timer = null;

export interface IMainState {
  speachStarted?: boolean;
  showCounter?: boolean;
  isLoading?: boolean;
  isCounterStarted?: boolean;
  isCounterEnd?: boolean;
  iconIndex?: Object;
  seconds?: any;
  timer?: object;
  iconHeight?: any;
  isClickHandle?: boolean;
}

export class Main extends React.PureComponent<IMainProps, IMainState> {
  constructor(props: IMainProps) {
    super(props);
    this.state = {
      iconIndex: {
        mic: 0,
        gibberish: 1,
        gesture: 2
      },
      timer: null,
      showCounter: false,
      isCounterStarted: false,
      isCounterEnd: false,
      seconds: 10,
      iconHeight: "-171px",
      isClickHandle: true
    };
  }

  counter = showCounter => {
    if (showCounter) {
      this.setState(prevState => ({
        showCounter: !prevState.showCounter,
        isCounterStarted: true
      }));
      timer = setInterval(() => {
        if (this.state.seconds > 0) {
          this.setState(prevState => ({
            seconds: prevState.seconds - 1
          }));
          // console.log(this.state.seconds)
        } else {
          this.setState(prevState => ({
            seconds: 10,
            showCounter: !prevState.showCounter
          }));
          clearInterval(timer);
          console.log(this.state.seconds);
        }
      }, 1000);
    }
  };

  onCancel = () => {
    window.location.reload();
  };
  speakAgain = () => {
    this.setState(prevState => ({
      showCounter: !prevState.showCounter,
      isCounterEnd: !prevState.isCounterEnd,
      seconds: 10
    }));
    this.onClickHandle(true);
  };

  onClickGesture = () => {
    this.props.route("tellusabout");
  };

  onClickHandle = async showCounter => {
    const self = this;
    this.setState({ isClickHandle: false });

    if (showCounter) {
      this.setState(prevState => ({
        showCounter: !prevState.showCounter,
        isCounterStarted: !prevState.isCounterStarted,
        isCounterEnd: !prevState.isCounterEnd
      }));
      debugger;
      timer = setInterval(() => {
        if (this.state.seconds > 0) {
          debugger;
          this.setState(prevState => ({
            seconds: prevState.seconds - 1
          }));
          // console.log(this.state.seconds)
        } else {
          this.setState(prevState => ({
            showCounter: !prevState.showCounter,
            isCounterStarted: !prevState.isCounterStarted
          }));
          clearInterval(timer);
          console.log(this.state.seconds);
        }
      }, 1000);
      console.log("vcfgxd", this.state.seconds);
      self.setState(prevState => ({
        seconds: 10,
        showCounter: !prevState.showCounter
        // isCounterStarted: !prevState.isCounterStarted,
      }));
    } else {
      await this.saveData();
    }

    this.setState({ iconHeight: "-207px" });
  };

  resetCounter = () => {};

  saveData = async () => {
    debugger;
    var self = this;
    axios
      .post(
        `https://us-central1-joye-768f7.cloudfunctions.net/predictionService`,
        {
          organisationId: "-MHUPaNmo_p85_DR3ABC",
          subOrganisationId: "596ef7d8-f109-4c4e-9c91-81896baa9da5",
          empId: "b172c03f-be43-42e9-b17a-34fe50574266",
          uid: "-MHUPaNmo_p85_DR3ABC || 596ef7d8-f109-4c4e-9c91-81896baa9da5 || b172c03f-be43-42e9-b17a-34fe50574266",
          text: "heytherewhat'sgoingon"
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
      .then(function (res) {
        debugger;
        console.log("response", res);
        // this.setState({ isLoading: false });
        if (!res.data.status && res.data.StatusCode === 401) {
          setAlert("verify", "Please verify your email first");
          removeAlert("loginError");
        } else {
          const data = res.data;
          if (data["gibberish"]) {
            self.setState({
              seconds: 10,
              isCounterStarted: false,
              showCounter: false,
              iconIndex: {
                mic: 2,
                gibberish: 1,
                gesture: 0
              }
            });
          } else {
            debugger;
            self.props.route("analysis");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
  };
  render() {
    const { speachStarted, showCounter, isCounterStarted, seconds, iconIndex, isLoading, isClickHandle, isCounterEnd } = this.state;
    console.log("isCounterStarted", isCounterStarted, "isCounterEnd", isCounterEnd);
    let icons = [Mic, Gibberish, Gesture];
    return !isLoading ? (
      <>
        <PageImage height="26px" width="21.52px" style={{ cursor: "pointer" }} marginTop="-41px" marginLeft="276px" isFromMain={true} logo={Shield} OnClick={e => this.onClickHandle(!showCounter)} />
        <PageImage height="24px" width="24px" style={{ cursor: "pointer" }} marginTop="-41px" marginLeft="-276px" isFromMain={true} logo={InfoIcon} OnClick={e => this.onClickHandle(!showCounter)} />
        {seconds >= 8 && isClickHandle ? (
          <div className="text-container">
            <div className="advertise-text bold" style={{ fontSize: "22px", marginTop: "36px" }}>
              How are you feeling today?
            </div>
          </div>
        ) : seconds <= 6 ? (
          <div className="text-container">
            <div className="advertise-text bold" style={{ color: "#ffffff", lineHeight: "16px", marginTop: "36px" }}>
              <p style={{ fontWeight: "bold", letterSpacing: "1.7px" }}>Excellent!</p>
              <p>
                Tap &nbsp;&nbsp;
                <img height="17.9px" width="18px" style={{ marginTop: "-5px" }} src={ExcellentTick} />
                &nbsp;&nbsp; to proceed
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ color: "#ffffff", lineHeight: "16px", marginTop: "36px" }}>
              <p style={{ fontWeight: "bold", letterSpacing: "1.7px" }}>Express freely for upto 10 sec</p>
              <p>Do not hold back</p>
            </div>
          </div>
        )}

        <div>
          <Circle className={`${isCounterStarted ? "circles ripple" : "circles box-shadow"}`} OnClick={e => this.onClickHandle(!showCounter)} showImg={true} imgStyle={{ width: "222.8px", marginTop: "-113px", marginLeft: "-112px" }} style={{ cursor: "pointer" }} img={speakingcircle} />
        </div>

        {seconds >= 8 && isClickHandle ? <PageImage height="72px" width="58px" style={{ cursor: "pointer" }} marginTop="-171px" isFromMain={true} logo={icons[iconIndex["mic"]]} OnClick={e => this.onClickHandle(!showCounter)} /> : seconds <= 6 ? <PageImage height="41.6px" width="52.8px" style={{ cursor: "pointer" }} marginTop="-216px" isFromMain={true} logo={rightTick} OnClick={e => this.onClickHandle(!showCounter)} /> : <PageImage height="41.6px" width="52.8px" marginTop="-210px" isFromMain={true} logo={"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D"} />}

        {isCounterStarted || isCounterEnd ? <CircularCounter OnClick={e => this.onClickHandle(!showCounter)} /> : ""}
        {!isCounterStarted && !showCounter ? (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "47px" }}>
              <Circle className={`circles box-shadow-small`} style={{ padding: "17%", cursor: "pointer" }} imgStyle={{ width: "47px", marginLeft: "-68px", marginTop: "-70px" }} showImg={true} OnClick={e => this.onClickGesture()} img={icons[iconIndex["gibberish"]]} />
              <Circle className={`circles box-shadow-small`} style={{ padding: "17%", cursor: "pointer", marginLeft: "73px" }} imgStyle={{ width: "25px", marginTop: "-79px" }} showImg={true} OnClick={e => this.onClickHandle(!showCounter)} img={icons[iconIndex["gesture"]]} />
            </div>
            <div style={{ display: "flex", marginTop: "10px", justifyContent: "space-between" }}>
              <div className="text-container" style={{ width: "37%", marginTop: "-34px" }}>
                <div className="advertise-text bold">Sometimes it is good to write</div>
              </div>
              <div className="text-container" style={{ width: "39%", marginTop: "-34px" }}>
                <div className="advertise-text bold">A little deeper reflection</div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div>
              <img width="24.89px" height="30.64px" src={recycle} alt="" onClick={this.speakAgain} style={{ cursor: "pointer", marginTop: "-30px" }} />
              <p onClick={this.speakAgain} style={{ cursor: "pointer", marginTop: "-3px", marginLeft: "5px" }}>
                Speak again
              </p>
            </div>
            <div onClick={this.onCancel} style={{ cursor: "pointer", marginTop: "60px" }}>
              cancel
            </div>
          </div>
        )}
      </>
    ) : (
      <ImportLoader />
    );
  }
}
