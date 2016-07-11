import React from 'react';
import ThumbList from '../../components/thumblist';
import NavBar from '../../components/navbar';
import { connect } from 'react-redux';
import { setShow, fetchShow } from '../../actions';
import { browserHistory } from 'react-router';

export default class PodcastList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="podcast-list">
        <NavBar
          leftIcon="arrow_back"
          leftIconClick={ () => browserHistory.goBack() }
          rightIcon="search"
          rightconClick={ () => browserHistory.push('search') }
          >
          <h1>My podcast list</h1>
        </NavBar>
        <ThumbList items={this.props.podcasts} onClickHandler={ (item) => {
            this.props.fetchShow(item.id);
            this.props.setShow(item);
          }}/>
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
