import { Currency, Price } from "../types";

export const getPrice = (prices: Price[], currency: Currency) => {
    return prices.find(p => p.currency.label === currency.label) as Price
}

export const formatPrice = (price: Price) => {
    return `${price.currency.symbol}${price.amount}`
}