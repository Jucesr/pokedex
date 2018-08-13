import React from 'react'
import { Box } from "./Box"
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
                fontSize: '14px',
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
            <Box title="Filter options">
                <React.Fragment> 
                    <Select 
                        styles={customStyles}
                        options={options}
                        isMulti={true}
                        isSearchable={true}
                        placeholder="By type (OR)"
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
            </Box>
        )
    }
}