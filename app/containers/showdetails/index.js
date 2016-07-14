import './index.scss';
import React from 'react';
import Header from '../../components/header';
import Cover from '../../components/cover';
import { connect } from 'react-redux';
import { fetchShow, playerStart, playerStop } from '../../actions';
import formatMB from '../../utils/formatmb';


class ShowDetails extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    if ( this.props.show.info ) {
      //this.props.fetchShow(this.props.params.id);
    }
  }

  handlePlay(item) {
    if ( item.show_id === this.props.player.show_id  ) {
      this.props.playerStop();
    } else {
      this.props.playerStart(item, this.props.show.info);
    }
  }

  render() {
    const list = this.props.show.episodes.map( (item) => {
      let date = new Date(item.date);
      let icon = item.show_id === this.props.player.show_id ? 'pause_circle_outline' : 'play_circle_outline';
      let formatedSize = formatMB(item.size);
      return (
        <div className="details-list__item" key={item.show_id}>
          <div className="details-list__date">{date.getDate()}<br />{date.getMonth()}</div>
          <div className="details-list__title">{item.title}</div>
          <div className="details-list__action">
            <button className="details-list__btn material-icons" onClick={this.handlePlay.bind(this, item)}>{icon}</button>
            <div className="details-list__size">{ formatedSize } MB</div>
          </div>
        </div>);
    });

    console.log('props', this.props.show);

    return (
      <div className="details">
        <Cover {...this.props.show.info}/>
        <div className="details-list">{list}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: state.show,
    player: state.player,
  };
}

export default connect(mapStateToProps, {fetchShow, playerStart, playerStop })(ShowDetails);
