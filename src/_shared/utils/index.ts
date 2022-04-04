import { Currency, ICartItem, Price, Product } from "../types";

export const getPrice = (prices: Price[], currency: Currency) => {
    return prices?.find(p => p.currency.label === currency.label) as Price
}

export const formatPrice = (price: Price) => {
    return `${price.currency.symbol}${price.amount}`
}

export const addToCartItems = (product: Product, cartItems: ICartItem[]) => {
    const productAlreadyExists = cartItems.find(cartItem => cartItem.product.id === product.id)

    if(productAlreadyExists) {
        return cartItems.map(cartItem => {
            if(product.id === cartItem.product.id) {
                return { 
                    ...cartItem, 
                    quantity: cartItem.quantity + 1,
                }
            }

            return cartItem
        });
    } else {
        return [
            ...cartItems,
            {
                product,
                quantity: 1
            }
        ]
    }
}

export const removeFromCartItems = (product: Product, cartItems: ICartItem[]) => {
    return cartItems.reduce((acc, cartItem) => {
        if(cartItem.product.id === product.id) {
            if(cartItem.quantity > 1) {
                return [
                    ...acc,
                    {
                        ...cartItem,
                        quantity: cartItem.quantity - 1
                    }
                ]
            } else {
                return acc
            }
        }
        
        return [...acc, cartItem]
    }, cartItems)
}