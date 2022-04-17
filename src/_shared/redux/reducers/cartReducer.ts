import { Action, Attribute, ICartItem, Product } from "../../types"
import { addToCartItems, getFromLocalStorage, reduceCartItemQty, saveToLocalStorage } from "../../utils"
import { ADD_TO_CART, REDUCE_CART_ITEM } from "../actions"

const persistedCartItems = getFromLocalStorage('cartItems') || []

interface AddToCartParams {
    product: Product;
    selectedAttributes: Attribute[];
}

const initialState = {
    cartItems: persistedCartItems
}

export const cartReducer = (state = initialState, action: Action<AddToCartParams | ICartItem>) => {
    let newCartItems;

    switch(action.type) {
        case ADD_TO_CART:
            const { product, selectedAttributes } = action.payload
            newCartItems = addToCartItems(product, state.cartItems, selectedAttributes)
            saveToLocalStorage('cartItems', newCartItems)

            return {
                cartItems: newCartItems
            }
        case REDUCE_CART_ITEM:
            const cartItem = action.payload
            newCartItems = reduceCartItemQty(cartItem as ICartItem, state.cartItems)
            saveToLocalStorage('cartItems', newCartItems)

            return {
                cartItems: newCartItems
            }
        default:
            return state
    }
}