import './reset.scss';
import './index.scss';
import React from 'react';
import Player from '../../components/player';
import { connect } from 'react-redux';
import cn from 'classnames';


class Base extends React.Component {

  render() {
    let { media_link, title, image, show } = this.props.player;
    let playerClass = cn('player',
      {'player--show': this.props.player.title}
    );

    return (
      <div className="base">
        <div className={playerClass}>
          <Player source={media_link}
            show={show}
            episode={title}
            image={image}
          />
        </div>
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
