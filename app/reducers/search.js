import {
  SEARCH_START,
  SEARCH_END
} from '../constants';

const initState = {
  is_loading: false,
  results: [],
}

export default (state = initState, action) => {
  switch (action.type) {
    case SEARCH_START:
      return {
        results: [],
        is_loading: true,
      };

    case SEARCH_END:
      return {
        results: action.payload,
        is_loading: false,
      };

    default:
      return state;
  }
};
