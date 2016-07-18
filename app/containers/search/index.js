import './index.scss';
import React, { PropTypes } from 'react';
import NavBar from '../../components/navbar';
import Loading from '../../components/loading';
import SearchResultItem from '../../components/searchresultitem';
import { connect } from 'react-redux';
import { fetchSearch, clearSearch, podcastAdd, podcastRemove } from '../../actions';
import { browserHistory } from 'react-router';
import Alert from '../../components/alert';


class Search extends React.Component {

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      term: '',
      hits: 0,
    }
  }

  componentWillMount() {
    this.props.clearSearch();
  }


  handleSearch() {
    this.setState({
      hits: 1,
    })
    this.props.fetchSearch(this.state.term);
  }

  render () {
    var myPodcasts = this.props.podcasts.map( item => item.id );



    let loading = this.props.search.is_loading ? <Loading /> : null;
    let results =  this.props.search.results.map( item => {
      return <SearchResultItem
        key={item.channel_id}
        isAdded={ myPodcasts.indexOf(item.channel_id) >= 0 }
        title={item.title}
        onClickAdd={ () => this.props.podcastAdd(item) }
        onClickRemove={ () => this.props.podcastRemove(item.channel_id) }
        />
    })

    let message = null;

    if ( this.state.hits === 0 && !this.props.search.is_loading ) {
      message = <Alert message="Search for podcasts" icon="search" />;
    } else if ( this.state.hits > 0 && this.props.search.results.length === 0 && !this.props.search.is_loading ) {
      message = <Alert message="No podcasts found" icon="block" />;
    }

    return (
      <div className="search">
        <NavBar
          leftIcon="arrow_back"
          leftIconClick={ () => browserHistory.goBack() }
          rightIcon="search"
          rightIconClick={ this.handleSearch }
          >
          <input type="text" ref="search-input" placeholder="Search..."
            className="search-input" value={this.state.term} onChange={ (e) => this.setState({term: e.target.value})}/>
        </NavBar>
        <div className="container">
          {loading}
          {results}
          {message}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
    podcasts: state.podcasts,
  };
}

export default connect(mapStateToProps, {fetchSearch, clearSearch, podcastAdd, podcastRemove})(Search);
