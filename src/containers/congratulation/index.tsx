import * as React from "react";
import { connectAdvanced } from "react-redux";
import { BasePage, PageImage } from "src/components";
import congratulation from "src/resources/icons/congratulation.png";
import { confetti_00, confetti_01, confetti_02, confetti_03, confetti_04, confetti_05, confetti_06, confetti_07, confetti_08 } from "src/resources/icons/congrats";
import { firebaseInit } from "src/services/firebase";
import rightArrow from "src/resources/icons/rightArrow.png";
import { Modal } from "src/components/Modal";
import pageHeader from "src/resources/icons/pageHeader2.png";
import "../Dashboards/Categories/index.scss";
import { Dashboard } from "src/containers/Dashboards/Categories";
import { getAuthId, getDbUrl } from "src/services/localStorage.service";
import moment from 'moment';

export interface ICongratulationProps {
  route?: any;
  history?: any;
  openModal?: any;
  navigate?: any;
}
export interface ICongratulationState {
  todaysFeeling?: string;
  counter?: number;
  happinessCounter?: string;
  happinessCounterLifetime?: string;
  timer?: object;
  route?: any;
  counterStart?: boolean;
  congratulationImg?: any;
  ShowDashboard?: boolean;
}
let timer = null;
export class Congratulation extends React.PureComponent<ICongratulationProps, ICongratulationState> {
  constructor(props: ICongratulationState) {
    super(props);
    this.state = {
      todaysFeeling: "",
      counter: 10,
      counterStart: false,
      happinessCounter: "",
      happinessCounterLifetime: "",
      congratulationImg: confetti_00,
      timer: null,
      ShowDashboard: false
    };
  }

  async componentDidMount() {
    let congImg = [confetti_00, confetti_01, confetti_02, confetti_03, confetti_04, confetti_05, confetti_06, confetti_07, confetti_08, confetti_00];
    this.setState({
      congratulationImg: congImg[Math.floor(Math.random() * 10)]
    });
    const userId = getAuthId();
    console.log("userId", userId)
    let dbRef = firebaseInit.database(getDbUrl());
    const year = moment().format('yyyy');
    const currentWeek: any = moment().format('w');
    const week: any = parseInt(currentWeek, 10) - 1;
    console.log("week", currentWeek);
    console.log("year", year)
    try {
      const counter = await dbRef.ref(`users/${userId}/brew/weeks_average/${currentWeek}_${year}/happinessCounter`).once('value');
      let happinessCounter = counter.val();
      this.setState({
        happinessCounter: happinessCounter
      });


      const lifetime = await dbRef.ref(`users/${userId}/info/happinessCounterLifetime`).once('value');
      let happinessCounterLifetime = lifetime.val();
      this.setState({
        happinessCounterLifetime: happinessCounterLifetime
      });

    } catch (e) {
      console.log(e);
    }
  }

  handleCongratulation = () => {

    this.setState({ ShowDashboard: true });
  };

  renderShowDashboardContent = () => {
    this.props.navigate();
    // if (this.state.ShowDashboard) {
    //   return <Dashboard />;
    // }
  };

  setCounter(startCounter) {
    console.log(startCounter);
    if (startCounter) {
      timer = setInterval(() => {
        if (this.state.counter > 0) {
          this.setState({
            counter: this.state.counter - 1,
            counterStart: true
          });
        } else {
          clearInterval(timer);
          this.setState({
            counterStart: false
          });
        }
      }, 1000);
    } else {
      clearInterval(timer);
      this.setState({
        counterStart: false
      });
    }
  }

  handleChange = e => {
    const value = e.target.value;
    if (this.state.todaysFeeling.length <= 150) {
      this.setState({
        todaysFeeling: value
      });
    }
  };
  render() {
    const { todaysFeeling, counter, congratulationImg, happinessCounter, happinessCounterLifetime, counterStart, ShowDashboard } = this.state;
    return (
      <>
        {ShowDashboard ? (
          this.renderShowDashboardContent()
        ) : (
          <BasePage showInfoIcon className="login-form home-screen">
            {/*  <div className="pageHeader">
              <img src={pageHeader} />
            </div>*/}
            <div
              className="render-component right-arrow-sec"
              style={{
                /* background: "#1f00a4",
                 color: "#fff",
                 padding: "40px",
                 textAlign: "center",
                 minHeight: "600px",
                 height: "auto",*/
                gap: "40px",
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                position: "relative"
              }}
            >
              <div className="base-font bold" style={{ marginBottom: "10px" }}>
                <p >Congrats for taking charge</p>
                <p>of your happiness!</p>
              </div>
              <div className="do-not-txt ">
                <div className="yes-no-week-txt">
                  <div> Week to date: <span className="font-size">{happinessCounter}</span></div>
                  <div>Lifetime:<span className="font-size"> {happinessCounterLifetime}</span></div>
                </div>
                <div>
                  <PageImage height="82px" width="82px" marginTop="54px" logo={rightArrow} setCounter={e => this.handleCongratulation()} />
                </div>
              </div>
              <div className="contrats-boom-img">
                <PageImage height="100%" width="100%" logo={congratulationImg} />
              </div>

              {/* <div
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
                <div className="advertise-text bold" style={{ fontSize: "16px", marginTop: "-18px", color: "ffffff", lineHeight: "13px" }}>
                  <p>Congrats for taking charge</p>
                  <p>of your happiness!</p>
                </div>
                <PageImage height="360px" width="360px" marginTop="-200px" marginLeft="-40px" logo={congratulationImg} />
                <div style={{ marginTop: "238px", lineHeight: "28px", fontSize: "18px" }}>
                  <div> Week to date: {happinessCounter}</div>
                  <div>Lifetime: {happinessCounterLifetime}</div>
                </div>
                <div>
                  <PageImage height="82px" width="82px" marginTop="-63px" marginLeft="96px" logo={rightArrow} setCounter={e => this.handleCongratulation()} />
                </div>
              </div> */}
            </div>

          </BasePage>
        )}
      </>
    );
  }
}
