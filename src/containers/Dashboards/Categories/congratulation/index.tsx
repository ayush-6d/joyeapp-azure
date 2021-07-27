import * as React from "react";
import { PageImage } from "src/components";
import { confetti_00, confetti_01, confetti_02, confetti_03, confetti_04, confetti_05, confetti_06, confetti_07, confetti_08 } from "src/resources/icons/congrats";
import { firebaseInit } from "src/services/firebase";
import rightArrow from "src/resources/icons/rightArrow.png";

export interface ICongratulationProps {
  route?: any;
  openModal?: any;
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
      timer: null
    };
  }
  async componentDidMount() {
    let congImg = [confetti_00, confetti_01, confetti_02, confetti_03, confetti_04, confetti_05, confetti_06, confetti_07, confetti_08, confetti_00];
    this.setState({
      congratulationImg: congImg[Math.floor(Math.random() * 10)]
    });
    try {
      const happinessCounter = await firebaseInit.database().ref(`users/-MHUPaNmo_p85_DR3ABC||596ef7d8-f109-4c4e-9c91-81896baa9da5||b172c03f-be43-42e9-b17a-34fe50574266/brew/weeks_average/24_2021/happinessCounter`).once("value");
      const happinessCounterLifetime = await firebaseInit.database().ref(`users/-MHUPaNmo_p85_DR3ABC||596ef7d8-f109-4c4e-9c91-81896baa9da5||b172c03f-be43-42e9-b17a-34fe50574266/info/happinessCounterLifetime`).once("value");
      if (happinessCounter && happinessCounter["node_"]["value_"]) {
        this.setState({
          happinessCounter: happinessCounter["node_"]["value_"]
        });
      }
      if (happinessCounterLifetime && happinessCounterLifetime["node_"]["value"]) {
        this.setState({
          happinessCounterLifetime: happinessCounterLifetime["node_"]["value_"]
        });
      }
    } catch (e) {
      console.log(e);
    }
  }
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
    const { todaysFeeling, counter, congratulationImg, happinessCounter, happinessCounterLifetime, counterStart } = this.state;
    return (
      <>
        <div className="text-container">
          <div className="advertise-text bold" style={{ fontSize: "18px" }}></div>
        </div>
        <PageImage height="282px" width="282px" logo={congratulationImg} />
        <div>
          <div>Week to date: {happinessCounter}</div>
          <div>Lifetime: {happinessCounterLifetime}</div>
        </div>
        <div>
          <PageImage height="82px" width="82px" marginTop="72px" logo={rightArrow} setCounter={this.props.openModal} />
        </div>
      </>
    );
  }
}
