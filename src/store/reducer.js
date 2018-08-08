import { ACTIONS } from './actions';

const initialState = {
  content: {},
  error: null,
  isFetching: false,
  lastFetched: 0
}

const myContentReducer = (state = initialState, action = {}) => {
  const { error, payload, type } = action;

  switch (type) {
     
    case ACTIONS.error: {
      return {
        ...state,
        error,
        isFetching: false
      };
    }

    case ACTIONS.startFetch: {
      return {
        ...state,
        isFetching: true
      };
    }

    case ACTIONS.update: {
      return {
        ...state,
        content: payload,
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

export default myContentReducer;