import './index.scss';
import React from 'react';
import cn from 'classnames';

export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pause: true,
            played: false,
            currentTime: 0,
            loading: false,
            duration: this.props.duration || 0
        };

        this.setDuration = this.setDuration.bind(this);
        this.updateProgress = this.updateProgress.bind(this);
        this.endProgress = this.endProgress.bind(this);
        this.loadingStart = this.loadingStart.bind(this);
        this.loadingEnd = this.loadingEnd.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      this.delayedPlay();
    }

    componentDidMount() {
        this.audio = this.refs.audio;
        this.audio.addEventListener('durationchange', this.setDuration);
        this.audio.addEventListener('timeupdate', this.updateProgress);
        this.audio.addEventListener('ended', this.endProgress);
        this.audio.addEventListener('loadstart', this.loadingStart);
        this.audio.addEventListener('loadeddata', this.loadingEnd);

        this.delayedPlay();
    }

    componentWillUnmount() {
        this.audio.removeEventListener('durationchange', this.setDuration);
        this.audio.removeEventListener('timeupdate', this.updateProgress);
        this.audio.removeEventListener('ended', this.endProgress);
        this.audio.removeEventListener('loadstart', this.loadingStart);
        this.audio.removeEventListener('loadeddata', this.loadingEnd);
    }


    delayedPlay() {
      setTimeout( () => {
        this.play();
        console.log('play new podcast');
      }, 100)
    }

    loadingStart() {
      console.log('start loading');
      this.setState({
        loading: true,
      });
    }

    loadingEnd() {
      console.log('end loading first frame');
      this.setState({
        loading: false,
      });
    }

    onPlayClick() {
        if (this.audio.paused) {
          this.play();
        } else {
          this.stop();
        }
    }

    play() {
      this.audio.play();
      this.setState({
          pause: false,
          played: true
      });
    }

    stop() {
      this.audio.pause();
      this.setState({
          pause: true,
          played: true
      });
    }

    setDuration() {
        const defaultDuration = this.props.duration || 0;
        const duration = Math.round(this.audio.duration);
        if (window.isFinite(duration) && defaultDuration < duration) {
            this.setState({duration});
        }
    }

    formatDuration(duration) {
        let minutes;
        let seconds;
        if (duration <= 0) {
            return '00:00';
        }
        minutes = Math.floor(duration / 60);
        seconds = Math.floor(duration % 60);
        minutes = minutes >= 10 ? minutes : '0' + minutes;
        seconds = seconds >= 10 ? seconds : '0' + seconds;
        return minutes + ':' + seconds;
    }

    updateProgress() {
        const currentTime = this.audio.currentTime;
        this.setState({ currentTime });
        if (currentTime >= this.state.duration) {
            this.endPlay();
        }
    }

    endProgress() {
        this.endPlay();
    }

    endPlay() {
        this.setState({
            pause: true
        });
        this.audio.pause();
        this.audio.currentTime = 0;
    }

    render() {
        let audioURL = this.props.source;
        const formattedDuration = this.formatDuration(this.state.duration);
        const formattedPlayedTime = this.formatDuration(Math.round(this.state.currentTime));
        let processStyle = { transform: `scaleX( ${this.state.currentTime / this.state.duration}`};

        if (!this.state.pause) {
            // audio playing
            iconClass = 'icon icon-play';
        } else {
            // audio paused
            playerClass = 'audio-player';
            iconClass = 'audio-player__icon material-pause';
        }

        let playerClass = cn('audio-player');
        let iconClass =  cn('audio-player__icon', 'material-icons',
          {'icon-rotate': this.state.loading});

        let iconName = 'refresh';
        if ( ! this.state.loading ) {
          iconName = !this.state.pause ? 'play_arrow' : 'stop';
        }

        return (
            <div className="audio-container">
                <div
                    className={playerClass}
                    >
                    <div className="audio-player__content">
                        <button onClick={() => this.onPlayClick()}
                          className={iconClass}>{iconName}</button>
                        <div className="audio-player__box">
                          <div className="audio-player__show">{this.props.show}</div>
                          <div className="audio-player__episode">{this.props.episode}</div>
                        </div>
                        <img src={this.props.image} className="audio-player__img" />
                    </div>
                    <div
                      className="audio-player__progress"
                      style={processStyle}
                      />
                </div>
                <audio ref="audio" src={audioURL}/>
            </div>
        );
    }
}
