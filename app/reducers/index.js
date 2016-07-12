import { combineReducers } from 'redux';
import search from './search';
import show from './show';
import podcasts from './podcasts';
import player from './player';

const root = combineReducers({
  search,
  show,
  podcasts,
  player,
});

export default root;
