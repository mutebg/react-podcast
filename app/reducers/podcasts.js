import _ from 'lodash';
import {
  PODCAST_ADD,
  PODCAST_REMOVE,
  PODCAST_UPDATE
} from '../constants';

const initState = [];

export default (state = initState, action) => {
  switch (action.type) {

    case PODCAST_ADD:
      return [...state, {
        id: action.payload.channel_id,
        title: action.payload.title,
        subtitle: action.payload.subtitle,
        description: action.payload.description,
        image: action.payload.image,
        color: '#009688',
      }];

    case PODCAST_UPDATE: {
      const index = _.findIndex( state, (item) => item.id == action.payload.podcastID );
      if (index >= 0 ) {
        return [
          ...state.slice(0, index),
          {...state[index], ...action.payload.data},
          ...state.slice(index + 1),
        ];
      }
      return state;
    }

    case PODCAST_REMOVE: {
      const index = _.findIndex( state, (item) => item.id == action.payload );
      if (index >= 0 ) {
        return [
          ...state.slice(0, index),
          ...state.slice(index + 1),
        ];
      }
      return state;
    }

    default:
      return state;
  }
};
