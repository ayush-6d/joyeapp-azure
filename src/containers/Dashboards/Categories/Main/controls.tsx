import * as React from "react";
import "./index.scss";
import rightTick from "../../../../resources/icons/rightTick.png";
import speakingcircle from "../../../../resources/icons/speakingcircle.png";
import Mic from "../../../../resources/icons/mic.png";
import Gesture from "../../../../resources/icons/gesture.png";
import recycle from "../../../../resources/icons/recycle.png";
import { isMobile } from "react-device-detect";
export interface IControls {
    isMic: boolean,
    recordingState: string, //init,in-progress,'completed',
    onClick: any,
}
export interface IControlsState { }

export default class Controls extends React.PureComponent<IControls, IControlsState> {
    constructor(props: IControls) {
        super(props);
        this.state = {};
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recordingState === this.props.recordingState) return;
        if (nextProps.recordingState === 'init') {
            (document.getElementById("circlesSvg") as any).pauseAnimations();
            (document.getElementById("circlesSvg") as any).setCurrentTime(0);
        }
        if (nextProps.recordingState === 'in-progress') {
            (document.getElementById("circlesSvg") as any).pauseAnimations();
            (document.getElementById("circlesSvg") as any).setCurrentTime(0);
            (document.getElementById("circlesSvg") as any).unpauseAnimations();
            (document.getElementById("animate01") as any).beginElement();
        }
        if (nextProps.recordingState === 'confirm') (document.getElementById("animate02") as any).beginElement();
    }

    icon() {
        if (this.props.recordingState === 'init') return this.props.isMic ? Mic : Gesture;
        if (this.props.recordingState === 'in-progress') return isMobile ? null : rightTick;
        if (this.props.recordingState === 'confirm') return rightTick;
    }

    render() {
        return (
            <>
                <div className="center-button" onClick={() => isMobile && this.props.recordingState === 'in-progress' ? null : this.props.onClick()}>
                    <div><img src={speakingcircle} style={{ borderRadius: "150px", width: "250px", height: "250px" }} width="250" /></div>
                    <div>
                        <svg id="circlesSvg" height="200" width="200" viewBox="0 0 20 20" fill="green">
                            <circle id="pie" r="2.5" cx="10" cy="10" fill="none" stroke="white" strokeWidth="10" strokeDasharray="0 31.4" transform="rotate(-90) translate(-20)" />
                            <animate id="animate01" xlinkHref="#pie" attributeName="stroke-dasharray" repeatCount="1" fill="freeze" values="0 31.4;31.4 31.4" dur="120s" begin="infinite" />
                            <animate id="animate02" xlinkHref="#pie" attributeName="stroke-dasharray" repeatCount="1" fill="freeze" values="0 31.4;31.4 31.4" dur="1s" begin="infinite" />
                            <circle r="6" cx="10" cy="10" fill="#1e00a3" />
                        </svg>
                    </div>
                    <div><img src={this.icon()} /></div>
                </div>
            </>
        );
    }
}
