import * as React from "react";
import { Circle } from "src/components";
import "./index.scss";
import "./controls.scss";
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
    render() {
        return (
            <>
                <div className={(this.props.recordingState === 'init') ? 'pageHeader' : 'hide'}><Circle className="circles score-point" showImg={false} /></div>
                <div className="text-container">
                    <div className="advertise-text bold text-blue">
                        {(this.props.recordingState === 'init' && this.props.isMic) ? <p>How are you feeling today?</p> : null}
                        {(this.props.recordingState === 'init' && !this.props.isMic) ? <p>Try a deeper reflection?</p> : null}
                        {(this.props.recordingState === 'in-progress') ? <p>Express freely for upto 10 sec</p> : null}
                        <p className={this.props.recordingState !== 'in-progress' ? 'hide' : 'do-not-txt'}>
                            {(this.props.recordingState === 'in-progress' && !isMobile) ? <span>Tap &nbsp;&nbsp;<img height="17.9px" width="18px" src={ExcellentTick} />&nbsp;&nbsp; to proceed</span> : ' &nbsp; '}
                            {(this.props.recordingState === 'in-progress' && isMobile) ? <span>Tap STOP to proceed</span> : ' &nbsp; '}
                        </p>
                    </div>
                </div>
            </>
        );
    }
}