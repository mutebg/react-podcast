import { combineReducers } from 'redux';
import search from './search';
import show from './show';
import podcasts from './podcasts';

const root = combineReducers({
  search,
  show,
  podcasts
});

export default root;
