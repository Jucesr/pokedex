import { actions } from '../actions/pokemons';

const initialState = {
  items: {},
  error: null,
  isFetching: false
}

export default (state = initialState, action = {}) => {
  const { error, _id, type, response } = action;

  switch (type) {
    
    case actions.LOAD_POKEMON_REQUEST: {
      return {
        ...state,
        isFetching: true
      };
    }

    case actions.LOAD_POKEMON_FAILURE: {
      return {
        ...state,
        error,
        isFetching: false
      };
    }

    case actions.LOAD_POKEMON_SUCCESS: {
      return {
        ...state,
        // items: state.items.concat(response),
        items: {
          ...state.items,
          [`${_id}`]: {...response, lastFetched: Date.now()}
        },
        error: null,
        isFetching: false
      };
    }

    default: {
      return state;
    }
  }
};