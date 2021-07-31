import * as React from "react";
import { CircularCounter, Circle, ImportLoader, PageImage } from "src/components";
import Mic from "../../../../resources/icons/mic.png";
import rightTick from "../../../../resources/icons/rightTick.png";
import Gibberish from "../../../../resources/icons/gibberish.png";
import recycle from "../../../../resources/icons/recycle.png";
import Gesture from "../../../../resources/icons/gesture.png";
import ExcellentTick from "../../../../resources/icons/ExcellentTick.png";
import speakingcircle from "../../../../resources/icons/speakingcircle.png";
import axios from "axios";
import { removeAlert, setAlert } from "src/actions/alertAction";
import speakingcircleNew from "../../../../resources/icons/ProcessCompletedNew.png";
import { ScorePoint } from "../scorepoints";
import ProcessComplete from "../../../../resources/icons/ProcessCompleted.png";
import { loginUser } from "src/actions/loginActions";
import { UserModel } from "src/Models/UserModel";
import { parseJwt, saveUserDataForSession } from "src/utilities/generalUtils";
import { SVGData } from "src/components/Loader/SVGData";
import { TellUsAbout } from "../Tellusabout";
import MicRecorder from "mic-recorder-to-mp3";
import { Modal } from "src/components/Modal";


import "./index.scss";

