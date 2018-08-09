import cache_pokemon_types from '../../cachedata/types'
import cache_pokemons from '../../cachedata/pokemons_min'

export const actions = {
    LOAD_POKEMON_REQUEST: "LOAD_POKEMON_REQUEST",
    LOAD_POKEMON_SUCCESS: "LOAD_POKEMON_SUCCESS",
    LOAD_POKEMON_FAILURE: "LOAD_POKEMON_FAILURE",
    LOAD_TYPES_REQUEST: "LOAD_TYPES_REQUEST",
    LOAD_TYPES_SUCCESS: "LOAD_TYPES_SUCCESS",
    LOAD_TYPES_FAILURE: "LOAD_TYPES_FAILURE"
}

export const loadPokemon = (_id, time) => {    
    return {
      types: [
          actions.LOAD_POKEMON_REQUEST, 
          actions.LOAD_POKEMON_SUCCESS, 
          actions.LOAD_POKEMON_FAILURE
        ],
      shouldCallAPI: state => {
        if(!state.pokemons.items[_id])
          return true

        const days = 3;
        const miliseconds_in_day = 86400000;  
        const timeToStale = days * miliseconds_in_day;  
        const timeSinceLastFetch = Date.now() - state.pokemons.items[_id].lastFetched;
        const shouldFetch = (timeSinceLastFetch) > timeToStale;
        return shouldFetch 

      },
      callAPI: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(cache_pokemons[_id])
          }, time);
            
        })

        //TODO: Add fetch to Pokemon API.
        // fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        //   .then(response => response.json())
      },
      payload: { _id }
    }
}

export const loadPokemonTypes = () => {  
  return {
    types: [
        actions.LOAD_TYPES_REQUEST, 
        actions.LOAD_TYPES_SUCCESS, 
        actions.LOAD_TYPES_FAILURE
      ],
    shouldCallAPI: state => {
      const days = 10;
      const miliseconds_in_day = 86400000;  
      const timeToStale = days * miliseconds_in_day;  
      const timeSinceLastFetch = Date.now() - state.types.lastFetched;
      const shouldFetch = (timeSinceLastFetch) > timeToStale;      
      return shouldFetch
    },
    callAPI: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(cache_pokemon_types.results)
        }, 1000);
          
      })

      //TODO: Add fetch to Pokemon API.
      // fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      //   .then(response => response.json())
    },
    payload: {  }
  }
}