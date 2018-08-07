import React from 'react'
import PokemonCard from './PokemonCard'

export const PokemonList = (props) => {
    return (
        <div className="PokemonList">
            <div className="PokemonList_search">
                <input placeholder="Search a pokemon" type="text"/>
            </div>
            <div className="PokemonList_pokemons">
                {props.loading ? (
                    <img src='../assets/loading.gif'></img>
                ):(
                    props.pokemons.map( (pokemon, index) => (
                        <PokemonCard 
                        key={index} 
                        name={pokemon.name} 
                        picture={pokemon.sprites.front_default} //"https://fakeimg.pl/96/"  
                        stats={pokemon.stats} 
                        /> 
                        )
                    )
                )}
            </div>

            {/* {!props.loading  && <button onClick={e => {
                this.setState((prevState) => ({
                loading: true
                }))
                this.fetchPokemons(10);
            }}>Load more!(10)
            </button>} */}
        </div>
    )
}

export default PokemonList