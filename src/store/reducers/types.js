import { actions } from '../actions/pokemons';

const initialState = {
  items: [],
  error: null,
  isFetching: false,
  lastFetched: 0
}

export default (state = initialState, action = {}) => {
  const { error, payload, type, response } = action;

  switch (type) {
    
    case actions.LOAD_TYPES_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }

    case actions.LOAD_TYPES_FAILURE: {
      return {
        ...state,
        error,
        isFetching: false
      };
    }

    case actions.LOAD_TYPES_SUCCESS: {
      return {
        ...state,
        items: response,
        error: null,
        isFetching: false,
        lastFetched: Date.now()
      };
    }

    default: {
      return state;
    }
  }
};
