import React from 'react'
import Card from './Card'

export const PokemonList = (props) => {
    return (
        <div className="PokemonList">
            <div className="PokemonList_search">
                <input
                    value={props.filter_name}
                    onChange={props.onFilterChange} 
                    placeholder="Search a pokemon" 
                    type="text"
                />
            </div>
            <div className="PokemonList_pokemons">
                {props.loading ? (
                    <img src='../assets/loading.gif'></img>
                ):(
                    props.pokemons.map( (pokemon, index) => (
                        <Card 
                            key={index}
                            id={pokemon.id} 
                            name={pokemon.name} 
                            //picture="https://fakeimg.pl/96/"
                            picture={pokemon.sprites.front_default}
                            stats={pokemon.stats} 
                            onCardClick={props.onCardClick}
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