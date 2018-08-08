import React from 'react'
import {Radar} from 'react-chartjs-2';

export const Stats = (props) => {
    let chart_data = {
        labels: ["speed", "special-defense", "special-attack", "defense", "attack", "hp"],
        datasets: [{
            data: [],
            backgroundColor: "rgba(220,0,0,0.5)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)"
        }]
    }
    
    props.stats.forEach(stat => {
        chart_data.datasets[0].data.push(stat.base_stat)
    })
    return (
        <div className="box">            
            <div className="box_title">
                <div className="box_margin">
                    <strong>Stats</strong>
                </div>
            </div>
            <div className="box_body">
                <div className="box_margin">
                    <Radar 
                        data={chart_data} 
                        options={{
                            responsive: true,
                            scaleShowLabels : true,
                            scale: {
                                ticks: {
                                    min: 0,
                                    max: 150
                                }
                            },
                            legend: {
                                display: false
                            }
                        }}
                        
                    />

                    
                </div>
            </div>    
        </div>
    )
}