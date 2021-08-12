import * as React from "react";
import MicRecorder from "mic-recorder-to-mp3";
import axios from "axios";
import * as microsoftTeams from "@microsoft/teams-js";

export interface IDeepBreathProps { }
export interface IDeepBreathState { }
const Mp3Recorder = new MicRecorder({ bitRate: 128 });
export class DeepBreath extends React.PureComponent<IDeepBreathProps, IDeepBreathState> {
  start = () => {
    console.log('start');
    Mp3Recorder.start().then(() => console.log('started')).catch(e => console.error(e));
  };
  stop = () => {
    console.log('stop');
    Mp3Recorder.stop().getMp3().then(([buffer, blob]) => {

      const file = new File(buffer, "me-at-the-voice.mp3", { type: blob.type, lastModified: Date.now() });
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log((reader.result as any).length);
        var str = (reader.result as any).split("base64,")[1];
        axios.post(`https://us-central1-joye-768f7.cloudfunctions.net/translateSpeechToText`,
          {
            version: "v1p1beta1",
            audio: { content: str },
            config: {
              sampleRateHertz: 8000,
              enableAutomaticPunctuation: true,
              encoding: "MP3",
              languageCode: "en-US"
            }
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }
        )
          .then(async function (res) {
            console.log(res.data.results[0].alternatives[0].transcript);
          });
      };
    }).catch(e => console.log(e));
  };

  startT = () => {
    console.log('start');
    microsoftTeams.initialize();

    let mediaInput: microsoftTeams.media.MediaInputs = {
      mediaType: microsoftTeams.media.MediaType.Audio,
      maxMediaCount: 1
      //audioProps: { maxDuration: 1 },
    };
    microsoftTeams.media.selectMedia(mediaInput, (error: microsoftTeams.SdkError, attachments: microsoftTeams.media.Media[]) => {
      if (error) {
        if (error.message) alert(" ErrorCode: " + error.errorCode + error.message);
        else alert(" ErrorCode: " + error.errorCode);
      }
      console.log('attachments', attachments)
      document.getElementById('output1').innerHTML= JSON.stringify(attachments);
      let audioResult = attachments[0];
      console.log('audioResult', audioResult);
      
      audioResult.getMedia((error: microsoftTeams.SdkError, blob: Blob) => {
        if (blob) {
          var data = new Blob([blob], { type: blob.type });
          console.log('data:', data)
          let url = URL.createObjectURL(data)
          let file = fetch(url).then(r => r.blob()).then(blobFile => new File([blobFile], audioResult.content, { type: "video/mp4" }))
          console.log('file', file);
        }
      });
    });
  };

  stopT = () => {
    console.log('stop');
    Mp3Recorder.stop().getMp3().then(([buffer, blob]) => {

      const file = new File(buffer, "me-at-the-voice.mp3", { type: blob.type, lastModified: Date.now() });
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        console.log((reader.result as any).length);
        var str = (reader.result as any).split("base64,")[1];
        axios.post(`https://us-central1-joye-768f7.cloudfunctions.net/translateSpeechToText`,
          {
            version: "v1p1beta1",
            audio: { content: str },
            config: {
              sampleRateHertz: 8000,
              enableAutomaticPunctuation: true,
              encoding: "MP3",
              languageCode: "en-US"
            }
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }
        )
          .then(async function (res) {
            console.log(res.data.results[0].alternatives[0].transcript);
          });
      };
    }).catch(e => console.log(e));
  };

  render() {
    return (
      <>
        <h1>Test16</h1>
        <button onClick={e => this.start()}>Start</button>
        <button onClick={e => this.stop()}>Stop</button>
        <br /><br /><br />
        <button onClick={e => this.startT()}>Start</button>
        <button onClick={e => this.stopT()}>Stop</button>
        <p id="output1">Output1</p>
        <p id="output2">Output2</p>
      </>
    );
  }
}
