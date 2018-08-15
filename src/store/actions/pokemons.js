import isEmpty from 'lodash/isEmpty'
import pick from 'lodash/pick'
import { urlToId } from "../../utils/index"

const shouldCallAPI = (stateProperty, _id) => {
  return state => {
    if(!state[stateProperty].items[_id])
      return true

    const days = 3;
    const miliseconds_in_day = 86400000;  
    const timeToStale = days * miliseconds_in_day;  
    const timeSinceLastFetch = Date.now() - state[stateProperty].items[_id].lastFetched;
    const shouldFetch = (timeSinceLastFetch) > timeToStale;
    return shouldFetch 

  }
}

export const cleanError = () => ({
  type: 'CLEAN_ERROR'
})

export const loadPokemons = (how_many = 0) => {

  return (dispatch, getState) => {
    let state = getState().pokemons
    let new_lastID = state.lastID
    if(how_many == 0){
      if(isEmpty(state.items)){
        //Load the first 5 pokemons
        new_lastID = 5
        for (let index = state.lastID; index < new_lastID; index++) {
          dispatch(loadPokemonFullData(index))
        }
      }else{
        //Load pokemons that are in the state. 
        for (const key in state.items) {
          dispatch(loadPokemonFullData(parseInt(key)))        
        }
      }
    }else{
      //Load how_many more pokemons
      new_lastID = state.lastID + how_many
      for (let index = state.lastID; index < new_lastID; index++) {
        dispatch(loadPokemonFullData(index))
      }
    }

    dispatch({
      type: 'LOAD_POKEMON_CHUNK',
      lastID: new_lastID
    })

  }
  
}

export const loadPokemonFullData =  (_id) => {
  return async (dispatch, getState) => {

    //Get pokemon from state. Use result so it works for name and ID
    let result
    
    if(typeof _id === 'number') 
      result = await dispatch(loadPokemon(_id))
    else
      result = await dispatch(loadPokemonByName(_id))
    
    const pokemon = result ? result.response : getState().pokemons.items[_id]
    
    
    if(!pokemon)
      return 
    
    _id = pokemon.id
    const pokemon_specie_id = urlToId(pokemon.species.url) 

    //Load pokemon's abilities
    pokemon.abilities.map(ability => {
      let ability_id = urlToId(ability.ability.url)
      dispatch(loadAbility(ability_id))
    })

    //Load pokemon specie
    await dispatch(loadPokemonSpecie(pokemon_specie_id))
    const pokemon_specie = getState().pokemons_species.items[_id]
    if(!pokemon_specie)
      return
    const pokemon_chain_evolution_id = urlToId(pokemon_specie.evolution_chain.url) 

    //Load evolution
    await dispatch(loadEvolutionChain(pokemon_chain_evolution_id))
    const pokemon_chain_evolution = getState().evolution_chains.items[pokemon_chain_evolution_id]
    if(!pokemon_chain_evolution)
      return

    //Validate all pokemons in the chain are in pokemon state's property. 
    pokemon_chain_evolution.chain.forEach(pokemon_id => {
      let state = getState().pokemons
      if(!state.items[pokemon_id]){ 
        dispatch(loadPokemonFullData(parseInt(pokemon_id)))
      }
    })
    
  }
}

export const loadPokemon = (_id) => {    
    return {
      type: 'LOAD_POKEMON',
      shouldCallAPI: shouldCallAPI('pokemons', _id),
      callAPI: () => {
        let chache_id = _id - 1;
        return new Promise((resolve, reject) => {


          fetch(`https://pokeapi.co/api/v2/pokemon/${_id}/`)
          .then(
            response => {
              if(response.status == 404)
                reject('Not found')
            return response.json() 
            }
          )
          .then(response => {
            resolve(pick(response, [
              'abilities',
              'stats',
              'name',
              'weight',
              'sprites',
              'height',
              'species',
              'id',
              'base_experience',
              'types',
            ])) 
            })
        }) 
      },
      payload: { _id }
    }
}

export const loadPokemonByName = (name) => {    
  return {
    type: 'LOAD_POKEMON',
    shouldCallAPI: state => {
      for (const key in state.pokemons.items) {
        if (state.pokemons.items.hasOwnProperty(key)) {
          const element = state.pokemons.items[key];
          if(element.name == name)
            return false
        }
      }
      return true
    },
    callAPI: () => {

      return new Promise ((resolve, reject) => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${name}/`)
        .then(
          response => {
            if(response.status == 404)
              reject('Not found')
           return response.json() 
          }
        )
        .then(response => {
          resolve(pick(response, [
            'abilities',
            'stats',
            'name',
            'weight',
            'sprites',
            'height',
            'species',
            'id',
            'base_experience',
            'types',
          ])) 
        })
      }) 
    },
    payload: { name }
  }
}

export const loadAbility = (_id) => {    
  return {
    type: 'LOAD_ABILITY',
    shouldCallAPI: shouldCallAPI('abilities', _id),
    callAPI: () => {
      return new Promise((resolve, reject) => {

        fetch(`https://pokeapi.co/api/v2/ability/${_id}/`)
        .then(
          response => {
            if(response.status == 404)
              reject('Not found')
           return response.json() 
          }
        )
        .then(response => {
          resolve(pick(response, [
            'name',
            'effect_entries',
          ])) 
        }) 
      })
    },
    payload: { _id }
  }
}

export const loadPokemonSpecie = (_id) => {    
  return {
    type: 'LOAD_POKEMON_SPECIE',
    shouldCallAPI: shouldCallAPI('pokemons_species', _id) ,
    callAPI: () => {
      let chache_id = _id - 1;
      return new Promise((resolve, reject) => {

        fetch(`https://pokeapi.co/api/v2/pokemon-species/${_id}`)
        .then(
          response => {
            if(response.status == 404)
              reject('Not found')
           return response.json() 
          }
        )
        .then(response => {
          let specie = pick(response, [
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
           
        })
          
      })
    },
    payload: { _id }
  }
}

export const loadEvolutionChain = (_id) => {    
  return {
    type: 'LOAD_EVOLUTION_CHAIN',
    shouldCallAPI: shouldCallAPI('evolution_chains', _id),
    callAPI: () => {
      let chache_id = _id - 1;
      return new Promise((resolve, reject) => {

        fetch(`https://pokeapi.co/api/v2/evolution-chain/${_id}`)
        .then(
          response => {
            if(response.status == 404)
              reject('Not found')
           return response.json() 
          }
        )
        .then(response => {
          let chain = response.chain
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

        })
      })
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

        fetch(`https://pokeapi.co/api/v2/type/`)
          .then(response => response.json())
          .then(response => {
            resolve(response.results) 
          })  
      })

      
    },
    payload: {  }
  }
}