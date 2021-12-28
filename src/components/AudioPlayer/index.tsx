/* eslint-disable react/prop-types */
import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import Sound from 'react-sound';
import Pause from 'src/resources/icons/pause';
import Play from 'src/resources/icons/Play';

export interface IAudioPlayerProps {
  aPlayerVisible?: boolean;
  audioData?: any
}
export interface IAudioPlayerState {
  aPlayerTime?: number;
  aPlayerPlaying?: boolean;
  aPlayerDuration?: number;
  playing?: number;
}

class AudioPlayer extends React.Component<IAudioPlayerProps, IAudioPlayerState> {
  aPlayer = null;
  state = {
    aPlayerTime: 0.00,
    aPlayerPlaying: false,
    aPlayerDuration: 0,
    playing: Sound.status.STOPPED,
  }
  
  constructor(props) {
    super(props);
    this.aPlayer = React.createRef();
  }

  audioPlayPauseToggle = () => {
    if (this.state.aPlayerPlaying) {
      this.aPlayer.audioEl.current.pause();
      this.setState({ aPlayerPlaying: false });
    } else {
      this.aPlayer.audioEl.current.play();
      this.setState({ aPlayerPlaying: true });
    }
  }

  componentDidMount() {
    this.aPlayer.audioEl.current.ontimeupdate = (event) => {
      this.setState({ aPlayerTime: event.target.currentTime });
    };

    this.aPlayer.audioEl.current.onloadedmetadata = (event) => {
      this.setState({ aPlayerDuration: event.target.duration });
    };
  }

  render() {
    const { aPlayerVisible, audioData: { audioSrc, audioTitle } } = this.props;
    const { aPlayerPlaying, aPlayerDuration } = this.state;
    let { aPlayerTime } = this.state;

    const percentage = aPlayerDuration ? (aPlayerTime / aPlayerDuration) * 100 : 0;
    aPlayerTime = aPlayerDuration - aPlayerTime;
    const mmSS = `${parseInt((aPlayerTime / 60).toString())}:${parseInt((aPlayerTime % 60).toString()).toString().padStart(2, '0')}`;


    return (
      <>
        <div style={{ display: 'none' }}>
          {this.state.playing
            && (
              <Sound
                url="https://firebasestorage.googleapis.com/v0/b/joye-768f7.appspot.com/o/audio%2Fding%20clean.mp3?alt=media&token=91e9a06e-8c07-464d-9f92-a9dc4e3e0d10"
                playStatus={this.state.playing}
                onFinishedPlaying={() => this.setState({ playing: Sound.status.STOPPED })}
              />
            )}
          {audioSrc && (
            <ReactAudioPlayer
              src={audioSrc}
              ref={(element) => { this.aPlayer = element; }}
              preload='auto'
              onEnded={
                () => {
                  this.setState({ playing: Sound.status.PLAYING });
                  this.audioPlayPauseToggle();
                }
              }
            />
          )}
        </div>
       
        {aPlayerVisible && (
          <div className="player-bg" style={{margin:'0 auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
             <p className="cardHeading"
                  style={{margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', opacity: 1, fontSize: '20px'}}>
                  {audioTitle}
                </p>

            <div className="video-bg">
              <div className="progress-bar-sec" style={{  gap:'5px',  flex:' 2',
                height: '45px', display: 'flex', flexDirection: 'row', justifyContent: 'center',
              }}
              >
              <div className="progress">
                <div className="bar" style={{ width: `${percentage}%` }}>
                  <p className="percent" />
                </div>
              </div>
              <span className="timer">{mmSS}</span>
              </div>
              <div
                style={{
                  height: '50px', width: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                }}
                onClick={this.audioPlayPauseToggle}
                className="zoomOutEffect drop-shadow"
              >
                {aPlayerPlaying ? <Pause width="50px" /> : <Play width="50px" />}
              </div>
            </div>
         
          </div>
        )}
      </>
    );
  }
}

export default AudioPlayer;
