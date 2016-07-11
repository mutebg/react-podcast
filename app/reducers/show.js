import {
  FETCH_SHOW_START,
  FETCH_SHOW_END,
  SET_SHOW
} from '../constants';

const initState = {
  is_loading: false,
  episodes: [],
  info: {},
}

export default (state = initState, action) => {
  switch (action.type) {

    case FETCH_SHOW_START:
      return {
        episodes: [],
        is_loading: true,
        info: {},
      };

    case FETCH_SHOW_END:
      return {
        episodes: action.payload.episodes,
        is_loading: false,
        info: {
          id: action.payload.channel_id,
          title: action.payload.title,
          subtitle: action.payload.subtitle,
          description: action.payload.description,
          image: action.payload.image,
          color: '#009688',
        }
      };

    case SET_SHOW:
      return {...state, info: action.payload}


    default:
      return state;
  }
};
