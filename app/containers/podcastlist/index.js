import React from 'react';
import ThumbList from '../../components/thumblist';
import NavBar from '../../components/navbar';
import { connect } from 'react-redux';
import { setShow, fetchShow } from '../../actions';
import { browserHistory } from 'react-router';
import Alert from '../../components/alert';


class PodcastList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {

    let alert = null;
    let thumblist = null;
    if ( this.props.podcasts.length == 0 ) {
      alert = <Alert message="Go to search to add podcast" icon="music_video" />;
    } else {
      thumblist = <ThumbList items={this.props.podcasts} onClickHandler={ (item) => {
        this.props.fetchShow(item.id);
        this.props.setShow(item);
      }}/>
    }

    return (
      <div className="podcast-list">
        <NavBar
          leftIcon="menu"
          rightIcon="search"
          rightIconClick={ () => browserHistory.push('search') }
          >
          <h1 className="page-title">My podcast list</h1>
        </NavBar>
        <div className="container">
          {alert}
          {thumblist}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    podcasts: state.podcasts,
  };
}

export default connect(mapStateToProps, {setShow, fetchShow})(PodcastList);
