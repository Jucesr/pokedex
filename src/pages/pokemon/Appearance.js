import React from 'react'
import capitalize from 'lodash/capitalize'

export const replaceAll = (target, search, replacement) => {
    return target.replace(new RegExp(search, "g"), replacement)
}

export const Appearance = (props) => {

    return (
        <div className="box">            
            <div className="box_title">
                <div className="box_margin">
                    <strong>Appearance</strong>
                </div>
            </div>
            <div className="box_body">
                <div className="box_margin">
                    <div className="Apperance_container">
                        {Object.keys(props.sprites).map((key, index) => {

                        if(props.sprites[key])
                            return (
                                <div className="Apperance_item" key={index}>
                                    <div>
                                        {/* <img src={props.sprites[key]}/> */}
                                        <img src="https://fakeimg.pl/96/"/>
                                        <p> {capitalize(replaceAll(key, '_', ' '))} </p>
                                    </div> 
                                      
                                </div>
                            )
                        })} 
                    </div>
                </div>
            </div>    
        </div>
    )
}