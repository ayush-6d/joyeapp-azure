import * as React from "react";

import { Route } from "react-router-dom";
import { BasePage, PageImage, Circle } from "src/components";
import processCompleted from "src/resources/icons/speakingcircle.png";
import rightTick from "src/resources/icons/rightTick.png";

export interface ITellUsAboutProps {
  route?: any;
  history?: any;
  openModal?: any;
  saveData?: any;
  setIsTellusabout?: any;
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

  render() {
    const { todaysFeeling } = this.state;
    const { saveData, setIsTellusabout } = this.props;
    return (
      <>
        <div className="text-container">
          {todaysFeeling.length <= 240 ? (
            <div className="base-font">
              <p>Express freely in a few sentences </p>
              <p className="do-not-txt">Do not hold back</p>
            </div>
          ) : (
            <div className="advertise-text bold" style={{ fontSize: "18px" }}>
              <p style={{ fontWeight: "bold", letterSpacing: "1.7px" }}>Excellent!</p>
              <p>
                Tap &nbsp;&nbsp;
                <img height="17.9px" width="18px" style={{ marginTop: "-5px" }} src={rightTick} />
                &nbsp;&nbsp; to proceed
              </p>
            </div>
          )}
        </div>
        <div className="target__body">
          <textarea value={todaysFeeling} rows={6} cols={40} placeholder="Tap here and start writing" style={{ borderRadius: "25px", fontSize: "16px" }} onChange={this.handleChange} className="target__textarea about-textarea" />
        </div>
        <div className="circle-box-container">
          <div className="circle-box">
            {todaysFeeling.length >= 15 && (
              <div className="rel">
                <Circle showImg={true} imgStyle={{ width: "203px" }} style={{ cursor: "pointer" }} img={processCompleted} />
                <div style={{ marginLeft: "115px" }} className="check-arrow">
                  <PageImage height="41.6px" width="52.8px" logo={rightTick} OnClick={e => saveData(todaysFeeling, false)} />
                </div>
              </div>
            )}
          </div>
          <span className="n-btn" onClick={setIsTellusabout}>
            Cancel
          </span>
        </div>
      </>
    );
  }
}
