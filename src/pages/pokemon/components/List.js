import React from 'react'
import Card from './Card'

export const List = (props) => {
    return (
        <div className="box">
            <div className="box_title">
                <div className="box_margin">
                    <strong>Pokemon list</strong>               
                </div>
            </div>
            <div>
                <div className="box_margin">
                <form onSubmit={props.loadPokemonByName} className='List_load_pokemon'>
                    <input
                        //value={props.filter_name}
                        //onChange={props.onNameFilterChange}
                        name="pokemon_name" 
                        placeholder="Load a pokemon by name!" 
                        type="text"
                    />
                    <button> Find </button>
                </form>
                    
                </div>
            </div>  
            <div className="List_pokemons">
                {
                    props.pokemons.map( (pokemon, index) => (
                        <Card 
                            key={index}
                            id={pokemon.id} 
                            name={pokemon.name} 
                            // picture="https://fakeimg.pl/96/"
                            avatar={pokemon.sprites.front_default}
                            stats={pokemon.stats} 
                            onCardClick={props.onCardClick}
                        /> 
                        )
                    )
                }
                {props.loading && 
                    <img className="gif_loading_item" src='../assets/loading.gif'></img>
                }
            </div>

            {!props.loading  && 
                //<div className="box_margin">
                    <button 
                        className="List_load_button" 
                        onClick={e => {
                            props.loadPokemons(5);
                        }}
                    >Load more!
                    </button>
                //</div>
            }
        </div>
    )
}

export default List