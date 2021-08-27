import * as React from "react";
import { Circle } from "src/components";
import "./index.scss";
import ExcellentTick from "../../../../resources/icons/ExcellentTick.png";
import { isMobile } from "react-device-detect";

export interface INote {
    recordingState: string; //init,in-progress
    isMic: boolean;
}
export interface INoteState { }

export default class Note extends React.PureComponent<INote, INoteState> {
    constructor(props: INote) {
        super(props);
    }

    title() {
        switch (this.props.recordingState) {
            case "init":
                if (this.props.isMic) return <p>How are you feeling today?</p>;
                else return <p>Try a deeper reflection</p>;
            case "in-progress":
            case "confirm":
                return <p>Express freely for a few seconds</p>;
        }
    }

    subtitle() {
        if (isMobile) {
            if (this.props.recordingState === "in-progress")
                return <span>Tap 'Stop' to proceed</span>
            else if (this.props.recordingState === "confirm") {
                return <p>Tap &nbsp; &nbsp;<img height="17.9px" width="18px" src={ExcellentTick} />&nbsp; &nbsp;to proceed</p>;
            }
        } else {
            if (this.props.recordingState === "in-progress")
                return <p>Tap &nbsp; &nbsp;<img height="17.9px" width="18px" src={ExcellentTick} />&nbsp; &nbsp;to proceed</p>;
        }
        return <p></p>;
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