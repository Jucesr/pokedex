import React from 'react'
import {Provider} from 'react-redux';
import store from '../store/configureStore';

import PokemonPage from '../pages/pokemon/index'
import { Footer } from "./Footer";

import '../styles/Core.css'

class App extends React.Component {

  constructor(props){
    super(props);
  }

  render(){

    return (
      <Provider store={store}>
        <React.Fragment>
          <PokemonPage/> 
          <Footer/>
        </React.Fragment>
        
      </Provider>   
    )
  };
}

export default App
