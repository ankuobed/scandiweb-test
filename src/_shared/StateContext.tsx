import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { Component, createContext } from 'react'
import { Attribute, Currency, ICartItem, Product } from './types';
import { addToCartItems, isReallyEqual, reduceCartItemQty } from './utils';

interface State {
    currency: Currency;
    cartItems: ICartItem[];
}

interface SelectAttributeParams {
    attribute: Attribute;
    cartItem: ICartItem;
    index: number;
}

interface IStateContext {
    apolloClient:  ApolloClient<NormalizedCacheObject>;
    state: State;
    setCurrency: ((currency: Currency) => void) | null;
    addToCart: ((product: Product, selectedAttributes: ICartItem['selectedAttributes']) => void) | null;
    reduceCartItemQty: ((cartItem: ICartItem) => void) | null;
    selectAttribute: ((params: SelectAttributeParams) => void) | null;
}

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});

const initialState = {
    currency: { label: "USD", symbol: "$" },
    cartItems: []
}

export const StateContext = createContext<IStateContext>({
    apolloClient: client,
    state: initialState,
    setCurrency: null,
    addToCart: null,
    reduceCartItemQty: null,
    selectAttribute: null
});

export class StateProvider extends Component<{}, State> {
    state = initialState

    addToCart = (product: Product, selectedAttributes: ICartItem['selectedAttributes']) => {
        this.setState({
            cartItems: addToCartItems(product, this.state.cartItems, selectedAttributes)
        })
    }

    reduceCartItemQty = (cartItem: ICartItem) => {
        this.setState({
            cartItems: reduceCartItemQty(cartItem, this.state.cartItems)
        })
    }

    selectAttribute = ({ attribute, cartItem, index }: SelectAttributeParams) => {
        cartItem.selectedAttributes[index] = attribute

        this.setState(prevState => {
            return {
                cartItems: prevState.cartItems.reduce((acc, item) => {
                    if(
                        cartItem.product.id === item.product.id && 
                        isReallyEqual(item.selectedAttributes, cartItem.selectedAttributes)
                    ) {
                        const cartItemAlreadyExists = acc.find(cartItem => (
                            cartItem.product.id === item.product.id &&
                            isReallyEqual(cartItem.selectedAttributes, item.selectedAttributes)
                        ))

                        if (cartItemAlreadyExists) {
                            acc[acc.indexOf(cartItemAlreadyExists)] = { 
                                ...cartItemAlreadyExists,
                                quantity: item.quantity + cartItemAlreadyExists.quantity
                            }
                            return [
                                ...acc,
                            ]
                        } else {
                            return [
                                ...acc,
                                {
                                    ...item,
                                    selectedAttributes: cartItem.selectedAttributes
                                }
                            ]
                        }

                    }
                    return [...acc, item]
                }, [] as ICartItem[])
            }
        })
    }
    
    render() {
        const setCurrency = (currency: Currency) => {
            this.setState({ currency });
        }

        return (
            <StateContext.Provider value={{
                apolloClient: client,
                state: this.state, 
                setCurrency: setCurrency,
                addToCart: this.addToCart,
                reduceCartItemQty: this.reduceCartItemQty,
                selectAttribute: this.selectAttribute
            }}>
                {this.props.children}
            </StateContext.Provider>
        )
    }
}
