import * as React from "react";

import { Route } from "react-router-dom";
import { BasePage, PageImage, Circle } from "src/components";
import processCompleted from "src/resources/icons/speakingcircle.png";
import rightTick from "src/resources/icons/rightTick.png";

import ExcellentTick from "src/resources/icons/ExcellentTick.png";

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
    if (this.state.todaysFeeling.length <= 150 ) {
      this.setState({
        todaysFeeling: value
      });
    } 
    

  };

  render() {
    const { todaysFeeling } = this.state;
    const { saveData, setIsTellusabout } = this.props;
    return (
      <BasePage showInfoIcon>
        <div className="text-container">
          {todaysFeeling.length <= 150 ? (
            <div>
              <div>
                <div className="advertise-text bold text-blue" style={{ marginTop: "35px", height: "62px" }}>
                  <p>Express freely for upto 10 sec</p>
                  <p className="do-not-txt">
                    Tap &nbsp;&nbsp;
                    <img height="17.9px" width="18px" style={{ marginTop: "-5px" }} src={ExcellentTick} />
                    &nbsp;&nbsp; to proceed
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-container">
              <div className="advertise-text bold text-blue" style={{ marginTop: "35px", height: "62px" }}>
                <p>Express freely for upto 10 sec</p>
                <p className="do-not-txt">
                  Tap &nbsp;&nbsp;
                  <img height="17.9px" width="18px" style={{ marginTop: "-5px" }} src={ExcellentTick} />
                  &nbsp;&nbsp; to proceed
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="target__body">
          <textarea value={todaysFeeling} rows={6} cols={40} maxLength={150} placeholder="Tap here and start writing" onChange={this.handleChange}  className="target__textarea about-textarea" />
        </div>
        <div className="circle-box-container">
          <div className="circle-box">
            {todaysFeeling.length >= 1 && (
              <div className="rel">
                <Circle showImg={true} imgStyle={{ width: "203px" }} style={{ cursor: "pointer" }} img={processCompleted} />
                <div  className="check-arrow">
                  <PageImage height="41.6px" width="52.8px" logo={rightTick} OnClick={e => saveData(todaysFeeling, false)} />
                </div>
              </div>
            )}
          </div>
          <div className="bottom-btn" onClick={setIsTellusabout}>
          <div className="n-btn"> cancel</div> 
          </div>
        </div>
      </BasePage>
    );
  }
}
