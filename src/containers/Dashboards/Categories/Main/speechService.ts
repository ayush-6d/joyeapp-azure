import MicRecorder from "mic-recorder-to-mp3";
import * as microsoftTeams from "@microsoft/teams-js";
import axios from "axios";
import { getTId, getUserId, getAuthId } from "../../../../services/localStorage.service";

const Mp3Recorder = new MicRecorder({ bitRate: 128 });
const config = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export default class SpeechService {
  static recordAudioFromWeb() {
    return new Promise((resolve, reject) => {
      Mp3Recorder.start()
        .then(() => resolve("started"))
        .catch((e) => reject(e));
    });
  }

  static stopRecordingAudioFromWeb() {
    return new Promise((resolve, reject) => {
      Mp3Recorder.stop()
        .getMp3()
        .then(([buffer, blob]) => {
          const file = new File(buffer, "voice.mp3", { type: blob.type, lastModified: Date.now() });
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve((reader.result as string).split("base64,")[1]);
        })
        .catch((e) => reject(e));
    });
  }

  static recordAudioFromTeams() {
    alert('--recordAudioFromTeams');
    return new Promise((resolve, reject) => {
      alert('--promise');
      microsoftTeams.initialize();
      alert('--initialize');
      let mediaInput: microsoftTeams.media.MediaInputs = {
        mediaType: microsoftTeams.media.MediaType.Audio,
        maxMediaCount: 1,
        //audioProps: { maxDuration: 1 },
      };
      alert('--selectMedia');
      microsoftTeams.media.selectMedia(mediaInput, (error: microsoftTeams.SdkError, attachments: microsoftTeams.media.Media[]) => {
        alert('--audioResult');
        if (error) reject(error.message ? `${error.errorCode} ${error.message}` : error.errorCode);
        console.log("attachments", attachments);
        let audioResult = attachments[0];
        console.log("audioResult", audioResult);
        alert('--getMedia');
        audioResult.getMedia((error: microsoftTeams.SdkError, blob: Blob) => {
          alert('--blob');
          if (blob) {
            alert('--blob01');
            var data = new Blob([blob], { type: blob.type });
            alert('--blob02');
            console.log("data:", data);
            alert('--filereader');
            var reader = new FileReader();
            reader.readAsDataURL(data);
            reader.onloadend = function () {
              alert('--onloadend');
              let base64String = (reader.result as string).replace("data:video/mp4;base64,", "");
              base64String = base64String.substring(0, base64String.indexOf("AAAAAAAA"));
              base64String = base64String.substring(0, base64String.length - (base64String.length % 4));
              resolve(base64String);
            };
          }
        });
      });
    });
  }

  static mp4ToMP3(base64Mp4) {
    let promise = new Promise((resolve, reject) => {
      let convertOptions = {
        apikey: "dZjagqgkZ4SSbKp1IzQyxxEyAyJehISdYvxkUU9P9mnYaQtEyvfHwEs3I6ULo5kj",
        inputformat: "mp4",
        outputformat: "mp3",
        input: "base64",
        filename: "my.mp4",
        file: base64Mp4,
        wait: true,
        download: false,
        save: true,
      };
      let url = "https://api.cloudconvert.com/v1/convert";
      fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(convertOptions) }).then((x) => {
        setTimeout(() => {
          fetch(x.url)
            .then((x) => x.json())
            .then((x) => {
              fetch(x.output.url)
                .then((x) => x.blob())
                .then((x) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(x);
                  reader.onloadend = () => {
                    let str = (reader.result as string).replace("data:audio/mpeg;base64,", "");
                    resolve(str);
                  };
                });
            });
        }, 2000);
      });
    });
    return promise;
  }

  static translateSpeechToText(base64Mp3) {
    return new Promise((resolve, reject) => {
      let data = {
        version: "v1p1beta1",
        audio: { content: base64Mp3 },
        config: {
          sampleRateHertz: 8000,
          enableAutomaticPunctuation: true,
          encoding: "MP3",
          languageCode: "en-US",
        },
      };

      axios
        .post("https://us-central1-joye-768f7.cloudfunctions.net/translateSpeechToText", data, config)
        .then((x) => {
          let text = "";
          if (!x.data.results) reject("no data");
          x.data.results.map((data) => data.alternatives.map((data) => (text += data.transcript)));
          resolve(text);
        })
        .catch((e) => reject(e));
    });
  }

  static prediction(todaysFeelingText) {
    let data = {
      organisationId: "-MHUPaNmo_p85_DR3ABC",
      subOrganisationId: getTId(),
      empId: getUserId(),
      uid: getAuthId(),
      text: todaysFeelingText,
    };
    console.log(data);
    return axios.post("https://us-central1-joye-768f7.cloudfunctions.net/predictionService", data, config);
  }
}
