import * as React from "react";
import "./index.scss";
import recycle from "../../../../resources/icons/recycle.png";
import { isMobile } from "react-device-detect";
export interface IControls {
    isMic: boolean,
    recordingState: string, //init,in-progress,'completed',
    onSpeakAgain: any,
    onCancel: any,
}
export interface IControlsState { }

export default class SpeakAgain extends React.PureComponent<IControls, IControlsState> {
    constructor(props: IControls) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>{(this.props.recordingState === 'in-progress' && !isMobile) || this.props.recordingState === 'confirm' ?
                <div className="bottom-container" style={{ height: "201px" }}>
                    <div onClick={this.props.onSpeakAgain}>
                        <img width="30px" height="30px" src={recycle} alt="" style={{ cursor: "pointer", marginTop: "-30px" }} />
                        <p className="index-advertise-text" style={{ cursor: "pointer", marginTop: "-3px", marginLeft: "5px" }}>
                            Speak again
                        </p>
                    </div>
                    <div className="" onClick={this.props.onCancel} style={{ cursor: "pointer", marginTop: "35px" }}>
                        <div className="n-btn"> cancel</div>
                    </div>
                </div> : null}
            </>
        );
    }
}
