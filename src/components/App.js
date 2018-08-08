import React from 'react'
import {Provider} from 'react-redux';
import store from '../store/configureStore';

import PokemonPage from '../pages/pokemon/PokemonPage'
import '../styles/core.css'

class App extends React.Component {

  constructor(props){
    super(props);
  }

  render(){

    return (
      <Provider store={store}>
        <PokemonPage/> 
      </Provider>   
    )
  };
}

export default App
