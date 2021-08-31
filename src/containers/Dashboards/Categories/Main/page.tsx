import * as React from "react";
import Note from "./note";
import Actions from "./actions";
import Controls from "./controls";
import SpeakAgain from "./speakAgain";
import { TellUsAbout } from "../Tellusabout";
import { ImportLoader, BasePage } from "src/components";
import speechService from "./speechService";
import { isMobile } from "react-device-detect";
import { Modal } from "src/components/Modal";
import "src/resources/css/fonts/fonts.css";

const modalData = {
    title: "Take Charge!",
    header: "A random uote from database",
    content: "Please contact below services"
}
export interface IPage {
    route?: any,
    openModal?: any,
    history: any
}
export interface IPageState {
    pageState: string,//init, bottom-mic, recording, loading, sos, tell-us-about
    recordingState: string, //init, in-progress, confirm
    isMic: boolean,
    isModalOpen: boolean,
}
export default class Page extends React.PureComponent<IPage, IPageState> {
    base64: any;
    stopTimer: any;
    process: any;
    prediction: any;

    constructor(props: IPage) {
        super(props);
        this.prediction = null;
        this.state = { pageState: 'record', recordingState: 'init', isMic: true, isModalOpen: false };
        this.onCenterCircleClick = this.onCenterCircleClick.bind(this);
        this.onRightCircleClick = this.onRightCircleClick.bind(this);
        this.onTellUsAboutClick = this.onTellUsAboutClick.bind(this);
        this.onTellUsAboutCancelClick = this.onTellUsAboutCancelClick.bind(this);
        this.onSpeakAgain = this.onSpeakAgain.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    async onCenterCircleClick() {
        if (!this.state.isMic) this.props.history.push("/dashboard");
        else this.recordAudio();
    }

    async onRightCircleClick() {
        if (!this.state.isMic) this.setState({ recordingState: 'init', pageState: 'record', isMic: true }, this.recordAudio);
        else this.props.history.push("/dashboard");
    }

    onTellUsAboutClick() { this.setState({ pageState: "tell-us-about" }); }
    onTellUsAboutCancelClick() {
        this.setState({ pageState: "record" }, () => this.setState({ pageState: "record" }));
    }

    async onSpeakAgain() {
        if (!isMobile) {
            clearTimeout(this.stopTimer);
            speechService.stopRecordingAudioFromWeb();
        }
        this.setState({ recordingState: 'init', pageState: 'record' }, this.recordAudio);
    }

    async onCancel() {
        if (!isMobile) {
            clearTimeout(this.stopTimer);
            speechService.stopRecordingAudioFromWeb();
        }
        this.setState({ recordingState: 'init', pageState: 'record' });
    }

    processPrediction() {
        if (this.prediction.data.success) this.props.history.push("/pre-pie-chart");
        else if (this.prediction.data.gibberish) {
            this.setState({ isMic: false, recordingState: 'init', pageState: 'record' });
        } else if (this.prediction.data.caution) {
            this.setState({ isMic: true, recordingState: 'init', pageState: 'record', isModalOpen: true });
        }
    }

    async recordAudio() {
        if (isMobile) {
            if (this.state.recordingState === "init") {
                this.prediction = null;
                this.process = false;
                this.setState({ recordingState: 'in-progress' });
                this.base64 = await speechService.recordAudioFromTeams();
                this.setState({ recordingState: "confirm" });
                this.base64 = await speechService.mp4ToMP3(this.base64);
                let text = await speechService.translateSpeechToText(this.base64);
                this.prediction = await speechService.prediction(text);
                if (this.process) this.processPrediction();
            } else if (this.state.recordingState === "confirm") {
                if (this.prediction === null) this.process = true;
                else this.processPrediction();
                this.setState({ recordingState: "loading" });
                setTimeout(() => this.setState({ pageState: 'loading' }), 4000);
            }
        } else {
            if (this.state.recordingState === "init") {
                this.setState({ recordingState: 'in-progress' });
                speechService.recordAudioFromWeb();
                this.stopTimer = setTimeout(() => this.recordAudio(), 60000);
            }
            if (this.state.recordingState === "in-progress") {
                clearTimeout(this.stopTimer);
                this.setState({ pageState: 'loading' });
                this.base64 = await speechService.stopRecordingAudioFromWeb();
                this.processAudio();
            }
        }
    }

    async processAudio(data = null) {
        let text = data;
        if (data === null) {
            if (isMobile) this.base64 = await speechService.mp4ToMP3(this.base64);
            text = await speechService.translateSpeechToText(this.base64);
        }
        this.setState({ pageState: 'loading' });
        var output = await speechService.prediction(text);
        console.log(output);
        console.log(output.data);
        if (output.data.success) this.props.history.push("/pre-pie-chart");
        else if (output.data.gibberish) {
            this.setState({ isMic: false, recordingState: 'init', pageState: 'record' });
        } else if (output.data.caution) {
            this.setState({ isMic: true, recordingState: 'init', pageState: 'record', isModalOpen: true });
        }
    }

    render() {
        return (<>
            {(this.state.pageState === 'loading') ? <ImportLoader /> : null}
            {(this.state.pageState === 'record') ? <BasePage withMenu={true} showShield={this.state.pageState === 'record'} showInfoIcon={this.state.pageState === 'record'}>
                <div style={{ userSelect: "none" }}>
                    <Note isMic={this.state.isMic} recordingState={this.state.recordingState}></Note>
                    <Controls isMic={this.state.isMic} recordingState={this.state.recordingState} onClick={this.onCenterCircleClick} ></Controls>
                    <SpeakAgain isMic={this.state.isMic} recordingState={this.state.recordingState} onSpeakAgain={this.onSpeakAgain} onCancel={this.onCancel} />
                    <Actions isMic={this.state.isMic} recordingState={this.state.recordingState} onLeftCircleClick={this.onTellUsAboutClick} onRightCircleClick={this.onRightCircleClick}></Actions>
                </div>
            </BasePage> : null}
            {(this.state.pageState === 'tell-us-about') ? <TellUsAbout saveData={(x) => this.processAudio(x)} setIsTellusabout={this.onTellUsAboutClick} onCancel={this.onTellUsAboutCancelClick} /> : null}
            {this.state.isModalOpen ? (<Modal openModal={this.state.isModalOpen} modalData={modalData} HelpLineServices={["SOS", "HelpLine", "Cancel"]}></Modal>) : null}
        </>)
    }
}
