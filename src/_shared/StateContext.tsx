import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { Component, createContext } from 'react'
import { Currency, ICartItem, Product } from './types';
import { addToCartItems, removeFromCartItems } from './utils';

interface State {
    currency: Currency;
    cartItems: ICartItem[];
}

interface IStateContext {
    apolloClient:  ApolloClient<NormalizedCacheObject>;
    state: State;
    setCurrency: ((currency: Currency) => void) | null;
    addToCart: ((product: Product) => void) | null;
    removeFromCart: ((product: Product) => void) | null;
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
    removeFromCart: null,
});


export class StateProvider extends Component<{}, State> {
    state = initialState

    addToCart = (product: Product) => {
        this.setState({
            cartItems: addToCartItems(product, this.state.cartItems)
        })
    }

    removeFromCart = (product: Product) => {
        this.setState({
            cartItems: removeFromCartItems(product, this.state.cartItems)
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
                removeFromCart: this.removeFromCart
            }}>
                {this.props.children}
            </StateContext.Provider>
        )
    }
}
