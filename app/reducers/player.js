import {
  PLAYER_START,
  PLAYER_STOP
} from '../constants';

const initState = {
};

export default (state = initState, action) => {
  switch (action.type) {

    case PLAYER_START:
      return action.payload;

    case PLAYER_STOP:
      return {};

    default:
      return state;
  }
};
