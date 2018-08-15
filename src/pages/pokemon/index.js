import React from 'react'
import { connect } from 'react-redux'
import intersection from 'lodash/intersection'
import pick from 'lodash/pick'
import isEmpty from 'lodash/isEmpty'
import { urlToId } from "../../utils/index";

import {Modal} from './components/Modal';
import List from './components/List'
import Filter from './components/Filter'
import {Stats} from './components/Stats'
import {BasicInfo} from './components/BasicInfo'
import {Appearance} from './components/Appearance'
import { EvolutionChain } from "./components/EvolutionChain";
import { Ability } from "./components/Ability";

import './styles/Modal.css'
import './styles/Footer.css'
import './styles/Box.css'
import './styles/List.css'
import './styles/Card.css'
import './styles/Stats.css'
import './styles/BasicInfo.css'
import './styles/Apperance.css'
import './styles/EvolutionChain.css'
import './styles/Ability.css'
import './styles/PokemonPage.css'

import {loadPokemonFullData, loadPokemons, loadPokemonTypes, cleanError} from '../../store/actions/pokemons'

class PokemonPage extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      modal_message: undefined,
      showModal: false,
      filter_name: '',
      filter_type: [],
      selected_pokemon_id: 1
    }
  }

  componentDidMount = () =>{

    this.props.loadPokemons()
    this.props.loadPokemonTypes()
  }

  onLoadPokemonByName = (e) => {
    e.preventDefault()
    let value = e.target.pokemon_name.value
    value = value && value.toLowerCase() 
    if(value){
      this.props.loadPokemonFullData(value)
      this.setState(prevState => ({
        filter_name: value
      }))
    }else{
      console.log('error');      
    }   
    
  }

  selectPokemon = (pokemon_id) => {
    this.setState(prevState => ({
      selected_pokemon_id: pokemon_id 
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
    const filter_name = e.target.value;
    if (filter_name.match(/^[a-zA-Z]+$/) || filter_name.length == 0) {
      this.setState(() => ({ filter_name }));
    }
  }

  onTypeFilterChange = options => {
    let value = options.map(option => option.value) 
    this.setState(prevState => ({
      filter_type: value
    }))
  }

  getEvolutionChain = (selected_pokemon) => {
    //TODO: Validate that species and evolution has been fetched before allowing the user to change pokemon
    const {pokemons, pokemon_species, evolution_chains} = this.props
    if(!selected_pokemon)
      return []
    let pokemon_specie = pokemon_species.items[urlToId(selected_pokemon.species.url)]
    if(!pokemon_specie)
      return []
    let evolution_chain = evolution_chains.items[urlToId(pokemon_specie.evolution_chain.url)]
    if(!evolution_chain)
      return []
    
    let pokemon_evolution = evolution_chain.chain.map(pe => pick(pokemons.items[pe], 'name', 'sprites', 'id'))
    return pokemon_evolution
  }

  render(){
    const {filter_name, selected_pokemon_id} = this.state
    const {pokemons, types, loadPokemons, pokemon_species, evolution_chains, abilities, cleanError} = this.props
    
    const renderCondition = 
      !isEmpty(pokemons.items) && 
      !isEmpty(pokemon_species.items) && 
      !isEmpty(evolution_chains.items) && 
      !isEmpty(abilities.items)
    

    if(renderCondition){

      const selected_pokemon = pokemons.items[selected_pokemon_id]
      let pokemon_specie = pokemon_species.items[urlToId(selected_pokemon.species.url)]
      const description = pokemon_specie && pokemon_specie.description 
      const pokemon_evolution = this.getEvolutionChain(selected_pokemon)
      let pokemon_abilities = selected_pokemon.abilities.map(ab => abilities.items[urlToId(ab.ability.url)])

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
              loadPokemonByName={this.onLoadPokemonByName}
            />
          </div>

          <div className="PokemonPage_rigth">
              <BasicInfo
                avatar={selected_pokemon.sprites.front_default}
                // avatar="https://fakeimg.pl/96/"
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

              <Ability
                abilities={pokemon_abilities}
              />

              <EvolutionChain
                onCardClick={this.selectPokemon}
                pokemons={pokemon_evolution}

              />
            
              <Appearance
                sprites={selected_pokemon.sprites}
              /> 
          </div> 
          
          <Modal
            isOpen={!!pokemons.error}
            category={'error'}
            title={pokemons.error || ''}
            closeModal={() => {
              cleanError()
              this.setState(prevState => ({
                filter_name: ''
              }))
            }}
          />              
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
  abilities: state.abilities,
  types: state.types
})

const mapDispatchToProps = dispatch => ({
  loadPokemon: (id) => dispatch(loadPokemon(id)),
  loadPokemons: (how_many) => dispatch(loadPokemons(how_many)),
  loadPokemonTypes: () => dispatch(loadPokemonTypes()),
  loadPokemonFullData: (id) => dispatch(loadPokemonFullData(id)),
  cleanError: () => dispatch(cleanError())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonPage)