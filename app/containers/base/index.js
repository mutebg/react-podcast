import './reset.scss';
import './index.scss';
import React from 'react';
import Player from '../../components/player';
import { connect } from 'react-redux';


class Base extends React.Component {

  render() {

    let audioPlayer = null;

    if ( this.props.player.title) {
      let { media_link, title, image, show } = this.props.player;
      audioPlayer = (
        <div className="player">
          <Player source={media_link}
            show={show}
            episode={title}
            image={image}
          />
        </div>
      )
    }

    return (
      <div className="base">
        {audioPlayer}
        <div className="base-container">{ this.props.children }</div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    player: state.player,
  };
}

export default connect(mapStateToProps, {})(Base);
