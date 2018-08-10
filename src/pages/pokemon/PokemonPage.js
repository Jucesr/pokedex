import React from 'react'
import { connect } from 'react-redux'
import intersection from 'lodash/intersection'

import List from './List'
import Filter from './Filter'
import {Stats} from './Stats'
import {BasicInfo} from './BasicInfo'
import {Appearance} from './Appearance'
import { EvolutionChain } from "./EvolutionChain";

import {loadPokemons, loadPokemonTypes} from '../../store/actions/pokemons'

class PokemonPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      filter_name: '',
      filter_type: [],
      selected_pokemon_id: 0
    }
  }

  componentDidMount = () =>{

    this.props.loadPokemons()
    this.props.loadPokemonTypes()
  }

  selectPokemon = (pokemon_id) => {
    this.setState(prevState => ({
      selected_pokemon_id: pokemon_id - 1 
    }))
  }

  getVisiblePokemons = () => {
    const {pokemons} = this.props
    const {filter_name, filter_type} = this.state
    let visible_pokemons;

    //Transform object to array
    const pokemon_array = Object.values(pokemons.items)

    //Get pokemons that match the filter name
    visible_pokemons = pokemon_array.filter(
      pokemon => pokemon.name.includes(filter_name)
    )

    //Get pokemons that match the filter type
    if(filter_type.length > 0){
      visible_pokemons = visible_pokemons.filter(
        pokemon => {
          let pokemon_types = pokemon.types.map(type => type.type.name)
          let result = intersection(filter_type, pokemon_types)
          return result.length > 0
        }
      )
    }
    return visible_pokemons
  } 

  onNameFilterChange = e => {
    let value = e.target.value
    this.setState(prevState => ({
      filter_name: value
    }))
  }

  onTypeFilterChange = options => {
    let value = options.map(option => option.value) 
    this.setState(prevState => ({
      filter_type: value
    }))
  }

  urlToId = (url) => {
    let aux_arr = url.split('/') 
    return aux_arr[aux_arr.length - 2] 
  }

  getEvolutionChain = (selected_pokemon) => {
    //TODO: Validate that species and evolution has been fetched before allowing the user to change pokemon
    const {pokemons, pokemon_species, evolution_chains} = this.props
    let pokemon_specie = pokemon_species.items[this.urlToId(selected_pokemon.species.url)]
    if(!pokemon_specie)
      return []
    let evolution_chain = evolution_chains.items[this.urlToId(pokemon_specie.evolution_chain.url)]
    if(!evolution_chain)
      return []
    
    let pokemon_evolution = evolution_chain.chain.map(pe => pokemons.items[pe])

    return pokemon_evolution
  }

  render(){
    const {filter_name, selected_pokemon_id} = this.state
    const {pokemons, types, loadPokemons, pokemon_species, evolution_chains} = this.props

    //Transform object to array
    const pokemon_array = Object.values(pokemons.items)
    const pokemon_species_array = Object.values(pokemon_species.items)
    const evolution_chains_array = Object.values(evolution_chains.items)

    
    const renderCondition = pokemon_array.length > 0 && types.items.length > 0 && pokemon_species_array.length > 0 && evolution_chains_array.length > 0
    

    if(renderCondition){

      const selected_pokemon = pokemon_array[selected_pokemon_id]
      const pokemon_evolution = this.getEvolutionChain(selected_pokemon)
      let pokemon_specie = pokemon_species.items[this.urlToId(selected_pokemon.species.url)]
      const description = pokemon_specie && pokemon_specie.description  

      return (
        <div className="PokemonPage">
          <div className='PokemonPage_left'>
            <Filter
              types={types.items}
              filter_name={filter_name}
              onNameFilterChange={this.onNameFilterChange}
              onTypeFilterChange={this.onTypeFilterChange}
            />

            <List  
              pokemons={this.getVisiblePokemons()}
              onCardClick={this.selectPokemon}
              loading={pokemons.isFetching}
              loadPokemons={loadPokemons}
            />
          </div>

          <div className="PokemonPage_rigth">
              <BasicInfo
                // avatar={selected_pokemon.sprites.front_default}
                avatar="https://fakeimg.pl/96/"
                name={selected_pokemon.name}
                base_experience={selected_pokemon.base_experience}
                weight={selected_pokemon.weight}
                height={selected_pokemon.height}
                types={selected_pokemon.types.map(t => t.type.name)}
                description={description}
              />  
            
              <Stats
                stats={selected_pokemon.stats}
              />

              <EvolutionChain
                onCardClick={this.selectPokemon}
                pokemons={pokemon_evolution}

              />
            
              <Appearance
                sprites={selected_pokemon.sprites}
              /> 
          </div>               
        </div>    
      )
    }else{
      return <div className="Loading"> <img src='../assets/loading.gif'></img> </div>
    }
    
  }
}

const mapStateToProps = state => ({
  pokemons: state.pokemons,
  pokemon_species: state.pokemons_species,
  evolution_chains: state.evolution_chains,
  types: state.types
})

const mapDispatchToProps = dispatch => ({
  loadPokemon: (id) => dispatch(loadPokemon(id)),
  loadPokemons: (how_many) => dispatch(loadPokemons(how_many)),
  loadPokemonTypes: () => dispatch(loadPokemonTypes())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonPage)