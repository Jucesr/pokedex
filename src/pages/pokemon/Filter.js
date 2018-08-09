import React from 'react'
import Select from 'react-select'

export default class Filter extends React.Component {

    constructor(props){
        super(props)
        this.state = {}
    }

    render(){
        const {props} = this
        let options = props.types.map(type => ({
            value: type.name,
            label: type.name
        }))

        const customStyles = {
            control: styles => ({ 
                ...styles, 
                backgroundColor: '#eaeaea',

                // padding: '10px 10px',
                font_size: '16px',
                border: 'none'
            }),
            multiValueLabel: (styles, { data }) => ({
                ...styles,
                backgroundColor: 'white',
            }),
            multiValueRemove: (styles, { data }) => ({
                ...styles,
                backgroundColor: 'white',
                ':hover': {
                  backgroundColor: data.color,
                  color: 'gray',
                },
            })
          }

        return (
            <div className="box">            
                    <div className="box_title">
                        <div className="box_margin">
                            <strong>Filter options</strong>
                        </div>
                    </div>
                    <div className="box_body">
                        <div className="box_margin">
                            
                            <React.Fragment> 
                                <Select 
                                    styles={customStyles}
                                    options={options}
                                    isMulti={true}
                                    isSearchable={true}
                                    placeholder="By type"
                                    onChange={props.onTypeFilterChange}
                                    // isLoading={props.loading}
                                /> 
                                <input
                                    className="Filter_name"
                                    value={props.filter_name}
                                    onChange={props.onNameFilterChange} 
                                    placeholder="By name " 
                                    type="text"
                                />  
                            </React.Fragment>
                                
                            
                        </div>
                    </div>
                    
                    
            </div>
        )
    }
}