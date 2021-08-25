import * as React from "react";
import Note from "./note";
import Actions from "./actions";
import Controls from "./controls";
import { TellUsAbout } from "../Tellusabout";
import { ImportLoader, BasePage } from "src/components";
import speechService from "./speechService";
import { isMobile } from "react-device-detect";
import { Modal } from "src/components/Modal";

const modalData = {
    title: "Take Charge!",
    header: "A random uote from database",
    content: "Please contact below services"
}

export interface IPage {
    route?: any,
    openModal?: any,
    history?: any,
}
export interface IPageState {
    pageState: string,//init, bottom-mic, recording, loading, sos, tell-us-about
    recordingState: string, //init, in-progress, confirm
    isMic: boolean,
    seconds: 0,
    isModalOpen: boolean,
    recordingCallback: any
}

export default class Page extends React.PureComponent<IPage, IPageState> {
    base64mp3: any;
    base64mp4: any;

    constructor(props: IPage) {
        super(props);
        this.state = { pageState: 'record', recordingState: 'init', seconds: 0, isMic: true, isModalOpen: false, recordingCallback: null }
        this.onCenterCircleClick = this.onCenterCircleClick.bind(this);
        this.onLeftCircleClick = this.onLeftCircleClick.bind(this);
        this.onLeftCircleCancel = this.onLeftCircleCancel.bind(this);
        this.onRightCircleClick = this.onRightCircleClick.bind(this);
        this.onSpeakAgain = this.onSpeakAgain.bind(this);
        this.processMp3 = this.processMp3.bind(this);
    }

    async onCenterCircleClick() {
        console.log('onCenterCircleClick');
        console.log(this.state.recordingState);
        if (!this.state.isMic) this.props.history.push("/dashboard");
        else if (this.state.recordingState === 'init') {
            this.setState({ recordingState: 'in-progress' });
            if (isMobile) {
                this.setState({ recordingState: 'confirm', recordingCallback: null });
                this.base64mp4 = await speechService.recordAudioFromTeams();
            }
            else {
                speechService.recordAudioFromWeb();
                let timer = setTimeout(() => this.onCenterCircleClick(), 60000);
                this.setState({ recordingCallback: timer });
            }
        }
        else if (this.state.recordingState === 'in-progress') {
            clearTimeout(this.state.recordingCallback);
            this.setState({ recordingState: 'confirm', recordingCallback: null });
            this.base64mp3 = await speechService.stopRecordingAudioFromWeb();
        }
        else if (this.state.recordingState === 'confirm') {
            this.setState({ pageState: 'loading' });
            if (isMobile) this.base64mp3 = await speechService.mp4ToMP3(this.base64mp4);
            this.processMp3(this.base64mp3);
        }
    }

    async processMp3(base64mp3) {
        console.log(`processMp3${base64mp3.length}`);
        let text: any = "";
        if (base64mp3) text = base64mp3;
        try {
            if (base64mp3.length > 256) text = await speechService.translateSpeechToText(base64mp3);
        } catch (e) { this.setState({ isMic: false, recordingState: 'init', pageState: 'record' }); }
        console.log(text);
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

    async onSpeakAgain() {
        await speechService.stopRecordingAudioFromWeb();
        speechService.recordAudioFromWeb();
    }

    onLeftCircleClick() { this.setState({ pageState: "tell-us-about" }); }
    onLeftCircleCancel() { this.setState({ pageState: "record" }); }
    async onRightCircleClick() {
        if (this.state.isMic) this.props.history.push("/dashboard");
        else {
            this.setState({ isMic: true, recordingState: 'in-progress', pageState: 'record' });
            if (isMobile) {
                let base64mp4 = await speechService.recordAudioFromTeams();
                this.setState({ pageState: 'loading' });
                let base64mp3 = await speechService.mp4ToMP3(base64mp4);
                this.processMp3(base64mp3);
            }
            else {
                speechService.recordAudioFromWeb();
                let timer = setTimeout(() => this.onCenterCircleClick(), 60000);
                this.setState({ recordingCallback: timer });
            }
        }
    }

    render() {
        return (<>
            {(this.state.pageState === 'loading') ? <ImportLoader /> : null}
            {(this.state.pageState === 'record') ? <BasePage withMenu={true} showShield={this.state.pageState === 'record'} showInfoIcon={this.state.pageState === 'record'}>
                <div style={{ userSelect: "none" }}>
                    <Note isMic={this.state.isMic} recordingState={this.state.recordingState}></Note>
                    <Controls onSpeakAgain={this.onSpeakAgain} isMic={this.state.isMic} onClick={this.onCenterCircleClick} recordingState={this.state.recordingState}></Controls>
                    <Actions onLeftCircleClick={this.onLeftCircleClick} isMic={this.state.isMic} recordingState={this.state.recordingState} onRightCircleClick={this.onRightCircleClick}></Actions>
                </div>
            </BasePage> : null}
            {(this.state.pageState === 'tell-us-about') ? <TellUsAbout saveData={(x) => this.processMp3(x)} setIsTellusabout={this.onLeftCircleCancel} /> : null}
            {this.state.isModalOpen ? (<Modal openModal={this.state.isModalOpen} modalData={modalData} HelpLineServices={["SOS", "HelpLine", "Cancel"]}></Modal>) : null}
        </>)
    }
}