import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { Component, createContext } from 'react'
import { Attribute, Currency, ICartItem, Product } from './types';
import { 
    addToCartItems, 
    getFromLocalStorage, 
    isReallyEqual, 
    reduceCartItemQty, 
    saveToLocalStorage, 
    selectCartItemAttribute 
} from './utils';

interface State {
    currency: Currency;
    cartItems: ICartItem[];
}

interface SelectedAttributeParams {
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
    selectAttribute: ((params: SelectedAttributeParams) => void) | null;
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

    selectAttribute = ({ attribute, cartItem, index }: SelectedAttributeParams) => {
        cartItem.selectedAttributes[index] = attribute

        this.setState(prevState => {
            return {
                cartItems: selectCartItemAttribute(cartItem, prevState.cartItems)
            }
        })
    }

    componentDidMount() {
        const storedCartItems = getFromLocalStorage('cartItems')
        this.setState({ cartItems: storedCartItems || [] })
    }

    componentDidUpdate(_, prevState) {
        const storedCartItems = getFromLocalStorage('cartItems')
        if(!isReallyEqual(prevState?.state?.cartItems, storedCartItems)) {
            saveToLocalStorage('cartItems', this.state.cartItems)
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
                selectAttribute: this.selectAttribute
            }}>
                {this.props.children}
            </StateContext.Provider>
        )
    }
}
