import * as React from "react";
import { Circle } from "src/components";
import "./index.scss";
import ExcellentTick from "../../../../resources/icons/ExcellentTick.png";
import { isMobile } from "react-device-detect";

export interface INote {
    recordingState: string; //init,in-progress
    isGibberish: boolean;
}
export interface INoteState { }

export default class Note extends React.PureComponent<INote, INoteState> {
    constructor(props: INote) {
        super(props);
    }

    title() {
        switch (this.props.recordingState) {
            case "init":
                if (this.props.isGibberish) return <p>Try a deeper reflection</p>;
                else return <p>What’s your joy level today?</p>;
            case "in-progress":
            case "confirm":
            case "loading":
                return <p>Express freely for a few seconds</p>;
        }
    }

    subtitle() {
        if (isMobile) {
            if (this.props.recordingState === "in-progress")
                return <p className="do-not-txt">Tap 'Stop' to proceed</p>
            else if (this.props.recordingState === "confirm") {
                return <p className="do-not-txt">Tap &nbsp; &nbsp;<img height="17.9px" width="18px" src={ExcellentTick} />&nbsp; &nbsp;to proceed</p>;
            }
        } else {
            if (this.props.recordingState === "in-progress")
                return <p className="do-not-txt">Tap &nbsp; &nbsp;<img height="17.9px" width="18px" src={ExcellentTick} />&nbsp; &nbsp;to proceed</p>;
        }
        return <p className="do-not-txt"></p>;
    }

    render() {
        return (
            <>
                {(this.props.recordingState === 'init') ? <div className="pageHeader"><Circle className="circles score-point" showImg={false} /></div> : null}
                <div className="text-container">
                    <div className="advertise-text bold text-blue">
                        {this.title()}
                        {this.subtitle()}
                    </div>
                </div>
            </>
        );
    }
}