import React from 'react';
import ThumbList from '../../components/thumblist';
import NavBar from '../../components/navbar';
import { connect } from 'react-redux';
import { setShow, fetchShow } from '../../actions';
import { browserHistory } from 'react-router';

class PodcastList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
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
          <ThumbList items={this.props.podcasts} onClickHandler={ (item) => {
            this.props.fetchShow(item.id);
            this.props.setShow(item);
          }}/>
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
