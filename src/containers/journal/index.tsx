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

export interface IJournalProps extends RouteComponentProps{
  route?: any;
  history: any;
  openModal?: any;
  data?:any;
}

export interface IJournalState {
  todaysFeeling?: string;
  jounrnalCheck?: string;
  isSkip?: boolean;
  showJoyelevel?: boolean;
  showYesno?: boolean;
  jQuestion?: string;
  cQuestion?: string,
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
    };
  }

  async componentDidMount() {
    this.getJournalLogic();
  }
  
  getJournalLogic = async () => {
    let todaysDate = moment(new Date()).format("DD-MM-YYYY");

    var dayCount = new Date().getDay();

    const userId = getAuthId();

    const query = await dbRef.ref(`users/${userId}/brew/brewData/${todaysDate}/journalText`);
    let snapshot = await query.once("value");
    
    // snapshot.forEach(function (data) {
    //   // key will be "ada" the first time and "alan" the second time
    //   var key = data.key;
    //   const dataVal = data.val();
    //   isSkipSaved = dataVal.isSkip;
    //   // childData will be the actual contents of the child
    //   jounrnalCheckSaved = dataVal.jounrnalCheck;
    //   todaysFeeling=dataVal.todaysFeeling
    // });

    isSkipSaved = snapshot.val().isSkip
    jounrnalCheckSaved = snapshot.val().jounrnalCheck
    todaysFeeling = snapshot.val().fellingBetter

    const userRefJoyelevel = await dbRef.ref(`users/${userId}/brew/brewData/${todaysDate}/currentAverage`);

    userRefJoyelevel.on("value", snapshot => {
      snapshot.forEach(data => {
        const dataVal = data.val();
        joyelevelscore = dataVal;
      });
    });

    const userRefOnceAday = await dbRef.ref(`users/${userId}/brew/brewData/${todaysDate}/OnceAday`);

    userRefOnceAday.on("value", snapshot => {
      snapshot.forEach(data => {
        const dataVal = data.val();
        isOnceDay = dataVal;
      });
    });

    let jQuestion = await dbRef.ref(`users/${userId}/brew/brewData/${todaysDate}/journalQuestion`).once('value');
    jQuestion = await jQuestion.val();
    var journalQuestion = jQuestion?.toString();
    this.setState({ jQuestion: journalQuestion });

    let cQuestion = await dbRef.ref(`users/${userId}/brew/brewData/${todaysDate}/congratulationQuestion`).once('value');
    cQuestion = await cQuestion.val();
    var congratulationQuestion = cQuestion?.toString();
    this.setState({ cQuestion: congratulationQuestion });
    
    if(!todaysFeeling){
      if (joyelevelscore > 6 || joyelevelscore < 5) {
        if (jounrnalCheckSaved === "donotShowEverytime" && dayCount > 0 && dayCount <= 3 && !isOnceDay) {
          this.setState({ showJoyelevel: true });
          let OnceDay = { isOnceDay: true };

          dbRef
            .ref(`users/${userId}/brew/brewData/${todaysDate}/OnceAday`)
            .update({ OnceDay })
            .catch(error => this.onFail(error));
        } else {
          if (jounrnalCheckSaved === "showEverytime" || jounrnalCheckSaved === undefined) {
            this.setState({ showJoyelevel: true });
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
    this.saveData(true);
    // this.props.history.push(`/dashboard`);
  };
  renderYesnoContent = () => {
    if (this.state.showYesno && this.state.cQuestion) {
      var congratulationQuestion = this.state.cQuestion.toString()
      // console.log("Question", congratulationQuestion)
      return <Yesno data={{congratulationQuestion : congratulationQuestion}}/>;
    }
  };
  getRadioType=(value)=>{
    // let showEverytime=true;
    // if(value?.target?.value) showEverytime = value?.target?.value
    // else showEverytime = value
    // const userId = getAuthId();
    // dbRef
    //   .ref(`users/${userId}/details`)
    //   .update({ showEverytime })
    //   .catch(error => this.onFail(error));
      this.setState({ showYesno: value.target.value==='showEverytime'?false:true });
    
  }
  render() {
    const { todaysFeeling, showYesno, jQuestion } = this.state;
    const { route, history } = this.props;
    const headers = ["tellusabout", "saysomething", "congratulation"];
    return (
      <>
        {showYesno ? (
          this.renderYesnoContent()
        ) : (
          <BasePage  showInfoIcon className="login-form home-screen">
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
                    <div  className="advertise-text bold text-blue" style={{  marginTop: "35px",height:"62px" }}>
                      <p>{jQuestion}</p>
                    </div>
                  ) : 
                  (
                    <div  className="advertise-text bold text-blue" style={{  marginTop: "35px",height:"62px" }}>
                      <p>{jQuestion}</p>
                    </div>
                  )
                  }
                </div>
                <div className="target__body">
                  <textarea value={todaysFeeling} rows={6} cols={40} maxLength={150} placeholder="Tap here and start writing"  onChange={this.handleChange} className="target__textarea about-textarea" />
                </div>
                <div className="circle-box-container">
                <div className="circle-box">
                  {todaysFeeling.length >= 1 ? (
                    <div className="position-relative journal-container" onClick={()=>this.setRoute()}>
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
                        <input type="radio" value="showEverytime" defaultChecked name="jounrnalCheck"/>
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
