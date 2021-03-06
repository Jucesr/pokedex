import React from 'react'
import Card from './Card'

export default class List extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            name: ''
        }
    }

    onNameChange = e => {

        const name = e.target.value;

        if (name.match(/^[a-zA-Z]+$/) || name.length == 0) {
        this.setState(() => ({ name }));
        }
    }

    render(){
        const {props} = this
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
                            onChange={this.onNameChange}
                            value={this.state.name}
                            name="pokemon_name" 
                            placeholder="Load a pokemon by name!" 
                            type="text"
                        />
                        <button> Find </button>
                    </form>
                        
                    </div>
                </div>
                <div className='List'>
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
                                    onCardClick={e => {
                                        props.onCardClick(e)
                                    }}
                                /> 
                                )
                            )
                        }
                        {props.loading && 
                            <img className="gif_loading_item" src='../assets/loading.gif'></img>
                        }
                    </div>  
                </div>  
                
    
                {!props.loading  && 
                    <div className="List_load">
                        <button 
                            className="List_load_button" 
                            onClick={e => {
                                props.loadPokemons(5);
                            }}
                        >Load more!
                        </button>
                    </div>
                }
            </div>
        )
    }
}
