import { createStore, combineReducers } from 'redux'
import { cartReducer } from './reducers/cartReducer'
import { currencyReducer } from './reducers/currencyReducer'

const rootReducer = combineReducers({
    currency: currencyReducer,
    cart: cartReducer
})

const store = createStore(rootReducer)

export default store