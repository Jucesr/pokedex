import React from 'react'

export const Footer = (props) => {
    return (
        <div className="Footer">
            <div className='Footer_margin'>
                <div className='Footer_social'>
                    <a target="_blank" href="https://twitter.com/JulioOjeda94"><img src="/assets/twitter.png"/></a>
                    <a target="_blank" href="https://www.linkedin.com/in/julio-ojeda-9640a9113/"><img src="/assets/linkedin.png"/></a>
                    
                </div>
                <div className='Footer_develop'>
                    Developed by <a target="_blank" href="https://github.com/Jucesr/pokedex"><strong>Julio Ojeda</strong></a> 
                </div>
            </div>
            

        </div>
    )
}