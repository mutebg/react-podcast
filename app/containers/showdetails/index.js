import './index.scss';
import React from 'react';
import Header from '../../components/header';
import Cover from '../../components/cover';
import { connect } from 'react-redux';
import { fetchShow, playerStart } from '../../actions';


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
    this.props.playerStart(item, this.props.show.info);
  }

  render() {

    const list = this.props.show.episodes.map( (item) => {
      let date = new Date(item.date);
      return (
        <div className="details-list__item" key={item.show_id}>
          <div className="details-list__date">{date.getDate()}<br />{date.getMonth()}</div>
          <div className="details-list__title">{item.title}</div>
          <div className="details-list__action">
            <button className="details-list__btn material-icons" onClick={this.handlePlay.bind(this, item)}>play_circle_outline</button>
            <div className="details-list__size">{item.size} MB</div>
          </div>
        </div>);
    });

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
  };
}

export default connect(mapStateToProps, {fetchShow, playerStart})(ShowDetails);
