import * as React from "react";
import { Circle } from "src/components";
import Gibberish from "../../../../resources/icons/gibberish.png";
import Gesture from "../../../../resources/icons/gesture.png";
import Mic from "../../../../resources/icons/mic.png";
export interface IActions {
    isMic: boolean,
    recordingState: string, //init,in-progress
    onLeftCircleClick: any,
    onRightCircleClick: any
}
export interface IActionsState { }

export default class Actions extends React.PureComponent<IActions, IActionsState> {
    constructor(props: IActions) {
        super(props);
        this.state = {};
    }

    render() {
        return (<>{(this.props.recordingState === 'init') ?
            <div className="bottom-container" style={{ height: "201px" }}>
                <div className="width300" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div onClick={this.props.onLeftCircleClick}>
                        <Circle className={`circles box-shadow-small circlesmalls`} style={{ cursor: "pointer" }} imgStyle={{ width: "47px" }} showImg={true} img={Gibberish} />
                        <div className="advertise-text bold index-advertise-text font-15">
                            It is good
                            <br />
                            to write
                        </div>
                    </div>
                    <div onClick={this.props.onRightCircleClick}>
                        <Circle className={`circles box-shadow-small circlesmalls`} style={{ cursor: "pointer" }} imgStyle={{ width: "25px" }} showImg={true} img={this.props.isMic ? Gesture : Mic} />
                        {this.props.isMic ? <div className="advertise-text bold index-advertise-text  font-15">A little deeper<br /> reflection</div> : null}
                        {!this.props.isMic ? <div className="advertise-text bold index-advertise-text  font-15">Speak your<br />mind</div> : null}
                    </div>
                </div>
            </div> : null}
        </>);
    }
}