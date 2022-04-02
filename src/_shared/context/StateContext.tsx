import { Component, createContext } from 'react'
import { Currency } from '../types';

interface State {
    currency: Currency;
    cart: any[];
}

interface IStateContext {
    state: State;
    setCurrency: (currency: Currency) => void;
}

const initialState = {
    currency: { label: "USD", symbol: "$" },
    cart: []
}

export const StateContext = createContext<IStateContext>({ state: initialState, setCurrency: () => null });


export class StateContextProvider extends Component<{}, State> {
    state = initialState

    setCurrency(currency: Currency) {
        this.setState({ currency });
    }

    render() {
        return (
            <StateContext.Provider value={{ 
                state: this.state, 
                setCurrency: this.setCurrency 
            }}>
                {this.props.children}
            </StateContext.Provider>
        )
    }
}
