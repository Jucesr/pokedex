import cache_pokemon_types from '../../cachedata/types'
import cache_pokemons from '../../cachedata/pokemons_min'

export const actions = {
    LOAD_POKEMONS_REQUEST: "LOAD_POKEMONS_REQUEST",
    LOAD_POKEMONS_SUCCESS: "LOAD_POKEMONS_SUCCESS",
    LOAD_POKEMONS_FAILURE: "LOAD_POKEMONS_FAILURE"
}

export const loadPokemons = () => {    
    return {
      types: [
          actions.LOAD_POKEMONS_REQUEST, 
          actions.LOAD_POKEMONS_SUCCESS, 
          actions.LOAD_POKEMONS_FAILURE
        ],
      shouldCallAPI: state => {
        const days = 3;
        const miliseconds_in_day = 86400000;  
        const timeToStale = days * miliseconds_in_day;  
        const timeSinceLastFetch = Date.now() - state.pokemons.lastFetched;
        const shouldFetch = (timeSinceLastFetch) > timeToStale;
        return shouldFetch
      },
      callAPI: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(cache_pokemons)
          }, 10000);
            
        })

        //TODO: Add fetch to Pokemon API.
        // fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        //   .then(response => response.json())
      },
      payload: {  }
    }
}