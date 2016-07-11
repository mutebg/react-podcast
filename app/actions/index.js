import * as c from '../constants';
import { get, post } from '../utils/api';

export const fetchSearch = term => {
  return (dispatch) => {
    dispatch({
      type: c.SEARCH_START,
    });

    return get(`search.json?q=${term}&limit=20`)
      .then(({ data:response }) => {
        return dispatch({
          type: c.SEARCH_END,
          payload: response.channels,
        });
      }).catch(error => {
        return dispatch({
          type: c.SEARCH_END,
          payload: [],
        });
      });
  };
};

export const fetchShow = showID => {
  return (dispatch) => {
    dispatch({
      type: c.FETCH_SHOW_START,
    });

    return get(`channel/${showID}.json?limit=20`)
      .then(({ data:response }) => {
        return dispatch({
          type: c.FETCH_SHOW_END,
          payload: response.channel,
        });
      }).catch(error => {
        return dispatch({
          type: c.FETCH_SHOW_END,
          payload: [],
        });
      });
  };
}

export const setShow = data => {
  return {
    type: c.SET_SHOW,
    payload: data,
  }
}

export const podcastAdd = podcast => {
  console.log('podcast add', podcast);
  return {
    type: c.PODCAST_ADD,
    payload: podcast,
  }
}

export const podcastRemove = podcastIndex => {
  return {
    type: c.PODCAST_EDIT,
    payload: podcastIndex,
  }
}
