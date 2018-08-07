import React from 'react'
import PokemonList from './PokemonList'
import PokemonTypes from './PokemonTypes'
import cache_pokemon_types from '../../cachedata/types'
import cache_pokemons from '../../cachedata/pokemons_min'

export default class PokemonPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
          pokemons: [],
          types: [],
          loading: true,
          loadingt: true
        }
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
    
      componentDidMount = () =>{
    
        this.fetchPokemons(50)
        this.fetchTypes()
      }

    render(){
        const {props} = this
        return (
          <div className="PokemonPage">
            <PokemonList
              pokemons={this.state.pokemons}
              loading={this.state.loading}
            />
            <PokemonTypes
              types={this.state.types}
              loading={this.state.loadingt}
            />
          </div>
            
        )
    }
}