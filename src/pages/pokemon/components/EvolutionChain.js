import React from 'react'
import { Box } from "./Box"
import capitalize from 'lodash/capitalize'
import isEmpty from 'lodash/isEmpty'

export const EvolutionChain = (props) => {
    return (
        <Box title="Evolution Chain">
            <div className="EvolutionChain_container">
                {
                    props.pokemons.length === 0 ? (
                        <div className="EvolutionChain_notfound">
                            Not available
                        </div>
                    )
                    :
                    props.pokemons.map((pokemon, index) => {
                        return (
                            <div 
                                className="EvolutionChain_item" 
                                key={index}
                                onClick={() => {
                                    props.onCardClick(pokemon.id)
                                }}
                            >
                                <div>
                                    {isEmpty(pokemon) ? 
                                        <img className="gif_loading_item" src='../assets/loading.gif'></img>
                                    : (
                                        <React.Fragment>
                                            <img src={pokemon.sprites.front_default}/> {/*<img src={pokemon.picture[key]}/>  */}
                                            <p> {capitalize(pokemon.name)} </p>
                                        </React.Fragment>
                                        )
                                    }
                                </div> 
                                    
                            </div>
                        )
                    })
                }
                
            </div>
        </Box> 
        
    )
}