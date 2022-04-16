import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { Component, createContext } from 'react'
import { Currency, ICartItem, Product } from './types'
import { 
    addToCartItems,
    getFromLocalStorage,
    isReallyEqual,
    reduceCartItemQty,
    saveToLocalStorage,
} from './utils';

interface State {
    currency: Currency;
    cartItems: ICartItem[];
}

interface IStateContext {
    apolloClient:  ApolloClient<NormalizedCacheObject>;
    state: State;
    setCurrency: ((currency: Currency) => void) | null;
    addToCart: ((product: Product, selectedAttributes: ICartItem['selectedAttributes']) => void) | null;
    reduceCartItemQty: ((cartItem: ICartItem) => void) | null;
}

const client = new ApolloClient({
    cache: new InMemoryCache({
        typePolicies: {
            AttributeSet: {
                keyFields: ["items"]
            }
        }
    }),
    uri: 'http://localhost:4000/',
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
    reduceCartItemQty: null
});

export class StateProvider extends Component<{}, State> {
    state = initialState

    setCurrency = (currency: Currency) => {
        this.setState({ currency });
    }

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

    componentDidMount() {
        const persistedState = getFromLocalStorage('state') || initialState
        this.setState({ ...persistedState })
    }

    componentDidUpdate(_, prevState) {
        const persistedState = getFromLocalStorage('state')
        if(!isReallyEqual(prevState?.state, persistedState)) {
            saveToLocalStorage('state', this.state)
        }
    }
    
    render() {

        return (
            <StateContext.Provider value={{
                apolloClient: client,
                state: this.state, 
                setCurrency: this.setCurrency,
                addToCart: this.addToCart,
                reduceCartItemQty: this.reduceCartItemQty,
            }}>
                {this.props.children}
            </StateContext.Provider>
        )
    }
}
