import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {loadState, saveState} from './localStorage'

//Middleware
import callAPI from './middleware/callAPI'
import thunk from 'redux-thunk'

//Reducers
import pokemonsReducer from './reducers/pokemons'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState()

const store = createStore(
    combineReducers({
        pokemons: pokemonsReducer
    }),
    persistedState,
    composeEnhancers(applyMiddleware(thunk), applyMiddleware(callAPI))
);

store.subscribe(() => {
    saveState(store.getState())
})

export default store

