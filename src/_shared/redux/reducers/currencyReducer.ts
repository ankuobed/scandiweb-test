import { Action, Currency } from '../../types'
import { SET_CURRENCY } from '../actions'

const initialState = { label: "USD", symbol: "$" }

export const currencyReducer = (state = initialState, action: Action<Currency>) => {
    switch(action.type) {
        case SET_CURRENCY:
            return {
                ...action.payload
            }
        default:
            return state
    }
}