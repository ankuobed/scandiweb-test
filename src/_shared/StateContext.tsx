import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { Component, createContext } from 'react'
import { Currency } from './types';

interface State {
    currency: Currency;
    cart: any[];
}

interface IStateContext {
    apolloClient:  ApolloClient<NormalizedCacheObject>;
    state: State;
    setCurrency: ((currency: Currency) => void) | null;
}

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
});

const initialState = {
    currency: { label: "USD", symbol: "$" },
    cart: []
}

export const StateContext = createContext<IStateContext>({
    apolloClient: client,
    state: initialState,
    setCurrency: null
});


export class StateProvider extends Component<{}, State> {
    state = initialState
    
    render() {
        const setCurrency = (currency: Currency) => {
            this.setState({ currency });
        }

        return (
            <StateContext.Provider value={{
                apolloClient: client,
                state: this.state, 
                setCurrency: setCurrency 
            }}>
                {this.props.children}
            </StateContext.Provider>
        )
    }
}
