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
import { getAuthId, getDbUrl } from "src/services/localStorage.service";

export interface IJournalProps extends RouteComponentProps {
  route?: any;
  history: any;
  openModal?: any;
  data?: any;
}

export interface IJournalState {
  todaysFeeling?: string;
  jounrnalCheck?: string;
  isSkip?: boolean;
  showJoyelevel?: boolean;
  showYesno?: boolean;
  jQuestion?: string;
  cQuestion?: string,
  journalCount?: any;
  happinessCounter: string;
  avg: string,
  dominantemotion: string,
  weekdata: string,
}

let isSkipSaved = false;
let jounrnalCheckSaved = "";
let todaysFeeling = "";
let joyelevelscore = 0;
let isOnceDay = false;
let dbRef = firebaseInit.database(getDbUrl());
export class Journalclass extends React.PureComponent<IJournalProps, IJournalState> {
  constructor(props: IJournalProps) {
    super(props);
    this.state = {
      todaysFeeling: "",
      jounrnalCheck: "showEverytime",
      isSkip: false,
      showJoyelevel: true,
      showYesno: false,
      jQuestion: "",
      cQuestion: "",
      journalCount: 0,
      happinessCounter: "",
      avg: "",
      dominantemotion: "",
      weekdata: "",
    };
  }

  async componentDidMount() {
    this.getJournalLogic();
  }

  getJournalLogic = async () => {
    let todaysDate = moment(new Date()).format("DD-MM-YYYY");

    const userId = getAuthId();

    const query = await dbRef.ref(`users/${userId}/brew/brewData/${todaysDate}`);
    let snapshot: any = await query.once("value");
    snapshot = snapshot.val()
    console.log("snapshot", snapshot)

    isSkipSaved = snapshot.isSkip
    jounrnalCheckSaved = snapshot.jounrnalCheck
    todaysFeeling = snapshot.todaysFeeling
    joyelevelscore = snapshot.current_avarage
    this.setState({
      jQuestion: snapshot.journalQuestion,
      cQuestion: snapshot.congratulationQuestion
    });

    console.log("todaysFeeling", todaysFeeling)
    console.log("joyelevelscore", joyelevelscore)

    const currentWeek: any = moment().format('w');
    const year = moment().format('yyyy');
    const currentWeekData = await dbRef.ref(`users/${userId}/brew/weeks_average/${currentWeek}_${year}`);
    let data: any = await currentWeekData.once("value");
    data = data.val()
    console.log("data", data)
    this.setState({ journalCount: data.journalCount });
    this.setState({ avg: data.avg });
    this.setState({ happinessCounter: data.happinessCounter });
    this.setState({ dominantemotion: data.dominantemotion });
    this.setState({ weekdata: data.weekdata });


    if (!todaysFeeling) {
      if (joyelevelscore > 6 && joyelevelscore < 5 && this.state.journalCount <= 3) {
        if (jounrnalCheckSaved === "donotShowEverytime") {
          this.setState({ showJoyelevel: true });
          console.log("donotShowEverytime")

        } else {
          if (jounrnalCheckSaved === "showEverytime" || jounrnalCheckSaved === undefined || jounrnalCheckSaved === "") {
            this.setState({ showJoyelevel: true });
            console.log("showEverytime")
          } else {
            this.handleYesno();
            console.log('not showing because showEverytime is', jounrnalCheckSaved)
            // this.props.history.push(`/dashboard`);
          }
        }
      } else {
        this.handleYesno();
        console.log('not showing because joyelevelscore is', joyelevelscore)
        // this.props.history.push(`/dashboard`);
      }
    } else {
      this.handleYesno();
      console.log('not showing because todaysFeeling is', todaysFeeling)
      // this.props.history.push(`/dashboard`);
    }
  };

  handleYesno() {
    this.setState({ showYesno: true });
  };

