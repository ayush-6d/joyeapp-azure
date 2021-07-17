import * as React from "react";
import { Route } from "react-router-dom";
import { BasePage, PageImage, Circle } from "src/components";
import processCompleted from "src/resources/icons/speakingcircle.png";
import rightTick from "src/resources/icons/rightTick.png";

export interface ITellUsAboutProps {
  route?: any;
  history?: any;
  openModal?: any;
}
export interface ITellUsAboutState {
  todaysFeeling?: string;
}

export class TellUsAbout extends React.PureComponent<ITellUsAboutProps, ITellUsAboutState> {
  constructor(props: ITellUsAboutProps) {
    super(props);
    this.state = {
      todaysFeeling: ""
    };
  }
  handleChange = e => {
    const value = e.target.value;
    if (this.state.todaysFeeling.length <= 240) {
      this.setState({
        todaysFeeling: value
      });
    }
  };

  setRoute = () => {
    console.log(this.props);
    this.props.route(`main`);
  };
  render() {
    const { todaysFeeling } = this.state;
    return (
      <>
        <div className="text-container">
          {todaysFeeling.length <= 240 ? (
            <div className="advertise-text bold" style={{ fontSize: "16px", marginTop: "-44px", color: "ffffff", lineHeight: "13px" }}>
              <p>Express freely in a few sentences </p>
              <p>Do not hold back</p>
            </div>
          ) : (
            <div className="advertise-text bold" style={{ fontSize: "18px", marginTop: "-44px" }}>
              <p style={{ fontWeight: "bold", letterSpacing: "1.7px" }}>Excellent!</p>
              <p>
                Tap &nbsp;&nbsp;
                <img height="17.9px" width="18px" style={{ marginTop: "-5px" }} src={rightTick} />
                &nbsp;&nbsp; to proceed
              </p>
            </div>
          )}
        </div>
        <div className="target__body" style={{ marginBottom: "90px", marginTop: "-142px" }}>
          <textarea value={todaysFeeling} rows={9} cols={40} placeholder="Tap here and start writing" style={{ borderRadius: "25px", width: "300px", marginLeft: "-10px", fontSize: "16px" }} onChange={this.handleChange} className="target__textarea" />
        </div>
        <div>
          {todaysFeeling.length >= 15 && (
            <div style={{ marginLeft: "-4px" }}>
              <Circle showImg={true} imgStyle={{ width: "203px", marginTop: "-186px" }} style={{ cursor: "pointer" }} img={processCompleted} />
              <div style={{ marginLeft: "115px" }}>
                <PageImage setCounter={() => this.props.route("analysis")} height="41.6px" width="52.8px" marginTop="71px" style={{ top: "623px" }} logo={rightTick} />
              </div>
            </div>
          )}
          <span onClick={this.setRoute}>Cancel</span>
        </div>
      </>
    );
  }
}
