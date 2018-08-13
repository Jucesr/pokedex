import React from 'react'
import capitalize from 'lodash/capitalize'

class Card extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      x: 0,
      y: 0,
      show_stats: false
    }
  }

  render(){
    const {id, name, avatar, stats, onCardClick} = this.props;
    return (
      <div
        className="PokemonCard"
        onClick={() => {
          onCardClick(id);
        }}
      >
        <div className="PokemonCard_avatar" >
          <img src={avatar}></img>
        </div>
        <div><h5 className="PokemonCard_name">{capitalize(name)}</h5></div>
      </div>
    )
  };
}

export default Card
