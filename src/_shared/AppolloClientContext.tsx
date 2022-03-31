import { Component, createContext } from 'react'
import {
  ApolloClient,
  InMemoryCache, 
} from "@apollo/client"

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache()
});

export const AppolloClientContext = createContext<typeof client | null>(null);

export class AppolloClientProvider extends Component {
  render() {
    return (
      <AppolloClientContext.Provider value={client}>
        {this.props.children}
      </AppolloClientContext.Provider>
    )
  }
}
