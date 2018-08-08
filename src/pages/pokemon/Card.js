import React from 'react'
import PokemonStats from './PokemonStats'
import capitalize from 'lodash/capitalize'

class PokemonCard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      x: 0,
      y: 0,
      show_stats: false
    }
  }

  render(){
    const {id, name, picture, stats, onCardClick} = this.props;
    return (
      <div
        className="PokemonCard"
        onClick={() => {
          onCardClick(id);
        }}
        // onMouseLeave={() => {
        //   this.setState((prevState) => ({
        //     show_stats: false
        //   }))
        // }}
        // onMouseEnter={e => {
        //   let x = e.pageX
        //   let y = e.pageY
        //   this.setState((prevState) => ({
        //     show_stats: true,
        //     x,
        //     y
        //   }))

        // }}
      >
        <div className="PokemonCard_avatar" >
          <img src={picture}></img>
        </div>
        <div><h5 className="PokemonCard_name">{capitalize(name)}</h5></div>
        {this.state.show_stats &&
          <PokemonStats
            x={this.state.x}
            y={this.state.y}
            stats={stats}
          />}
      </div>
    )
  };
}

export default PokemonCard
