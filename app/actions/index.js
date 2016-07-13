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
        console.log('error', error);
        return dispatch({
          type: c.SEARCH_END,
          payload: [],
        });
      });
  };
};

export const clearSearch = () => {
  return {
    type: c.SEARCH_CLEAR
  }
}

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
        console.log('error', error);
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

export const podcastRemove = podcastID => {
  return {
    type: c.PODCAST_REMOVE,
    payload: podcastID,
  }
}

export const playerStart = (episode, show) => {
  console.log('show', show);
  let payload = {
    ...episode,
    show: show.title,
    image: show.image,
  };
  console.log('payload', payload);

  return {
    type: c.PLAYER_START,
    payload,
  }
}

export const playerStop = () => {
  return {
    type: c.PLAYER_STOP
  }
}
