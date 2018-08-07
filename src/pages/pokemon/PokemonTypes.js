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
        return (
            <div className="PokemonTypes">
                {props.loading ? (
                    <img src='../assets/loading.gif'></img>
                ):(
                    <Select 
                        options={[...options, {value: 'all', label: 'all'}]}
                        isMulti={true}
                        isSearchable={true}
                        defaultValue={{value: 'all', label: 'all'}}
                        // isLoading={props.loading}
                    /> 
                )}    
            </div>
        )
    }
}