  handleChange = e => {
    const value = e.target.value;
    if (this.state.todaysFeeling.length <= 150) {
      this.setState({
        todaysFeeling: value
      });
      // let todaysDate = moment(new Date()).format("DD-MM-YYYY");
      //   const userId = getAuthId();
      // dbRef
      //   .ref(`users/${userId}/brew/brewData/${todaysDate}`)
      //   .update({ journalText : value })
      //   .catch(error => this.onFail(error));
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
    let todaysDate = moment(new Date()).format("DD-MM-YYYY");

    const userId = getAuthId();
    // let userId = await createHash("596ef7d8-f109-4c4e-9c91-81896baa9da5");

    let jounrnalDetalis = {
      isSkip: isSkip,
      todaysFeeling: this.state.todaysFeeling,
      jounrnalCheck: this.state.jounrnalCheck,
      CreatedYesNo: "",
      CreatedDateTime: Date().toLocaleString()
    };
    let todaysData = (await dbRef
      .ref(`users/${userId}/brew/brewData/${todaysDate}`).once('value')).val();
    todaysData = {
      ...todaysData,
      ...jounrnalDetalis,
    }
    console.log('todaysData', todaysData);
    dbRef
      .ref(`users/${userId}/brew/brewData/${todaysDate}`)
      .set(todaysData)
      .catch(error => this.onFail(error));
  };

  setRoute = () => {
    const userId = getAuthId();
    const weekOfYear = moment().format("w_yyyy");
    dbRef
      .ref(`users/${userId}/brew`)
      .child("weeks_average")
      .update({
        [weekOfYear]: {
          avg: this.state.avg,
          dominantemotion: this.state.dominantemotion,
          happinessCounter: this.state.happinessCounter,
          weekdata: this.state.weekdata,
          journalCount: this.state.journalCount ? this.state.journalCount + 1 : 1

        },
      });
    this.saveData(true);
    // this.props.history.push(`/dashboard`);
  };
  renderYesnoContent = () => {
    if (this.state.showYesno && this.state.cQuestion) {
      var congratulationQuestion = this.state.cQuestion.toString()
      // console.log("Question", congratulationQuestion)
      return <Yesno data={{ congratulationQuestion: congratulationQuestion }} />;
    }
  };
  getRadioType = (value) => {
    // let showEverytime=true;
    // if(value?.target?.value) showEverytime = value?.target?.value
    // else showEverytime = value
    // const userId = getAuthId();
    // dbRef
    //   .ref(`users/${userId}/details`)
    //   .update({ showEverytime })
    //   .catch(error => this.onFail(error));
    this.setState({ showYesno: value.target.value === 'showEverytime' ? false : true });

  }
  render() {
    const { todaysFeeling, showYesno, jQuestion, jounrnalCheck } = this.state;
    const { route, history } = this.props;
    const headers = ["tellusabout", "saysomething", "congratulation"];
    return (
      <>
        {showYesno ? (
          this.renderYesnoContent()
        ) : (
          <BasePage showInfoIcon className="login-form home-screen">
            <div
              className="render-component"
              style={{
                padding: "0px",
                textAlign: "center",
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
                    <div className="advertise-text bold text-blue" style={{ marginTop: "35px", height: "62px" }}>
                      <p>{jQuestion}</p>
                    </div>
                  ) :
                    (
                      <div className="advertise-text bold text-blue" style={{ marginTop: "35px", height: "62px" }}>
                        <p>{jQuestion}</p>
                      </div>
                    )
                  }
                </div>
                <div className="target__body">
                  <textarea value={todaysFeeling} rows={6} cols={40} maxLength={150} placeholder="Tap here and start writing" onChange={this.handleChange} className="target__textarea about-textarea" />
                </div>
                <div className="circle-box-container">
                  <div className="circle-box">
                    {todaysFeeling.length >= 1 ? (
                      <div className="position-relative journal-container" onClick={() => this.setRoute()}>
                        <Circle showImg={true} imgStyle={{ width: "203px", marginTop: "1px" }} style={{ cursor: "pointer" }} img={processCompleted} />
                        <div>
                          <PageImage setCounter={() => this.handleYesno()} height="41.6px" width="52.8px" logo={rightTick} />
                        </div>
                      </div>
                    ) : (
                      <div className="checkbox journal-checkbox" style={{ marginTop: "1px" }} onChange={this.setRadioBtn.bind(this)}>
                        <div>
                          <input type="radio" value="donotShowEverytime" name="jounrnalCheck" checked={jounrnalCheck === "donotShowEverytime" ? true : false} />
                          <span className="index-advertise-text font-15"> Show less often</span>
                        </div>
                        <div>
                          <input type="radio" value="showEverytime" defaultChecked name="jounrnalCheck" checked={jounrnalCheck === "showEverytime" ? true : false} />
                          <span className="index-advertise-text font-15"> Show often</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="n-btn" onClick={() => this.handleYesno()} style={{ cursor: "pointer" }}>
                      Skip
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
