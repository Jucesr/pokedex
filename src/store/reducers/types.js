const initialState = {
  items: [],
  error: null,
  isFetching: false,
  lastFetched: 0
}

export default (state = initialState, action = {}) => {
  const { error, payload, type, response } = action;

  switch (type) {
    
    case 'LOAD_TYPE_REQUEST': {
      return {
        ...state,
        isFetching: true
      };
    }

    case 'LOAD_TYPE_FAILURE': {
      return {
        ...state,
        error,
        isFetching: false
      };
    }

    case 'LOAD_TYPE_SUCCESS': {
      return {
        ...state,
        ...payload,
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
