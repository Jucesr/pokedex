import React from 'react'
import List from './List'
import PokemonTypes from './PokemonTypes'
import {Stats} from './Stats'
import {BasicInfo} from './BasicInfo'
import {Appearance} from './Appearance'
import cache_pokemon_types from '../../cachedata/types'
import cache_pokemons from '../../cachedata/pokemons_min'

export default class PokemonPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          filter_name: '',
          pokemons: [],
          selected_pokemon: 0,
          types: [],
          loading: true,
          loadingt: true
        }
      }

      componentDidMount = () =>{
    
        this.fetchPokemons(50)
        this.fetchTypes()
      }

      selectPokemon = (pokemon_id) => {
        this.setState(prevState => ({
          selected_pokemon: pokemon_id - 1 
        }))
      }
    
      fetchPokemons = (number_of_pokemons_to_fetch) => {
    
        // let list_of_pokemons = []
        // for (var i = 1; i < number_of_pokemons_to_fetch + 1; i++) {
        //   list_of_pokemons.push(Math.floor(Math.random() * 100) + 1)
        // }
        // let proms = list_of_pokemons.map( id => {
        //   return fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`).then(response => response.json())
        // })
    
        // Promise.all(proms).then((values) => {
        //   this.setState((prevState) => ({
        //     pokemons: prevState.pokemons.concat(values),
        //     loading: false
        //   }))
        // });

        this.setState((prevState) => ({
          pokemons: prevState.pokemons.concat(cache_pokemons.concat(cache_pokemons)),
          loading: false
        }))
      }

      fetchTypes = () => {
        
        // fetch(`https://pokeapi.co/api/v2/type/`)
        //   .then(response => response.json())
        //   .then((values) => {
        //     this.setState((prevState) => ({
        //       types: prevState.types.concat(values.results),
        //       loadingt: false
        //     }))
        //   })

        this.setState((prevState) => ({
          types: prevState.types.concat(cache_pokemon_types.results),
          loadingt: false
        }))
        
      }

      filterByName = () => {
        return this.state.pokemons.filter(pokemon => pokemon.name.includes(this.state.filter_name))
      } 

      onFilterChange = e => {
        let value = e.target.value
        this.setState(prevState => ({
          filter_name: value
        }))
      }
    
      

    render(){
        const {filter_name, loading, types, loadingt, selected_pokemon, pokemons} = this.state
        
        return (
          <div className="PokemonPage">
            <div className='PokemonPage_left'>
              <PokemonTypes
                types={types}
                loading={loadingt}
                filter_name={filter_name}
                onFilterChange={this.onFilterChange}
              />

              <List  
                pokemons={this.filterByName()}
                onCardClick={this.selectPokemon}
                loading={loading}
              />
            </div>
            
            <div className="PokemonPage_rigth">
              

              {!loading && 
                <BasicInfo
                  avatar={pokemons[selected_pokemon].sprites.front_default}
                  avatar="https://fakeimg.pl/96/"
                  name={pokemons[selected_pokemon].name}
                  base_experience={pokemons[selected_pokemon].base_experience}
                  weight={pokemons[selected_pokemon].weight}
                  height={pokemons[selected_pokemon].height}
                  types={pokemons[selected_pokemon].types.map(t => t.type.name)}
                />  
              }

              {!loading && 
                <Stats
                  stats={pokemons[selected_pokemon].stats}
                />
              }

              {!loading && 
                <Appearance
                  sprites={pokemons[selected_pokemon].sprites}
                />
              }


              

            </div>
            
          </div>
            
        )
    }
}