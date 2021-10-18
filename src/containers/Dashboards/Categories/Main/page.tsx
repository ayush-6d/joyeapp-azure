import * as React from "react";
import Note from "./note";
import Actions from "./actions";
import Controls from "./controls";
import SpeakAgain from "./speakAgain";
import { TellUsAbout } from "../Tellusabout";
import { Loader, BasePage } from "src/components";
import speechService from "./speechService";
import { isMobile } from "react-device-detect";
import { Modal } from "src/components/Modal";
import "src/resources/css/fonts/fonts.css";

const modalData = {
    title: "Caution",
    header: "We sense that there could be emergency, Please ask for help!",
    content: "Contact your family, your manager, or other organisation and social help-lines."
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
    isGibberish: boolean,
    isModalOpen: boolean,
}
export default class Page extends React.PureComponent<IPage, IPageState> {
    base64: any;
    stopTimer: any;
    process: any;
    prediction: any;
    processId: number;

    constructor(props: IPage) {
        super(props);
        this.prediction = null;
        this.processId = Math.floor(Math.random() * 1000000);
        this.state = { pageState: 'record', recordingState: 'init', isMic: false, isModalOpen: false, isGibberish: false };
        this.onCenterCircleClick = this.onCenterCircleClick.bind(this);
        this.onRightCircleClick = this.onRightCircleClick.bind(this);
        this.onTellUsAboutClick = this.onTellUsAboutClick.bind(this);
        this.onTellUsAboutCancelClick = this.onTellUsAboutCancelClick.bind(this);
        this.onSpeakAgain = this.onSpeakAgain.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    async onCenterCircleClick() {
        this.setState({ isGibberish: false });
        if (this.state.recordingState === "init" && this.state.pageState === 'record')
            this.props.history.push("/dashboard");
        else
            this.recordAudio();
        // if (!this.state.isMic) this.props.history.push("/dashboard");
        // else this.recordAudio();

    }

    async onRightCircleClick() {
        this.setState({ isGibberish: false });
        if (!this.state.isMic) this.setState({ recordingState: 'init', pageState: 'record', isMic: false }, this.recordAudio);
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
        // console.log('processPrediction');
        if (this.prediction.data.success) this.props.history.push("/pie-chart");
        else if (this.prediction.data.gibberish) {
            this.setState({ isMic: false, recordingState: 'init', pageState: 'record', isGibberish: true });
        } else if (this.prediction.data.caution) {
            this.setState({ isMic: false, recordingState: 'init', pageState: 'record', isModalOpen: true });
        }
    }

    async recordAudio() {
        if (isMobile) {
            if (this.state.recordingState === "init") {
                this.processId = Math.floor(Math.random() * 1000000);
                this.prediction = null;
                this.process = false;
                this.setState({ recordingState: 'in-progress' });
                // console.log(`${this.processId}: recordAudioFromTeams`);
                let result: any;
                try { result = await speechService.recordAudioFromTeams(this.processId); }
                catch (e) { if (!(JSON.stringify(e).includes("1000"))) return; this.setState({ recordingState: 'init' }, () => { alert(`Please allow microphone access to use this feature!`) }); return; }
                // console.log(`${this.processId}: recordAudioFromTeams ${result.pid}`);
                if (result.pid !== this.processId) return;
                this.base64 = result.data;
                this.setState({ recordingState: "confirm" });
                // console.log(`${this.processId}: mp4ToMP3`);
                let mp4ToMP3Result: any = await speechService.mp4ToMP3(this.processId, this.base64);
                // console.log(`${this.processId}: mp4ToMP3 ${mp4ToMP3Result.pid}`);
                if (mp4ToMP3Result.pid !== this.processId) return;
                // console.log(`${this.processId}: translateSpeechToTextEx`);
                let translateSpeechToTextResult: any;
                try {
                    translateSpeechToTextResult = await speechService.translateSpeechToTextEx(this.processId, mp4ToMP3Result.data);
                } catch (e) {
                    translateSpeechToTextResult = { pid: this.processId, data: '     ' }
                }
                // console.log(`${this.processId}: translateSpeechToTextEx ${translateSpeechToTextResult.pid}`);
                if (translateSpeechToTextResult.pid !== this.processId) return;
                // console.log(`${this.processId}: predictionEx`);
                let predictionResult: any = await speechService.predictionEx(this.processId, translateSpeechToTextResult.data);
                // console.log(`${this.processId}: predictionEx ${predictionResult.pid}`);
                if (predictionResult.pid !== this.processId) return;
                this.prediction = predictionResult.data;
                if (this.process) this.processPrediction();
            } else if (this.state.recordingState === "confirm") {
                // console.log(`${this.prediction}: prediction`);
                if (this.prediction === null) this.process = true;
                else this.processPrediction();
                this.setState({ recordingState: "loading" });
                setTimeout(() => this.setState({ pageState: 'loading' }), 8000);
            }
        } else {
            if (this.state.recordingState === "init") {
                try {
                    await speechService.recordAudioFromWeb();
                    this.setState({ recordingState: 'in-progress' });
                    this.stopTimer = setTimeout(() => this.recordAudio(), 60000);
                } catch (e) {
                    alert('Please allow microphone access to use this feature!');
                    return;
                }
            } else if (this.state.recordingState === "in-progress") {
                clearTimeout(this.stopTimer);
                this.setState({ pageState: 'loading' });
                this.base64 = await speechService.stopRecordingAudioFromWeb();
                this.processAudio();
            }
        }
    }

    async processAudio(data = null) {
        this.setState({ isGibberish: false });
        let text = data;
        if (data === null) {
            try {
                text = await speechService.translateSpeechToText(this.base64);
            } catch (e) { text = "    " }
        }
        this.setState({ pageState: 'loading' });
        var output = await speechService.prediction(text);
        console.log(output);
        console.log(output.data);
        if (output.data.success) this.props.history.push("/pie-chart");
        else if (output.data.gibberish) {
            this.setState({ isMic: false, recordingState: 'init', pageState: 'record', isGibberish: true });
        } else if (output.data.caution) {
            this.setState({ isMic: false, recordingState: 'init', pageState: 'record', isModalOpen: true });
        }
    }

    render() {
        return (<>
            {(this.state.pageState === 'loading') ? <Loader display="flex" /> : null}
            {(this.state.pageState === 'record') ? <BasePage showShield={this.state.pageState === 'record'} showInfoIcon={this.state.pageState === 'record'} showSignout={true}>
                <div style={{ userSelect: "none" }}> 
                    <Note isGibberish={this.state.isGibberish} recordingState={this.state.recordingState}></Note>
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
