import React from 'react'
import { connect } from 'react-redux'

import List from './List'
import Filter from './Filter'
import {Stats} from './Stats'
import {BasicInfo} from './BasicInfo'
import {Appearance} from './Appearance'

import {loadPokemons} from '../../store/actions/pokemons'

class PokemonPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
          filter_name: '',
          selected_pokemon_id: 0,
          types: [],
          loadingt: true
        }
      }

      componentDidMount = () =>{
        
        this.props.loadPokemons()
        
      }

      selectPokemon = (pokemon_id) => {
        this.setState(prevState => ({
          selected_pokemon_id: pokemon_id - 1 
        }))
      }

      filterByName = () => {
        const {pokemons} = this.props
        return pokemons.content.filter(pokemon => pokemon.name.includes(this.state.filter_name))
      } 

      onFilterChange = e => {
        let value = e.target.value
        this.setState(prevState => ({
          filter_name: value
        }))
      }
    
      

    render(){
        const {filter_name, types, loadingt, selected_pokemon_id} = this.state
        const {pokemons} = this.props

        const selected_pokemon = pokemons.content[selected_pokemon_id]
        const renderCondition = pokemons.content.length > 0 && !pokemons.isFetching
        
        if(renderCondition){
          return (
            <div className="PokemonPage">
              <div className='PokemonPage_left'>
                <Filter
                  types={types}
                  filter_name={filter_name}
                  onFilterChange={this.onFilterChange}
                />
  
                <List  
                  pokemons={this.filterByName()}
                  onCardClick={this.selectPokemon}
                  loading={pokemons.isFetching}
                />
              </div>
              
              <div className="PokemonPage_rigth">
                
  
                {renderCondition && 
                  <BasicInfo
                    // avatar={selected_pokemon.sprites.front_default}
                    avatar="https://fakeimg.pl/96/"
                    name={selected_pokemon.name}
                    base_experience={selected_pokemon.base_experience}
                    weight={selected_pokemon.weight}
                    height={selected_pokemon.height}
                    types={selected_pokemon.types.map(t => t.type.name)}
                  />  
                }
  
                {renderCondition && 
                  <Stats
                    stats={selected_pokemon.stats}
                  />
                }
  
                {renderCondition && 
                  <Appearance
                    sprites={selected_pokemon.sprites}
                  />
                }
  
  
                
  
              </div>
              
            </div>
              
          )
        }else{
          return <div className="Loading"> <img src='../assets/loading.gif'></img> </div>
        }
        
    }
}

const mapStateToProps = state => ({
  pokemons: state.pokemons
})

const mapDispatchToProps = dispatch => ({
  loadPokemons: () => dispatch(loadPokemons())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PokemonPage)