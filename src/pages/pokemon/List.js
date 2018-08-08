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
                {props.loading ? (
                    <img src='../assets/loading.gif'></img>
                ):(
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

export default List