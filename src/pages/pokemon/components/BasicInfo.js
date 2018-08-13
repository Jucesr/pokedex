import React from 'react'
import { Box } from "./Box"
import capitalize from 'lodash/capitalize'

export const BasicInfo = (props) => {
    return (
        <Box title="Basic Information">
            <section className="BasicInfo_container">
                <section className="BasicInfo_box01"> 
                    <div className="BasicInfo_name"> 
                        <div> <img src={props.avatar} /> </div>
                        <div>
                            <h2> {capitalize(props.name)} </h2>
                            <h3> {props.types.join(', ')} </h3> 
                        </div> 
                        
                    </div>
                    <div>
                        <table className="BasicInfo_stat_table">
                            <tbody>  
                                <tr>
                                    <td >Experience </td>
                                    <td>{props.base_experience} xp</td>
                                </tr>
                                <tr>
                                    <td >Weight </td>
                                    <td>{props.weight} lbs</td>
                                </tr>
                                <tr>
                                    <td >Height </td>
                                    <td>{props.height} "</td>
                                </tr>
                            </tbody> 
                        </table>
                    </div>
                </section>
                {props.description && <p>
                    {props.description}
                </p>}
                
                
            </section> 
        </Box>
        
    )
}