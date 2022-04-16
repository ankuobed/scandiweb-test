import { createStore, combineReducers } from 'redux'
import { currencyReducer } from './reducers/currencyReducer'

const rootReducer = combineReducers({
    currency: currencyReducer,
})

const store = createStore(rootReducer)

export default store