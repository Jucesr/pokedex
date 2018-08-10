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
            <div className="List_pokemons">
                {
                    props.pokemons.map( (pokemon, index) => (
                        <Card 
                            key={index}
                            id={pokemon.id} 
                            name={pokemon.name} 
                            picture="https://fakeimg.pl/96/"
                            // picture={pokemon.sprites.front_default}
                            stats={pokemon.stats} 
                            onCardClick={props.onCardClick}
                        /> 
                        )
                    )
                }
                {props.loading && 
                    <img src='../assets/loading.gif'></img>
                }
            </div>

            {!props.loading  && <button onClick={e => {
                props.loadPokemons(5);
            }}>Load more!(5)
            </button>}
        </div>
    )
}

export default List