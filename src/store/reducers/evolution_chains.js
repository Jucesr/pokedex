const initialState = {
    items: {},
    error: null,
    isFetching: false
  }
  
  export default (state = initialState, action = {}) => {
    const { error, _id, type, response } = action;
  
    switch (type) {
      
      case 'LOAD_EVOLUTION_CHAIN_REQUEST': {
        return {
          ...state,
          isFetching: true
        };
      }
  
      case 'LOAD_EVOLUTION_CHAIN_FAILURE': {
        return {
          ...state,
          error,
          isFetching: false
        };
      }
  
      case 'LOAD_EVOLUTION_CHAIN_SUCCESS': {

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
  