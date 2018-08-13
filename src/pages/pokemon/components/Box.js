import React from 'react'

export const Box = (props) => {
    return (
        <div className="box">            
            <div className="box_title">
                <div className="box_margin">
                    <strong>{props.title}</strong>
                </div>
            </div>
            <div className="box_body">
                <div className="box_margin">
                    {props.children}
                </div>
            </div>    
        </div>
    )
}