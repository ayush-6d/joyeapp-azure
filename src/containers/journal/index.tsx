import * as React from "react";
import { Route } from "react-router-dom";
import { BasePage, Circle, PageImage } from "src/components";
//import pageHeader from "src/resources/icons/pageHeader2.png";
import processCompleted from "src/resources/icons/speakingcircle.png";
import rightTick from "src/resources/icons/rightTick.png";

import ExcellentTick from "src/resources/icons/ExcellentTick.png";
import "../Dashboards/Categories/index.scss";
import axios from "axios";
import { createHash } from "src/utilities/generalUtils";
import { firebaseInit } from "src/services/firebase";
import * as firebase from "firebase";
import moment from "moment";
import { Yesno } from "src/containers/Yesno";
import { withRouter, RouteComponentProps } from "react-router";

export interface IJournalProps extends RouteComponentProps{
  route?: any;
  history: any;
  openModal?: any;
}

export interface IJournalState {
  todaysFeeling?: string;
  jounrnalCheck?: string;
  isSkip?: boolean;
  showJoyelevel?: boolean;
  showYesno?: boolean;
}

export class Journalclass extends React.PureComponent<IJournalProps, IJournalState> {
  constructor(props: IJournalProps) {
    super(props);
    this.state = {
      todaysFeeling: "",
      jounrnalCheck: "showEverytime",
      isSkip: false,
      showJoyelevel: true,
      showYesno: false
    };
  }

  componentDidMount() {
    this.getJournalLogic();
  }

  getJournalLogic = async () => {
    let todaysDate = moment(new Date()).format("DD-MM-YYYY");

    var dayCount = new Date().getDay();

    let isSkipSaved = false;
    let jounrnalCheckSaved = "";
    let joyelevelscore = 0;
    let isOnceDay = false;

    let userId = await createHash("596ef7d8-f109-4c4e-9c91-81896baa9da5");
    const userRefjournalText = await firebase.database().ref(`users/${userId}/brew/brewdata/journalText`);

    userRefjournalText.on("value", snapshot => {
      snapshot.forEach(data => {
        const dataVal = data.val();
        isSkipSaved = dataVal.isSkip;
        jounrnalCheckSaved = dataVal.jounrnalCheck;
      });
    });

    console.log("todaysDate", todaysDate, jounrnalCheckSaved);
    const userRefJoyelevel = await firebase.database().ref(`users/${userId}/brew/brewdata/${todaysDate}/currentAverage`);

    userRefJoyelevel.on("value", snapshot => {
      snapshot.forEach(data => {
        const dataVal = data.val();
        joyelevelscore = dataVal;
      });
    });

    const userRefOnceAday = await firebase.database().ref(`users/${userId}/brew/brewdata/${todaysDate}/OnceAday`);

    userRefOnceAday.on("value", snapshot => {
      snapshot.forEach(data => {
        const dataVal = data.val();
        isOnceDay = dataVal;
      });
    });

    if (joyelevelscore > 6 || joyelevelscore < 5) {
      if (jounrnalCheckSaved === "donotShowEverytime" && dayCount > 0 && dayCount <= 3 && !isOnceDay) {
        this.setState({ showJoyelevel: true });
        let OnceDay = { isOnceDay: true };

        firebaseInit
          .database()
          .ref(`users/${userId}/brew/brewdata/${todaysDate}/OnceAday`)
          .set({ OnceDay })
          .catch(error => this.onFail(error));
      } else {
        if (jounrnalCheckSaved === "showEverytime") {
          this.setState({ showJoyelevel: true });
        } else {
          this.props.history.push(`/dashboard`);
        }
      }
    } else {
      this.props.history.push(`/dashboard`);
    }
  };

  handleYesno() {
    this.setState({ showYesno: true });
  }

  handleChange = e => {
    const value = e.target.value;
    if (this.state.todaysFeeling.length <= 150) {
      this.setState({
        todaysFeeling: value
      });
    }
  };

  setRadioBtn(event) {
    this.setState({ jounrnalCheck: event.target.value });
  }

  onFail(error) {
    console.log(error, "Jounrnal data not saved");
  }

