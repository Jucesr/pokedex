import React from 'react'
import {Radar} from 'react-chartjs-2';

class PokemonStats extends React.Component {

  constructor(props){
    super(props);

  }

  render(){
    let props = this.props
    let chart_data = {
      labels: [],
      datasets: [{
          data: [],
          fillColor: "rgba(220,0,0,0.5)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)"
      }]
    } 
    
    props.stats.forEach(stat => {
      chart_data.labels.push(stat.stat.name)
      chart_data.datasets[0].data.push(stat.base_stat)
    })

    return (
      <div
          style={{
            top: `${props.y}px`,
            left: `${props.x}px`,
            position: 'absolute',
            background: 'rgb(255, 255, 255)',
            border: 'solid 1px rgb(180, 180, 180)',
            outline: 'none',
            zIndex: '5'
          }}
          tabIndex="0"
        >
        <div className="PokemonStats_container">
          <div>Stats</div>
          <RadarChart.Radar data={chart_data}/>
          {props.stats.map((stat, index) => (
            <ul key={index}>
              <li><strong>{`${stat.stat.name}: `}</strong>{`${stat.base_stat}`}</li>
            </ul>
          ))}
        </div>
      </div>
    )
  };
}

export default PokemonStats
