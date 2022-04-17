import { Component } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import './App.css'
import { ProductList, ProductDetails } from './Product'
import { Cart } from './Cart'
import { isNotEmpty, ApolloContext } from './_shared'
import Header from './Header';
import { getCategoryNames } from './Product/graphqlQueries'

interface State {
  categoryNames: string[];
}

export default class Navigator extends Component<{}, State> {
  state = {
    categoryNames: [] as string[],
  }
  
  static contextType = ApolloContext
  client = this.context
  
  componentDidMount() {
    (async () => {
      const result = await getCategoryNames(this.client)
      this.setState({ ...result })
    })();
  }

  render() {
    return (
        <BrowserRouter>
            <Header
                categoryNames={this.state.categoryNames}
            />
            <Routes>
              <Route
                path="/" 
                element={<ProductList categoryName={this.state.categoryNames[0] || ''} />} 
              />
              {
                  isNotEmpty(this.state.categoryNames) &&
                  this.state.categoryNames.slice(1).map(name => (
                  <Route
                      key={name}
                      path={name === 'all' ? '/' : `/${name}`} 
                      element={<ProductList categoryName={name} />} 
                  />
                  ))
              }
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
        </BrowserRouter>
    )
  }
}