  saveData = async isSkip => {
    // debugger;
    let userId = await createHash("596ef7d8-f109-4c4e-9c91-81896baa9da5");

    let jounrnalDetalis = {
      isSkip: isSkip,
      todaysFeeling: this.state.todaysFeeling,
      jounrnalCheck: this.state.jounrnalCheck,
      CreatedYesNo: "",
      CreatedDateTime: Date().toLocaleString()
    };

    firebaseInit
      .database()
      .ref(`users/${userId}/brew/brewdata/journalText`)
      .set({ jounrnalDetalis })
      .catch(error => this.onFail(error));

    const data = await firebaseInit.database().ref(`users/${userId}/brew/brewdata/journalText`).once("value");
    console.log("data", data);
  };

  setRoute = () => {
    this.saveData(true);
    this.props.history.push(`/dashboard`);
  };
  renderYesnoContent = () => {
    if (this.state.showYesno) {
      return <Yesno />;
    }
  };
  render() {
    const { todaysFeeling, showYesno } = this.state;
    const { route, history } = this.props;
    const headers = ["tellusabout", "saysomething", "congratulation"];
    return (
      <>
        {showYesno ? (
          this.renderYesnoContent()
        ) : (
          <BasePage withMenu showInfoIcon className="login-form home-screen">
            <div
              className="render-component"
              style={{
                padding: "0px",
                textAlign: "center",
                minHeight: "87vh",
                height: "auto",
                width: "100%",
                justifyContent: "space-around",
                display: "flex",
                flexDirection: "column",
                maxWidth: "748px",
                margin: "0 auto",
                position: "relative"
              }}
            >
              <>
              <div className="text-container">
                  {todaysFeeling.length <= 150 ? (
                    <div  className="advertise-text bold text-blue" style={{  marginTop: "35px",height:"62px" }}>
                      <p>Express freely in a few sentences </p>
                      {/* <p className="do-not-txt">
                        Tap &nbsp;&nbsp;
                        <img height="17.9px" width="18px" style={{ marginTop: "-5px" }} src={ExcellentTick} />
                        &nbsp;&nbsp; to proceed
                          </p>                 */}
                    </div>
                  ) : 
                  (
                    <div  className="advertise-text bold text-blue" style={{  marginTop: "35px",height:"62px" }}>
                    <p>Express freely in a few sentences </p>
                      {/* <p className="do-not-txt">
                        Tap &nbsp;&nbsp;
                        <img height="17.9px" width="18px" style={{ marginTop: "-5px" }} src={ExcellentTick} />
                        &nbsp;&nbsp; to proceed
                          </p>                 */}
                  </div>
                  )
                  }
                </div>
                <div className="target__body">
                  <textarea value={todaysFeeling} rows={6} cols={40} maxLength={150} placeholder="Tap here and start writing"  onChange={this.handleChange} className="target__textarea about-textarea" />
                </div>
                <div className="circle-box-container">
                <div className="circle-box">
                  {todaysFeeling.length >= 15 ? (
                    <div className="position-relative journal-container">
                      <Circle showImg={true} imgStyle={{ width: "203px", marginTop: "1px" }} style={{ cursor: "pointer" }} img={processCompleted} />
                      <div>
                        <PageImage setCounter={() => this.handleYesno()} height="41.6px" width="52.8px" logo={rightTick} />
                      </div>
                    </div>
                  ) : (
                    <div className="checkbox journal-checkbox" style={{ marginTop: "1px" }} onChange={this.setRadioBtn.bind(this)}>
                      <div>
                        <input type="radio" value="donotShowEverytime" name="jounrnalCheck" />
                        <span className="index-advertise-text font-15"> Show less often</span>
                      </div>
                      <div>
                        <input type="radio" value="showEverytime" defaultChecked name="jounrnalCheck" />
                        <span className="index-advertise-text font-15"> Show often</span>
                      </div>
                    </div>
                  )}
 </div>
                  <div className="bottom-btn">
                  <div className="n-btn" onClick={this.setRoute} >
                    skip
                  </div>
                  </div>
                </div>
              </>
            </div>
          </BasePage>
        )}
      </>
    );
  }
}

export const Journal = withRouter(Journalclass);
