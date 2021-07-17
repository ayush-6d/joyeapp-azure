import * as React from "react";
import { Route } from "react-router-dom";
import { BasePage, Circle, PageImage } from "src/components";
import pageHeader from "src/resources/icons/pageHeader2.png";
import processCompleted from "src/resources/icons/speakingcircle.png";
import rightTick from "src/resources/icons/rightTick.png";
import "../Dashboards/Categories/index.scss";
import axios from "axios";
import { createHash } from "src/utilities/generalUtils";
import { firebaseInit } from "src/services/firebase";
import * as firebase from "firebase";
import * as moment from "moment";
export interface IJournalProps {
  route?: any;
  history?: any;
  openModal?: any;
}
export interface IJournalState {
  todaysFeeling?: string;
  jounrnalCheck?: string;
  isSkip?: boolean;
  showJoyelevel?: boolean;
}

export class Journal extends React.PureComponent<IJournalProps, IJournalState> {
  constructor(props: IJournalProps) {
    super(props);
    this.state = {
      todaysFeeling: "",
      jounrnalCheck: "showEverytime",
      isSkip: false,
      showJoyelevel: true
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
          //this.props.history.push(`/dashboard`);
        }
      }
    } else {
      //this.props.history.push(`/dashboard`);
    }
  };

  handleChange = e => {
    const value = e.target.value;
    if (this.state.todaysFeeling.length <= 240) {
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
    debugger;
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

  render() {
    const { todaysFeeling } = this.state;
    const { route } = this.props;
    const headers = ["tellusabout", "saysomething", "congratulation"];

    return (
      <>
        <BasePage withMenu className="login-form">
          <div className="pageHeader">
            <img src={pageHeader} />
          </div>
          <div
            className="render-component"
            style={{
              background: "#1f00a4",
              color: "#fff",
              padding: "40px",
              textAlign: "center",
              minHeight: "700px",
              height: "auto",
              width: "100%",
              justifyContent: "space-around",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <>
              <div className="text-container">
                {todaysFeeling.length <= 240 ? (
                  <div className="advertise-text bold" style={{ fontSize: "16px", marginTop: "18px", color: "ffffff", lineHeight: "13px" }}>
                    <p>Express freely in a few sentences </p>
                    <p>Express freely in a few sentences </p>
                    <p>Do not hold back</p>
                  </div>
                ) : (
                  <div className="advertise-text bold" style={{ fontSize: "18px", marginTop: "18px" }}>
                    <p style={{ fontWeight: "bold", letterSpacing: "1.7px" }}>Excellent!</p>
                    <p>
                      Tap &nbsp;&nbsp;
                      <img height="17.9px" width="18px" style={{ marginTop: "-5px" }} src={rightTick} />
                      &nbsp;&nbsp; to proceed
                    </p>
                  </div>
                )}
              </div>
              <div className="target__body" style={{ marginBottom: "90px", marginTop: "32px" }}>
                <textarea value={todaysFeeling} rows={9} cols={40} placeholder="Tap here and start writing" style={{ borderRadius: "25px", width: "300px", marginLeft: "-10px", fontSize: "16px" }} onChange={this.handleChange} className="target__textarea" />
              </div>
              <div>
                {todaysFeeling.length >= 15 ? (
                  <div style={{ marginLeft: "-4px" }}>
                    <Circle showImg={true} imgStyle={{ width: "203px", marginTop: "1px" }} style={{ cursor: "pointer" }} img={processCompleted} />
                    <div style={{ marginLeft: "115px" }}>
                      <PageImage setCounter={() => this.props.history.push("/yesno")} height="41.6px" width="52.8px" marginTop="141px" style={{ top: "623px" }} logo={rightTick} />
                    </div>
                  </div>
                ) : (
                  <div className="checkbox" style={{ marginTop: "1px" }} onChange={this.setRadioBtn.bind(this)}>
                    <div>
                      <input type="radio" value="donotShowEverytime" name="jounrnalCheck" />
                      Show this less often
                    </div>
                    <div>
                      <input type="radio" value="showEverytime" defaultChecked name="jounrnalCheck" />
                      Show this often
                    </div>
                  </div>
                )}

                <div className="advertise-text bold" onClick={this.setRoute} style={{ fontSize: "18px", marginTop: "60px" }}>
                  Skip
                </div>
              </div>
            </>
          </div>
        </BasePage>
      </>
    );
  }
}
