import { Currency, ICartItem, Price, Product } from "./types";

export const getPrice = (prices: Price[], currency: Currency) => {
    return prices?.find(p => p.currency.label === currency.label) as Price
}

export const formatPrice = (price: Price) => {
    return `${price.currency.symbol}${price.amount}`
}

export const isReallyEqual = (x, y) => {
    return JSON.stringify(x) === JSON.stringify(y)
}

export const addToCartItems = (product: Product, cartItems: ICartItem[], selectedAttributes: ICartItem['selectedAttributes']) => {
    const productAlreadyExists = cartItems.find(cartItem => (
        cartItem.product.id === product.id &&
        isReallyEqual(cartItem.selectedAttributes, selectedAttributes)
    ))

    if(productAlreadyExists) {
        return cartItems.map(cartItem => {
            if(product.id === cartItem.product.id && isReallyEqual(cartItem.selectedAttributes, selectedAttributes)) {
                return { 
                    ...cartItem, 
                    quantity: cartItem.quantity + 1,
                    selectedAttributes
                }
            }

            return cartItem
        });
    } else {
        return [
            ...cartItems,
            {
                product,
                quantity: 1,
                selectedAttributes
            }
        ]
    }
}

export const reduceCartItemQty = (cartItem: ICartItem, cartItems: ICartItem[]) => {
    return cartItems.reduce((acc, item) => {
        if(
            item.product.id === cartItem.product.id && 
            isReallyEqual(item.selectedAttributes, cartItem.selectedAttributes)
        ) {
            if(cartItem.quantity > 1) {
                return [
                    ...acc,
                    {
                        ...item,
                        quantity: item.quantity - 1
                    }
                ]
            } else {
                return acc
            }
        } else {
            return [...acc, item]
        }
        
    }, [] as ICartItem[])
}

export const getTotal = (cartItems: ICartItem[], currency: Currency) => {
    const total = cartItems.reduce((acc, cartItem) => {
        const { quantity, product: { prices } } = cartItem
        const price = getPrice(prices, currency)

        return acc + (quantity * price.amount)
    }, 0)

    return `${currency.symbol}${total.toFixed(2)}`
}

export const capitalize = (text: string) => {
    return text?.charAt(0)?.toUpperCase() + text?.slice(1)
}

export const isNotEmpty = (array: Array<any>) => array.length > 0

export const formatCurrency = (currency: Currency) => {
    return  `${currency.symbol} ${currency.label}`
}