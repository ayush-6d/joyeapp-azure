import * as React from "react";
import { BasePage, Circle, PageImage } from "src/components";
//import pageHeader from "src/resources/icons/pageHeader2.png";
import processCompleted from "src/resources/icons/speakingcircle.png";
import rightTick from "src/resources/icons/rightTick.png";

import "../Dashboards/Categories/Main/index.scss";
import { firebaseInit } from "src/services/firebase";
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
  weekdata: object,
}

let jounrnalCheckSaved = "";
let todaysFeeling = "";
let joyelevelscore = 0;
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
      weekdata: {},
    };
  }

  async componentDidMount() {
    this.getJournalLogic();
  }
  setRadioBtn(event) {
    this.setState({ jounrnalCheck: event.target.value });
  }

  getJournalLogic = async () => {
    let todaysDate = moment(new Date()).format("DD-MM-YYYY");

    const userId = getAuthId();

    const query = await dbRef.ref(`users/${userId}/brew/brewData/${todaysDate}`);
    let snapshot: any = await query.once("value");
    snapshot = snapshot.val()
    console.log("snapshot", snapshot)

    jounrnalCheckSaved = snapshot.jounrnalCheck || "showEverytime";
    todaysFeeling = snapshot.todaysFeeling;
    joyelevelscore = snapshot.current_avarage;
    
    const currentWeek: any = moment().format('w');
    const year = moment().format('yyyy');
    const currentWeekData = await dbRef.ref(`users/${userId}/brew/weeks_average/${currentWeek}_${year}`);
    let data: any = await currentWeekData.once("value");
    data = data.val()
    console.log("data", data)
    this.setState({
      jQuestion: snapshot.journalQuestion,
      cQuestion: snapshot.congratulationQuestion,
      jounrnalCheck: jounrnalCheckSaved || "showEverytime",
      journalCount: data.journalCount || 0,
      weekdata: data
    });


    if (!todaysFeeling) {
      if (jounrnalCheckSaved === "donotShowEverytime") {
          if (joyelevelscore > 6 && joyelevelscore < 5 && this.state.journalCount <= 3) {
            this.setState({ showJoyelevel: true });
            console.log("donotShowEverytime")
          } else {
            this.handleYesno();
            console.log('not showing because joyelevelscore is', joyelevelscore, ' and journalcount is: ', this.state.journalCount)
            console.log("journalCount", this.state.journalCount)
          }
        } else {
          if (jounrnalCheckSaved === "showEverytime" || jounrnalCheckSaved === undefined || jounrnalCheckSaved === "") {
            this.setState({ showJoyelevel: true });
            console.log("showEverytime")
          } else {
            this.handleYesno();
            console.log('not showing because showEverytime is', jounrnalCheckSaved);
          }
        }
    } else {
      this.handleYesno();
      console.log('not showing because todaysFeeling is', todaysFeeling)
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
    }
  };



  onFail(error) {
    console.log(error, "Jounrnal data not saved");
  }

  saveData = async isSkip => {
    let todaysDate = moment(new Date()).format("DD-MM-YYYY");
    const userId = getAuthId();
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
          ...this.state.weekdata,
          journalCount: this.state.journalCount > 0 ? this.state.journalCount + 1 : 1
        },
      });
    this.saveData(true);
  };
  renderYesnoContent = () => {
    if (this.state.showYesno && this.state.cQuestion) {
      var congratulationQuestion = this.state.cQuestion.toString()
      return <Yesno data={{ congratulationQuestion: congratulationQuestion }} />;
    }
  };
  getRadioType = (value) => {
    this.setState({ showYesno: value.target.value === 'showEverytime' ? false : true });
  }
  render() {
    const { todaysFeeling, showYesno, jQuestion, jounrnalCheck } = this.state; 
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
                          <input type="radio" value="showEverytime" name="jounrnalCheck" checked={jounrnalCheck === "showEverytime" ? true : false} />
                          <span className="index-advertise-text font-15"> Show often</span>
                        </div>
                      </div>
                    )}
                  </div>
                  {todaysFeeling.length < 1 && (
                    <div className="n-btn" onClick={() => this.handleYesno()} style={{ cursor: "pointer" }}>
                      Skip
                    </div>
                  )}
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
