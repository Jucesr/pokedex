import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {loadState, saveState} from './localStorage'

//Middleware
import callAPI from './middleware/callAPI'
import thunk from 'redux-thunk'

//Reducers
import pokemonsReducer from './reducers/pokemons'
import typesReducer from './reducers/types'
import pokemonsSpeciesReducer from './reducers/pokemon_species'
import evolutionChainReducer from './reducers/evolution_chains'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState()

const store = createStore(
    combineReducers({
        pokemons: pokemonsReducer,
        types: typesReducer,
        pokemons_species: pokemonsSpeciesReducer,
        evolution_chains: evolutionChainReducer
    }),
    persistedState,
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(callAPI))
);

store.subscribe(() => {
    saveState(store.getState())
})

export default store

