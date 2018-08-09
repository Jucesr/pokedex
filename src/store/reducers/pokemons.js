import { actions } from '../actions/pokemons';

const initialState = {
  content: [],
  error: null,
  isFetching: false,
  lastFetched: 0
}

export default (state = initialState, action = {}) => {
  const { error, payload, type, response } = action;

  switch (type) {
    
    case actions.LOAD_POKEMONS_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }

    case actions.LOAD_POKEMONS_FAILURE: {
      return {
        ...state,
        error,
        isFetching: false
      };
    }

    case actions.LOAD_POKEMONS_SUCCESS: {
      return {
        ...state,
        content: response,
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
