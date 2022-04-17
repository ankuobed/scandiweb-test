import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client'
import { Component, createContext } from 'react'

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

export const ApolloContext = createContext<ApolloClient<NormalizedCacheObject>>(client);

export class ApolloContextProvider extends Component {
    render() {
        return (
            <ApolloContext.Provider value={client}>
                {this.props.children}
            </ApolloContext.Provider>
        )
    }
}
