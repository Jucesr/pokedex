const initialState = {
    items: {},
    error: null,
    isFetching: false
  }
  
  export default (state = initialState, action = {}) => {
    const { error, _id, type, response } = action;
  
    switch (type) {
      
      case 'LOAD_ABILITY_REQUEST': {
        return {
          ...state,
          isFetching: true
        };
      }
  
      case 'LOAD_ABILITY_FAILURE': {
        return {
          ...state,
          error,
          isFetching: false
        };
      }
  
      case 'LOAD_ABILITY_SUCCESS': {

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
  