export interface IMainProps {
  route?: any;
  openModal?: any;
}
let timer = null;
const Mp3Recorder = new MicRecorder({ bitRate: 128 });
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
  isTellusabout?: boolean;
  isModalOpen?: boolean;
  modalData?: any;
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
      isClickHandle: true,
      isTellusabout: false,
      isModalOpen: false,
      modalData:{}
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
    this.setState(prevState => ({ showCounter: !prevState.showCounter, isCounterStarted: false, isCounterEnd: false, seconds: 10 }), () => {
      this.onClickHandle(true);
    });
 };
 
  onClickGesture = () => {
    this.setState({ isTellusabout: true, isLoading: true });
  };

  setIsTellusabout = () => {
    this.setState({ isTellusabout: false, isLoading: false });
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

      timer = setInterval(() => {
        if (this.state.seconds > 0) {
          this.setState(prevState => ({
            seconds: prevState.seconds - 1
          }));
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
      }));
    } else {
      await this.saveData("" ,false);
    }

    this.setState({ iconHeight: "-207px" });
  };

  

  convertBase64 = async Base64String => {

    this.setState(prevState => ({ isLoading: true, isTellusabout: false, isCounterEnd: false}), () => {
    
    let pureBase64String = Base64String.split("base64,")[1];
    var self = this;
    self.setState({ isLoading: true, isTellusabout: false });
    axios
      .post(
        `https://us-central1-joye-768f7.cloudfunctions.net/translateSpeechToText`,
        {
          version: "v1p1beta1",
          audio: { content: pureBase64String },
          config: {
            sampleRateHertz: 8000,
            enableAutomaticPunctuation: true,
            encoding: "MP3",
            languageCode: "en-US"
          }
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
      .then(async function (res) {
        const responce = res.data.results;
        let todaysFeeling='';
        responce.map((data, index) => {
          data.alternatives.map((data, index) => {
            todaysFeeling += data.transcript;
          })
        });
        await self.saveData(todaysFeeling, true);
      });
    });
  };


  saveData = async (todaysFeeling, isFromBase64) => {
    console.log('todaysFeeling:', todaysFeeling);
    var self = this;
    axios
      .post(
        `https://us-central1-joye-768f7.cloudfunctions.net/predictionService`,
        {
          organisationId: "-MHUPaNmo_p85_DR3ABC",
          subOrganisationId: "596ef7d8-f109-4c4e-9c91-81896baa9da5",
          empId: "b172c03f-be43-42e9-b17a-34fe50574266",
          uid: "-MHUPaNmo_p85_DR3ABC || 596ef7d8-f109-4c4e-9c91-81896baa9da5 || b172c03f-be43-42e9-b17a-34fe50574266",
          text: todaysFeeling 
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        }
      )
      .then(function (res) {
        console.log('predictionService:',res);
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
              },
              isClickHandle: true, 
              isTellusabout: false,
              isCounterEnd: false,
              isLoading: false
            });
          }

          if (data["caution"]) {
             self.setState({ 
              seconds: 10,
              isCounterStarted: false,
              showCounter: false,
              isClickHandle: true, 
              isTellusabout: false,
              isCounterEnd: false,
              isLoading: true,
              isModalOpen: true,
              modalData: {
                title: "Take Charge!",
                header: "A random uote from database",
                content: "Please contact below services"
              }
              })
          }

          if (data["success"]) {
            self.setState({ isLoading: false })
          }

        }
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });
   
      if(isFromBase64) {
        //this.setState({isClickHandle: true, isTellusabout: false, seconds: 10, showCounter: false, isCounterEnd: false})
      }
      else{
        this.setState({ isTellusabout: false });
      }
    
  };

  start = () => {
    Mp3Recorder.start()
      .then(() => {})
      .catch(e => console.error(e));
  };

  stop = () => {
   var self = this;
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        
        const file = new File(buffer, "me-at-thevoice.mp3", {
          type: blob.type,
          lastModified: Date.now()
        });
        
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = function () {
          self.convertBase64(reader.result);
        };
      })
      .catch(e => console.log(e));
  };
  
  HardStop=() => {
    this.setState(prevState => ({ isCounterEnd: true}), () => {
      this.stop();
    });
  }

  render() {
    const { speachStarted, showCounter, isCounterStarted, seconds, iconIndex, isLoading, isClickHandle, isCounterEnd, isTellusabout, isModalOpen, modalData } = this.state;
    let icons = [Mic, Gibberish, Gesture];
    return !isLoading ? (
      <>
        {seconds >= 8 && isClickHandle ? (
          <div className="text-container">
            <div className="advertise-text bold" style={{ fontSize: "20px", marginTop: "35px" }}>
              How are you feeling today?
            </div>
          </div>
        ) : seconds <= 6 ? (
          <div className="text-container">
            <div className="advertise-text bold" style={{ marginTop: "35px" }}>
              <p style={{ fontSize: "20px" }}>Excellent!</p>
              <p>
                Tap &nbsp;&nbsp;
                <img height="17.9px" width="18px" src={ExcellentTick} />
                &nbsp;&nbsp; to proceed
              </p>
            </div>
          </div>
        ) : (
          <div>
            <div style={{ fontSize: "17px", marginTop: "35px" }}>
              <p>Express freely for upto 10 sec</p>
              <p className="do-not-txt">Do not hold back</p>
            </div>
          </div>
        )}

        <div className="rel">
          <Circle className={`${isCounterStarted ? "circles ripple" : ""}`} OnClick={e => this.onClickHandle(!showCounter)} showImg={true} imgStyle={{ width: "222.8px" }} style={{ cursor: "pointer" }} img={speakingcircle} />
          {seconds >= 8 && isClickHandle ? <PageImage height="72px" width="58px" style={{ cursor: "pointer" }} isFromMain={true} logo={icons[iconIndex["mic"]]} OnClick={e => this.onClickHandle(!showCounter)} /> : seconds <= 6 ? <PageImage height="41.6px" width="52.8px" style={{ cursor: "pointer" }} isFromMain={true} logo={rightTick} OnClick={this.HardStop} /> : <PageImage height="41.6px" width="52.8px" isFromMain={true} logo={"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D"} />}
          {isCounterStarted || isCounterEnd ? <CircularCounter  OnClick={e => this.onClickHandle(!showCounter)} start={this.start} stop={this.stop} /> : ""}
        </div>
        {!isCounterStarted && !showCounter ? (
          <div className="bottom-container">
            <div className="width300" style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Circle className={`circles box-shadow-small circlesmalls`} style={{ cursor: "pointer" }} imgStyle={{ width: "47px" }} showImg={true} OnClick={e => this.onClickGesture()} img={icons[iconIndex["gibberish"]]} />
                <div className="advertise-text bold index-advertise-text">
                  Sometimes it is <br />
                  good to write
                </div>
              </div>
              <div>
                <Circle className={`circles box-shadow-small circlesmalls`} style={{ cursor: "pointer" }} imgStyle={{ width: "25px" }} showImg={true} OnClick={e => this.onClickHandle(!showCounter)} img={icons[iconIndex["gesture"]]} />
                <div className="advertise-text bold index-advertise-text">
                  A little deeper
                  <br /> reflection
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bottom-container">
            <div>
              <img width="30px" height="30px" src={recycle} alt="" onClick={this.speakAgain} style={{ cursor: "pointer", marginTop: "-30px" }} />
              <p className="index-advertise-text" onClick={this.speakAgain} style={{ cursor: "pointer", marginTop: "-3px", marginLeft: "5px" }}>
                Speak again
              </p>
            </div>
            <div className="n-btn" onClick={this.onCancel} style={{ cursor: "pointer", marginTop: "35px" }}>
              cancel
            </div>
          </div>
        )}
      </>
    ) : (
      isTellusabout ? (<TellUsAbout saveData={this.saveData} setIsTellusabout={this.setIsTellusabout} />): isLoading ? (<ImportLoader />) : isModalOpen ? (<Modal openModal={isModalOpen} modalData={modalData} HelpLineServices={["SOS", "HelpLine", "Cancel"]}></Modal>): null
    );
    
  }
}
