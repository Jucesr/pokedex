import React from 'react'
import capitalize from 'lodash/capitalize'

export const EvolutionChain = (props) => {
    return (
        <div className="box">            
            <div className="box_title">
                <div className="box_margin">
                    <strong>Evolution Chain</strong>
                </div>
            </div>
            <div className="box_body">
                <div className="box_margin">
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
                                            {!pokemon ? 
                                                <img src='../assets/loading.gif'></img>
                                            : (
                                                <React.Fragment>
                                                    <img src="https://fakeimg.pl/96/"/> {/*<img src={pokemon.picture[key]}/>  */}
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
                </div>
            </div>     
        </div>
    )
}