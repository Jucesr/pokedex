import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import pokemonsReducer from './reducer'
import {loadState, saveState} from './localStorage'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistedState = loadState()

const store = createStore(
    combineReducers({
        pokemons: pokemonsReducer
    }),
    persistedState,
    composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
    saveState(store.getState())
})

export default store

