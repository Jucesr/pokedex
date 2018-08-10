const initialState = {
  items: {},
  error: null,
  isFetching: false,
  lastID: 1
}

export default (state = initialState, action = {}) => {
  const { error, _id, type, response, lastID } = action;

  switch (type) {

    case 'LOAD_POKEMON_CHUNK': {
      return {
        ...state,
        lastID: lastID
      };
    }
    
    case 'LOAD_POKEMON_REQUEST': {
      return {
        ...state,
        isFetching: true
      };
    }

    case 'LOAD_POKEMON_FAILURE': {
      return {
        ...state,
        error,
        isFetching: false
      };
    }

    case 'LOAD_POKEMON_SUCCESS': {
      return {
        ...state,
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
