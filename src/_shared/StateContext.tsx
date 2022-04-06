import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { Component, createContext } from 'react'
import { Attribute, Currency, ICartItem, Product } from './types';
import { addToCartItems, removeFromCartItems } from './utils';

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
    removeFromCart: ((product: Product) => void) | null;
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
    removeFromCart: null,
    selectAttribute: null
});

export class StateProvider extends Component<{}, State> {
    state = initialState

    addToCart = (product: Product, selectedAttributes: ICartItem['selectedAttributes']) => {
        this.setState({
            cartItems: addToCartItems(product, this.state.cartItems, selectedAttributes)
        })
    }

    removeFromCart = (product: Product) => {
        this.setState({
            cartItems: removeFromCartItems(product, this.state.cartItems)
        })
    }

    selectAttribute = ({ attribute, cartItem, index }: SelectAttributeParams) => {
        this.setState(prevState => {
            cartItem.selectedAttributes[index] = attribute

            return {
                cartItems: prevState.cartItems.map(c => {
                    if(cartItem.product.id === c.product.id) {
                        return {
                            ...c,
                            selectedAttributes: cartItem.selectedAttributes
                        }
                    }

                    return c;
                })
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
                removeFromCart: this.removeFromCart,
                selectAttribute: this.selectAttribute
            }}>
                {this.props.children}
            </StateContext.Provider>
        )
    }
}
