import * as React from "react";
import { MobileCircularCounter, Circle, ImportLoader, PageImage, BasePage } from "src/components";
import Mic from "../../../../resources/icons/mic.png";
import rightTick from "../../../../resources/icons/rightTick.png";
import Gibberish from "../../../../resources/icons/gibberish.png";
import recycle from "../../../../resources/icons/recycle.png";
import Gesture from "../../../../resources/icons/gesture.png";
import ExcellentTick from "../../../../resources/icons/ExcellentTick.png";
import speakingcircle from "../../../../resources/icons/speakingcircle.png";
import axios from "axios";
import { removeAlert, setAlert } from "src/actions/alertAction";
import { TellUsAbout } from "../Tellusabout";
import MicRecorder from "mic-recorder-to-mp3";
import { Modal } from "src/components/Modal";
import { isMobile } from "react-device-detect";
import * as microsoftTeams from "@microsoft/teams-js";

import "./index.scss";
import { withRouter, RouteComponentProps } from "react-router";

export interface IMobileMainProps extends RouteComponentProps {
  route?: any;
  openModal?: any;
}
let timer = null;
let icons = [Mic, Gibberish, Gesture];
const Mp3Recorder = new MicRecorder({ bitRate: 128 });

export interface IMobileMainState {
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
  isHardStop?: boolean;
  withMenu?: boolean;
  showShield?: boolean;
  showInfoIcon?: boolean;
  audio?: any;
}

export class MobileMainClass extends React.PureComponent<IMobileMainProps, IMobileMainState> {
  constructor(props: IMobileMainProps) {
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
      seconds: 60,
      iconHeight: "-171px",
      isClickHandle: true,
      isTellusabout: false,
      isModalOpen: false,
      modalData: {},
      isHardStop: false,
      withMenu: true,
      showShield: true,
      showInfoIcon: true
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
            seconds: 60,
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
    this.setState(
      prevState => ({ showCounter: !prevState.showCounter, isCounterStarted: false, isCounterEnd: false, seconds: 60 }),
      () => {
        this.startCounter(true, false);
      }
    );
  };

  onClickGesture = () => {
    this.setState({ isTellusabout: true, isLoading: true });
  };

  navigateToSlider = () => {
    this.props.history.push("/dashboard")
  }

  setIsTellusabout = () => {
    this.setState({ isTellusabout: false, isLoading: false });
  };

  startCounter = async (showCounter, isFromGesture) => {
    const self = this;
    let geture = self.state.iconIndex["mic"];
    this.setState({ isClickHandle: false, withMenu: false, showInfoIcon: true, showShield: false });

    if (geture === 2 && isFromGesture) {
      this.setCounter(showCounter);
    } else {
      this.setState({ seconds: 60, isClickHandle: true, isTellusabout: false, isCounterEnd: false });
    }

    if (geture != 2 && !isFromGesture) {
      this.setCounter(showCounter);
    } else {
      this.setState({ seconds: 60, isClickHandle: true });
    }
  };

  setCounter = async showCounter => {
    const self = this;
    this.setState({ isClickHandle: false });
    if (showCounter) {
      this.setState(prevState => ({
        showCounter: !prevState.showCounter,
        isCounterStarted: !prevState.isCounterStarted,
        isCounterEnd: !prevState.isCounterEnd,
        iconIndex: { mic: 0, gibberish: 1, gesture: 2 }
      }));

      timer = setInterval(() => {
        if (this.state.seconds > 0) {
          this.setState(prevState => ({
            seconds: prevState.seconds - 1
          }));
        } else {
          if (!self.state.isHardStop) {
            this.setState(
              prevState => ({ showCounter: !prevState.showCounter, isCounterStarted: !prevState.isCounterStarted }),
              () => {
                clearInterval(timer);
                self.stop();
              }
            );
          } else {
            clearInterval(timer);
            this.setState({ isClickHandle: true, seconds: 60, isCounterStarted: false, isCounterEnd: false });
          }
        }
      }, 1000);
      self.setState(prevState => ({ seconds: 60, showCounter: !prevState.showCounter }));
    } else {
      await this.saveData("", false);
    }
  };

