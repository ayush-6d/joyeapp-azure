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
import InfoIcon from "../../resources/icons/infoIcon.png";
import Popup from '../../components/Popup';

export interface ICongratulationProps {
  route?: any;
  history?: any;
  openModal?: any;
  navigate?: any;
}
export interface ICongratulationState {
  todaysFeeling?: string;
  counter?: number;
  happinessCounter?: any;
  happinessCounterLifetime?: any;
  timer?: object;
  route?: any;
  counterStart?: boolean;
  congratulationImg?: any;
  ShowDashboard?: boolean;
  popup: boolean;
  screenMessage: string[];
}
let timer = null;
export class Congratulation extends React.PureComponent<ICongratulationProps, ICongratulationState> {
  constructor(props: ICongratulationState) {
    super(props);
    this.state = {
      todaysFeeling: "",
      counter: 10,
      counterStart: false,
      happinessCounter: {},
      happinessCounterLifetime: {},
      congratulationImg: confetti_00,
      timer: null,
      ShowDashboard: false,
      popup: false,
      screenMessage: [""],
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

  togglePopupOpen() {
    const screenMessage = ["It is finally you who has to manage your own wellbeing. Congratulate and reward yourself for every step in managing your mental fitness, however small it may seem."];
    this.setState({ popup: !this.state.popup, screenMessage });
  }

  togglePopupClose() {
    const screenMessage = [""];
    this.setState({ popup: !this.state.popup, screenMessage })
  }
  render() {
    const { todaysFeeling, counter, congratulationImg, happinessCounter, happinessCounterLifetime, counterStart, ShowDashboard } = this.state;
    return (
      <>
        {ShowDashboard ? (
          this.renderShowDashboardContent()
        ) : (
          <BasePage className="login-form home-screen">
            <div style={{ position: "absolute", right: 10, top: 10, zIndex: 105 }}>
              <PageImage height="22px" width="22px" style={{ cursor: "pointer", position: "absolute", top: 5, backgroundColor: "red" }} isFromMain={true} logo={InfoIcon} OnClick={e => this.togglePopupOpen()} />
            </div>
            {this.state.popup && (
              <Popup
                screenMessage={this.state.screenMessage}
                closePopup={this.togglePopupClose.bind(this)}
              />
            )}
            <div
              className="render-component right-arrow-sec"
              style={{
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
                  <div> Week to date: <span className="font-size">{happinessCounter.yesCount}</span></div>
                  <div>Lifetime:<span className="font-size"> {happinessCounterLifetime.yesCount}</span></div>
                </div>
                <div>
                  <PageImage height="82px" width="82px" marginTop="54px" logo={rightArrow} setCounter={e => this.handleCongratulation()} />
                </div>
              </div>
              <div className="contrats-boom-img">
                <PageImage height="100%" width="100%" logo={congratulationImg} />
              </div>
            </div>

          </BasePage>
        )}
      </>
    );
  }
}
