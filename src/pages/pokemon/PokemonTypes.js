import React from 'react'
import Select from 'react-select'

export default class PokemonTypes extends React.Component {

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

                padding: '10px 10px',
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
                            <strong>Filter by type</strong>
                        </div>
                    </div>
                    <div className="box_body">
                        <div className="box_margin">
                            {props.loading ? (
                                <img src='../assets/loading.gif'></img>
                            ):(
                                <Select 
                                    styles={customStyles}
                                    options={[{value: 'all', label: 'all'}, ...options]}
                                    isMulti={true}
                                    isSearchable={true}
                                    defaultValue={{value: 'all', label: 'all'}}
                                    // isLoading={props.loading}
                                /> 
                            )}
                        </div>
                    </div>
                    
                    
            </div>
        )
    }
}