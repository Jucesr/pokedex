import React from 'react'
import { Box } from "./Box"

import { replaceAll } from "../../../utils/index";
import capitalize from 'lodash/capitalize'
import isEmpty from 'lodash/isEmpty'

export const Ability = (props) => {
    return (
        <Box title="Abilities"> 
            <div className="Ability_container">
                {props.abilities.map((ability, index) => (
                    <div className="Ability_item" key={index}>
                        {isEmpty(ability) ? 
                            <img className="gif_loading_item" src='../assets/loading.gif'></img>
                        : (
                            <React.Fragment>
                                <strong> {capitalize(replaceAll(ability.name,/\-/, ' '))} </strong>
                                <p>{ability.effect_entries[0].short_effect}</p>
                            </React.Fragment>
                            )
                        }  
                    </div>
                    )
                )} 
            </div> 
        </Box>
    )
}