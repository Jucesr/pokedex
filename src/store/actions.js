export const ACTIONS = {
    abort: "abort",
    error: "error",
    start: "start",
    update: "update"
}

// Log if a fetch is aborted by the async call running too aggressively.
export const abortFetch = () => ({
    type: ACTIONS.abort
});

/**
 * Log an error if the async call fails
 * @param {object} error - the error thrown.
 */
export const errorFetch = error => ({
    type: ACTIONS.error,
    error
});

// Start the fetch, toggle is `isFetching` value
export const startFetch = () => ({
    type: ACTIONS.start
});

/**
 * Resolve the fetch with the returned data
 * @param {object} payload - the data returned from the fetch 
 */
export const updateFetch = payload => ({
    type: ACTIONS.update,
    payload
});

// Run the async fetch if the data is stale, otherwise abort the fetch and log it
export const updateDemoContentAsync = () => {
    // Redux Thunk allows this, see its docs for more detail
    const days = 3;
    const miliseconds_in_day = 86400000;  
    const timeToStale = days * miliseconds_in_day;   
    return (dispatch, getState) => {
      
      // Get the state of the store synchronously for the REDUCER IN QUESTION, e.g. myContent here
      const timeSinceLastFetch = getState().myContent.lastFetched;
      
      // perform the async call if the data is older than the allowed limit
      const isDataStale = Date.now() - timeSinceLastFetch > timeToStale;
      if (isDataStale) {
        dispatch(startFetch());
  
        // Run the async fetch
        myApi.fetchData()
          .then(content => {
            dispatch(updateFetch(content));
          })
          .catch(err => {
            dispatch(errorFetch(err));
          });
      } else {
        dispatch(abortFetch());
      }
    };
  };