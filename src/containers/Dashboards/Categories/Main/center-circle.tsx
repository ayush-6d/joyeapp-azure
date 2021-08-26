import * as React from "react";
import { CircularCounter, Circle, ImportLoader, PageImage, BasePage } from "src/components";
import speakingcircle from "../../../../resources/icons/speakingcircle.png";
import rightTick from "../../../../resources/icons/rightTick.png";

export interface ICenterCircle {
    recordingState: string,//init,in-progress
    onClick: any,
    isClickHandle: boolean,
    seconds: number,
    isCounterStarted: boolean,
    isCounterEnd: boolean,
    icons: string,
    showCounter: boolean
}
export interface ICenterCircleState { }

export default class CenterCircle extends React.PureComponent<ICenterCircle, ICenterCircleState> {
    constructor(props: ICenterCircle) {
        super(props);
        this.state = {};
    }

    onStartRecodring(show: boolean, value: boolean) {

    }

    HardStop() {

    }

    render() {
        return (<>
            <div className="rel home-screen-box">
                <Circle className={`${this.props.recordingState === 'in-progress' ? "circles ripple" : ""}`} showImg={true} imgStyle={{ width: "222.8px", height: "222.8px" }} style={{ cursor: "pointer" }} img={speakingcircle} />
                {this.props.seconds >= 8 && this.props.isClickHandle ? <PageImage height="72px" width="auto" style={{ cursor: "pointer" }} isFromMain={true} logo={this.props.icons} OnClick={e => this.onStartRecodring(!this.props.showCounter, false)} /> : this.props.seconds <= 9 ? <PageImage height="41.6px" width="52.8px" style={{ cursor: "pointer" }} isFromMain={true} logo={rightTick} OnClick={this.HardStop} /> : <PageImage height="41.6px" width="52.8px" isFromMain={true} logo={"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs%3D"} />}
                {this.props.isCounterStarted || this.props.isCounterEnd ? <CircularCounter /> : ""}
            </div>
        </>);
    }
}