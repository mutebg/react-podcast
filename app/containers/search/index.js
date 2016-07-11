import './index.scss';
import React, { PropTypes } from 'react';
import NavBar from '../../components/navbar';
import Loading from '../../components/loading';
import SearchResultItem from '../../components/searchresultitem';
import { connect } from 'react-redux';
import { fetchSearch, podcastAdd, podcastRemove } from '../../actions';
import { browserHistory } from 'react-router';


class Search extends React.Component {

  constructor(props) {
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
    this.state = {
      term: '',
    }
  }

  handleSearch() {
    this.props.fetchSearch(this.state.term);
  }

  render () {

    let loading = this.props.search.is_loading ? <Loading /> : null;
    let results =  this.props.search.results.map( item => {
      return <SearchResultItem
        key={item.channel_id}
        isAdded={false}
        title={item.title}
        onClickAdd={ () => this.props.podcastAdd(item) }
        onClickRemove={ () => this.props.podcastRemove(item.channel_id) }
        />
    })

    return (
      <div className="search">
        <NavBar
          leftIcon="arrow_back"
          leftIconClick={ () => browserHistory.goBack() }
          rightIcon="search"
          rightconClick={ this.handleSearch }
          >
          <input type="text" ref="search-input" className="search-input" value={this.state.term} onChange={ (e) => this.setState({term: e.target.value})}/>
        </NavBar>
        {loading}
        {results}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    search: state.search,
  };
}

export default connect(mapStateToProps, {fetchSearch, podcastAdd, podcastRemove})(Search);
