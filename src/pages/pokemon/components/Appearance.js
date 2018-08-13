import React from 'react'
import { Box } from "./Box";
import capitalize from 'lodash/capitalize'
import { replaceAll } from "../../../utils/index";

export const Appearance = (props) => {

    return (
        <Box title="Appearance"> 
            <div className="Apperance_container">
                {Object.keys(props.sprites).map((key, index) => {

                if(props.sprites[key])
                    return (
                        <div className="Apperance_item" key={index}>
                            <div>
                                <img src={props.sprites[key]}/>
                                {/* <img src="https://fakeimg.pl/96/"/> */}
                                <p> {capitalize(replaceAll(key, '_', ' '))} </p>
                            </div> 
                                
                        </div>
                    )
                })} 
            </div>
        </Box>
    )
}