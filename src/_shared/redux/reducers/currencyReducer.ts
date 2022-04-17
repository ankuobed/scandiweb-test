import { Action, Currency } from '../../types'
import { getFromLocalStorage, saveToLocalStorage } from '../../utils'
import { SET_CURRENCY } from '../actions'

const persistedCurrency = getFromLocalStorage('currency')

const initialState = persistedCurrency || { label: "USD", symbol: "$" }

export const currencyReducer = (state = initialState, action: Action<Currency>) => {
    switch(action.type) {
        case SET_CURRENCY:
            saveToLocalStorage('currency', action.payload)
            return {
                ...action.payload
            }
        default:
            return state
    }
}