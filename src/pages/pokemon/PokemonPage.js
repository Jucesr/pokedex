import React from 'react'
import { connect } from 'react-redux'
import intersection from 'lodash/intersection'

import List from './List'
import Filter from './Filter'
import {Stats} from './Stats'
import {BasicInfo} from './BasicInfo'
import {Appearance} from './Appearance'

import {loadPokemon, loadPokemonTypes} from '../../store/actions/pokemons'

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
    for (let index = 0; index < 10; index++) {
      this.props.loadPokemon(index, index * 1000)
      
    }
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

  render(){
    const {filter_name, selected_pokemon_id} = this.state
    const {pokemons, types} = this.props

    //Transform object to array
    const pokemon_array = Object.values(pokemons.items)

    const selected_pokemon = pokemon_array[selected_pokemon_id]
    const renderCondition = pokemon_array.length > 0 && types.items.length > 0
    
    if(renderCondition){
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
              />  
            
              <Stats
                stats={selected_pokemon.stats}
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
  types: state.types
})

const mapDispatchToProps = dispatch => ({
  loadPokemon: (id, time) => dispatch(loadPokemon(id, time)),
  loadPokemonTypes: () => dispatch(loadPokemonTypes())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonPage)