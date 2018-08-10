import cache_pokemon_types from '../../cachedata/types'
import cache_pokemon_species from '../../cachedata/pokemon_species'
import cache_evolution_chains from '../../cachedata/evolution_chains'
import cache_pokemons from '../../cachedata/pokemons_min'
import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'

export const loadPokemons = (how_many = 0) => {

  return (dispatch, getState) => {
    let state = getState().pokemons
    let new_lastID = how_many == 0 ? (isEmpty(state.items) ? 2 : Object.keys(state.items).length ) : state.lastID + how_many
    dispatch({
      type: 'LOAD_POKEMON_CHUNK',
      lastID: new_lastID
    })

    for (let index = state.lastID; index < new_lastID; index++) {
      // dispatch(loadPokemon(index))
      // dispatch(loadPokemonSpecies(index))
      // dispatch(loadEvolutionChain(index))
      dispatch(loadPokemonByID(index))
    }
  }
  
}

export const loadPokemon = (_id) => {    
    return {
      type: 'LOAD_POKEMON',
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
        let chache_id = _id - 1;
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if(cache_pokemons[chache_id])
              resolve(
                pick(cache_pokemons[chache_id], [
                  'stats',
                  'name',
                  'weight',
                  'sprites',
                  'height',
                  'species',
                  'id',
                  'base_experience',
                  'types',
                ])
              )
            else{
              reject('Not found')
            }
          }, 1000);
            
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
    type: 'LOAD_TYPE',
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

export const loadPokemonSpecies = (_id) => {    
  return {
    type: 'LOAD_POKEMON_SPECIE',
    shouldCallAPI: state => {
      if(!state.pokemons_species.items[_id])
        return true

      const days = 3;
      const miliseconds_in_day = 86400000;  
      const timeToStale = days * miliseconds_in_day;  
      const timeSinceLastFetch = Date.now() - state.pokemons_species.items[_id].lastFetched;
      const shouldFetch = (timeSinceLastFetch) > timeToStale;
      return shouldFetch 

    },
    callAPI: () => {
      let chache_id = _id - 1;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(cache_pokemon_species[chache_id]){
    
            let specie = pick(cache_pokemon_species[chache_id], [
              'base_happiness',
              'name',
              'is_baby',
              'evolution_chain',
              'evolves_from_species',
              'flavor_text_entries',
              'capture_rate'
            ])
            //Take the first english description
            specie.description = "No description available"
            for (let index = 0; index < specie.flavor_text_entries.length; index++) {
              const element = specie.flavor_text_entries[index];
              if(element.language.name == 'en'){
                specie.description = element.flavor_text
                break;
              }
            }

            delete specie.flavor_text_entries

            resolve(specie)
          }else{
            reject('Not found')
          }
        }, 1000);
          
      })

      //TODO: Add fetch to Pokemon API.
      // fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      //   .then(response => response.json())
    },
    payload: { _id }
  }
}

export const loadEvolutionChain = (_id) => {    
  return {
    type: 'LOAD_EVOLUTION_CHAIN',
    shouldCallAPI: state => {
      if(!state.evolution_chains.items[_id])
        return true

      const days = 3;
      const miliseconds_in_day = 86400000;  
      const timeToStale = days * miliseconds_in_day;  
      const timeSinceLastFetch = Date.now() - state.evolution_chains.items[_id].lastFetched;
      const shouldFetch = (timeSinceLastFetch) > timeToStale;
      return shouldFetch 

    },
    callAPI: () => {
      let chache_id = _id - 1;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if(cache_evolution_chains[chache_id]){
            let chain = cache_evolution_chains[chache_id].chain;
            let chain_path_pokemon_species_ids = []

            try{
              do {
                  chain = Array.isArray(chain) ? chain[0] : chain
        
                  chain_path_pokemon_species_ids.push(urlToId(chain.species.url))

                  chain = chain.evolves_to
               
              } while (chain.length > 0);

            }catch(e){
              reject(e)
            }
            
            resolve({chain: chain_path_pokemon_species_ids})
          }
            
          else{
            reject('Not found')
          }
        }, 1000);
          
      })

      //TODO: Add fetch to Pokemon API.
      // fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      //   .then(response => response.json())
    },
    payload: { _id }
  }
}

export const loadPokemonByID =  (_id) => {
  return async (dispatch, getState) => {

    await dispatch(loadPokemon(_id))
    const pokemon = getState().pokemons.items[_id]
    
    if(!pokemon)
      return 
    const pokemon_specie_id = urlToId(pokemon.species.url) 

    await dispatch(loadPokemonSpecies(pokemon_specie_id))
    const pokemon_specie = getState().pokemons_species.items[_id]
    if(!pokemon_specie)
      return
    const pokemon_chain_evolution_id = urlToId(pokemon_specie.evolution_chain.url) 

    await dispatch(loadEvolutionChain(pokemon_chain_evolution_id))
    const pokemon_chain_evolution = getState().evolution_chains.items[pokemon_chain_evolution_id]
    if(!pokemon_chain_evolution)
      return

    //Validate all pokemons in the chain are in pokemon state's property. 
    pokemon_chain_evolution.chain.forEach(pokemon_id => {
      let state = getState().pokemons
      if(!state.items[pokemon_id]){ 
        dispatch(loadPokemonByID(pokemon_id))
      }
    })
    
  }
}


//UTIL FUNCTION

const urlToId = (url) => {
  let aux_arr = url.split('/') 
  return aux_arr[aux_arr.length - 2] 
}