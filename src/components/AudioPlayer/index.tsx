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
                url="https://firebasestorage.googleapis.com/v0/b/joye-dev2018/o/Master%20Data%2Fsounds%2Fding.wav?alt=media&token=692f0fa4-afa6-429d-8805-76ea4a7294fc"
                playStatus={this.state.playing}
                onFinishedPlaying={() => this.setState({ playing: Sound.status.STOPPED })}
              />
            )}
          {audioSrc && (
            <ReactAudioPlayer
              src={audioSrc}
              ref={(element) => { this.aPlayer = element; }}
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
          <div className="player-bg" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
             <p className="cardHeading"
                  style={{margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', opacity: 1, fontSize: '20px'}}>
                  {audioTitle}
                </p>

            <div className="video-bg">
              <div className="progress-bar-sec" style={{    flex:' 2',
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
                  height: '50px', width: '50px', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: '10px', marginTop: '10px',
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
