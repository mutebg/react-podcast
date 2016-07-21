import * as c from '../constants';
import { get, post } from '../utils/api';
import store from '../store';

let WorkerThread = require("worker!../webworker.js");
let webWorker = new WorkerThread();


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
  webWorker.postMessage({
    type: c.PODCAST_ADD,
    payload: podcast
  });


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

export const podcastUpdate = (podcastID, data ) => {
  return {
    type: c.PODCAST_UPDATE,
    payload: {
      podcastID,
      data,
    }
  }
}

export const playerStart = (episode, show) => {
  let payload = {
    ...episode,
    show: show.title,
    image: show.image,
  };

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

webWorker.addEventListener('message', (e) => {
  console.log(e);
  let {type, payload} = e.data;
  switch( type ) {
    case c.PODCAST_ADD:
      store.dispatch( podcastUpdate(payload.showID, {color: payload.color}) );
    break;
  }

});
