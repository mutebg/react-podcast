import React from 'react';
import { Route, IndexRoute } from 'react-router';

// components
import Base from './containers/base';
import PodcastList from './containers/podcastlist';
import Details from './containers/showdetails';
import Search from './containers/search';

export default (
  <Route path="/" component={Base}>
    <Route path="/home" component={PodcastList} />
    <Route path="/details-:id" component={Details} />
    <Route path="/search" component={Search} />
    <IndexRoute component={PodcastList} />
  </Route>
);