  convertBase64 = async Base64String => {
    console.log('Base64String', Base64String)
    let pureBase64String=''
    this.setState(
      prevState => ({ isLoading: true, isTellusabout: false, isCounterEnd: false }),
      () => {
        let todaysFeeling = "";
        if(isMobile)
        {
          pureBase64String = Base64String;
        }else {
          pureBase64String = Base64String.split("base64,")[1];
        }
         
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
            console.log("responce:", res);
            if (responce) {
              responce.map((data, index) => {
                data.alternatives.map((data, index) => {
                  todaysFeeling += data.transcript;
                });
              });
              console.log('todaysFeeling', todaysFeeling);
              await self.saveData(todaysFeeling, true);
            } else {
              self.setState({ 
                isClickHandle: true,
                seconds: 60,
                iconIndex: { mic: 2, gibberish: 1, gesture: 0 } , 
                isLoading: false, 
                isCounterEnd: false, 
                isCounterStarted: false,
                showCounter: false, });
            }
          });
      }
    );
  };

  saveData = async (todaysFeeling, isFromBase64) => {
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
        console.log("predictionService", res);
        if (!res.data.status && res.data.StatusCode === 401) {
          setAlert("verify", "Please verify your email first");
          removeAlert("loginError");
        } else {
          const data = res.data;

          if (data["gibberish"]) {
            self.setState({
              seconds: 60,
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
              isLoading: false,
              withMenu: true, 
              showInfoIcon: true,
              showShield: true
            });
          }

          if (data["caution"]) {
            self.setState({
              seconds: 60,
              isCounterStarted: false,
              showCounter: false,
              isClickHandle: true,
              isTellusabout: false,
              isCounterEnd: false,
              isLoading: false,
              isModalOpen: true,
              modalData: {
                title: "Take Charge!",
                header: "A random uote from database",
                content: "Please contact below services"
              }
            });
          }

          if (data["success"]) {
            self.setState({ isLoading: false, isCounterStarted: false, isCounterEnd: false,  withMenu: true, showInfoIcon: true, showShield: true });
            self.props.history.push("/pre-pie-chart");
          }
        }
      })
      .catch(function (error) {
        console.log(error);
        throw error;
      });

    if (isFromBase64) {
      //this.setState({isClickHandle: true, isTellusabout: false, seconds: 10, showCounter: false, isCounterEnd: false})
    } else {
      this.setState({ isTellusabout: false });
    }

    //this.setState({ isLoading: false, isCounterStarted: false, isCounterEnd: false})
  };

  getMobileBase64 = async url =>  {
    var self = this;
    return axios
      .get(url, {
        responseType: 'arraybuffer'
      })
      .then(function (res){
        clearInterval(timer);
        self.setState(
          prevState => ({ isLoading: true, isCounterEnd: false, showCounter: false,isCounterStarted: false, isHardStop: true, isClickHandle: true }),
          () => {
            let mobileBase64 = Buffer.from(res.data, 'binary').toString('base64')
            self.convertBase64(mobileBase64);
          }
        );
           
      })
  }

  onStartRecodring = (showCounter, isFromGesture) => {
    var self = this;
    
    if (isMobile) {
      self.startCounter(showCounter, isFromGesture);
      
      microsoftTeams.initialize()
      
      let mediaInput: microsoftTeams.media.MediaInputs = {
        mediaType: microsoftTeams.media.MediaType.Audio,
        maxMediaCount: 1
        //audioProps: { maxDuration: 1 },
      };
      
  microsoftTeams.media.selectMedia(mediaInput, (error: microsoftTeams.SdkError, attachments: microsoftTeams.media.Media[]) => {
        if (error) {
          if (error.message) {
            alert(" ErrorCode: " + error.errorCode + error.message);
          } else {
            alert(" ErrorCode: " + error.errorCode);
          }
        }
        
        // If you want to directly use the audio file (for smaller file sizes (~4MB))    if (attachments) {
        console.log('attachments',attachments)
        
        let audioResult = attachments[0];
        
        console.log('audioResult',audioResult);
        //console.log('audioResult.preview',audioResult.preview)
        //self.setState({ audio: "data" + audioResult.mimeType + ";base64," + audioResult.preview})
        
        audioResult.getMedia((error: microsoftTeams.SdkError, blob: Blob) => {
        debugger;
        if (blob) {
          var data = new Blob([blob], { type: blob.type });
          console.log('data:', data);

          var reader = new FileReader();
          reader.readAsDataURL(data);
          reader.onloadend = function () {
            let base64String = (reader.result as string).replace("data:video/mp4;base64,", "");
            base64String = base64String.substring(0, base64String.indexOf('AAAAAAAA'));
            base64String = base64String.substring(0, (base64String.length - (base64String.length % 4)));

            let convertOptions = {
              "apikey": "dZjagqgkZ4SSbKp1IzQyxxEyAyJehISdYvxkUU9P9mnYaQtEyvfHwEs3I6ULo5kj",
              "inputformat": "mp4",
              "outputformat": "mp3",
              "input": "base64",
              "filename": "my.mp4",
              "file": base64String,
              "wait": true,
              "download": false,
              "save": true
            }
            let url = 'https://api.cloudconvert.com/v1/convert';
            fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(convertOptions) }).then(x => {
              setTimeout(() => {
                fetch(x.url).then(x => x.json()).then(x => {
                  document.getElementById('output2').innerHTML = JSON.stringify(x);
                  
                  fetch(x.output.url).then(x=>x.blob())
                    .then(x=> {
                      const reader = new FileReader();
                      reader.readAsDataURL(x);
                      reader.onloadend = () => {
                        let str = (reader.result as string).replace("data:audio/mpeg;base64,","");
                        axios.post(`https://us-central1-joye-768f7.cloudfunctions.net/translateSpeechToText`,
                        {
                          version: "v1p1beta1",
                          audio: { content: str },
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
            document.getElementById('output1').innerHTML = JSON.stringify(res);
          });
                        
                      }
                    });
                });
              }, 2000);
            });
          }
        }
      });

        if (error) {
          if (error.message) {
            alert(" ErrorCode: " + error.errorCode + error.message);
          } else {
            alert(" ErrorCode: " + error.errorCode);
          }
        }
      });
    } else {
      Mp3Recorder.start()
        .then(() => {
          this.startCounter(showCounter, isFromGesture);
        })
        .catch(e => console.error(e));
    }
  };

  stop = () => {
    var self = this;
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        console.log('blob', blob);
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

  HardStop = () => {
    clearInterval(timer);
    this.setState(
      prevState => ({ isLoading: true, isCounterEnd: false, showCounter: false,isCounterStarted: false, isHardStop: true, isClickHandle: true }),
      () => {
        this.stop();
      }
    );
  };

  render() {
    const { speachStarted, showCounter, isCounterStarted, seconds, iconIndex, isLoading, isClickHandle, isCounterEnd, isTellusabout, isModalOpen, modalData, withMenu, showShield, showInfoIcon } = this.state;

    return !isLoading ? (
      <>
      <BasePage withMenu={withMenu} showShield={showShield} showInfoIcon={showInfoIcon}>
      {isClickHandle ? (<div className="pageHeader">
         <Circle className={`circles score-point`} showImg={false} />
      </div>): null}
        {seconds >= 58 && isClickHandle ? (
          <div className="text-container">
            <div className="advertise-text bold text-blue" style={{ fontSize: "17px", marginTop: "35px" }}>
              <p>How are you feeling today?</p>
              <p className="do-not-txt">&nbsp;</p>
            </div>
          </div>
        ) : seconds <= 56 ? (
          <div className="text-container">
            <div>
              <div className="advertise-text bold text-blue" style={{ marginTop: "35px" }}>
                <p>Express freely for upto 10 sec</p>
                <p className="do-not-txt">
                  Tap &nbsp;&nbsp;
                  <img height="17.9px" width="18px" style={{ marginTop: "-5px" }} src={ExcellentTick} />
                  &nbsp;&nbsp; to proceed
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-container">
            <div className="advertise-text bold text-blue" style={{ marginTop: "35px" }}>
              <p>Express freely for upto 10 sec</p>
              <p className="do-not-txt">
                Tap &nbsp;&nbsp;
                <img height="17.9px" width="18px" style={{ marginTop: "-5px" }} src={ExcellentTick} />
                &nbsp;&nbsp; to proceed
              </p>
            </div>
          </div>
        )}

        <div className="rel home-screen-box">
          <Circle className={`${isCounterStarted ? "circles ripple" : ""}`} showImg={true} imgStyle={{ width: "222.8px", height: "222.8px" }} style={{ cursor: "pointer" }} img={speakingcircle} />
          {seconds >= 58 && isClickHandle ? <PageImage height="72px" width="auto" style={{ cursor: "pointer" }} isFromMain={true} logo={icons[iconIndex["mic"]]} OnClick={e => this.onStartRecodring(!showCounter, false)} /> : seconds <= 59 ? <PageImage height="41.6px" width="52.8px" style={{ cursor: "pointer" }} isFromMain={true} logo={rightTick} OnClick={this.HardStop} /> : <PageImage height="41.6px" width="52.8px" isFromMain={true} logo={"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D"} />}
          {isCounterStarted || isCounterEnd ? <MobileCircularCounter /> : ""}
        </div>
        {!isCounterStarted && !showCounter ? (
          <div className="bottom-container" style={{ height: "201px" }}>
            <div className="width300" style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Circle className={`circles box-shadow-small circlesmalls`} style={{ cursor: "pointer" }} imgStyle={{ width: "47px" }} showImg={true} OnClick={e => this.onClickGesture()} img={icons[iconIndex["gibberish"]]} />
                <div className="advertise-text bold index-advertise-text font-15">
                  It is good
                  <br />
                  to write
                </div>
              </div>
              <div>
                <Circle className={`circles box-shadow-small circlesmalls`} style={{ cursor: "pointer" }} imgStyle={{ width: "25px" }} showImg={true} OnClick={e => this.navigateToSlider()} img={icons[iconIndex["gesture"]]} />
                <div className="advertise-text bold index-advertise-text  font-15">
                  A little deeper
                  <br /> reflection
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bottom-container" style={{ height: "201px" }}>
            <div>
              <img width="30px" height="30px" src={recycle} alt="" onClick={this.speakAgain} style={{ cursor: "pointer", marginTop: "-30px" }} />
              <p className="index-advertise-text" onClick={this.speakAgain} style={{ cursor: "pointer", marginTop: "-3px", marginLeft: "5px" }}>
                Speak again
              </p>
            </div>
            <div className="" onClick={this.onCancel} style={{ cursor: "pointer", marginTop: "35px" }}>
            <div className="n-btn"> cancel</div> 
            </div>
          </div>
        )}
        </BasePage>
      </>
    ) : isTellusabout ? (
      <TellUsAbout saveData={this.saveData} setIsTellusabout={this.setIsTellusabout} />
    ) : isLoading ? (
      <ImportLoader />
    ) : isModalOpen ? (
      <Modal openModal={isModalOpen} modalData={modalData} HelpLineServices={["SOS", "HelpLine", "Cancel"]}></Modal>
    ) : null;
  }
}

export const MobileMain = withRouter(MobileMainClass);
