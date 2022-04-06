import { Component } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import './App.css'
import { ProductList, ProductDetails } from './Product'
import { Cart } from './Cart'
import { Category, isNotEmpty, StateContext } from './_shared'
import Header from './Header';
import { getCategories } from './Product/graphqlQueries'

interface State {
  categories: Category[];
}

export default class Navigator extends Component<{}, State> {
  state = {
    categories: [] as Category[],
  }
  
  static contextType = StateContext
  client = this.context.apolloClient
  
  componentDidMount() {
    (async () => {
      const result = await getCategories(this.client)
      this.setState({ ...result })
    })();
  }

  render() {
    return (
        <BrowserRouter>
            <Header
                categoryNames={this.state.categories.map(c => c.name)}
            />
            <Routes>
            <Route 
                path="/" 
                element={<ProductList category={this.state.categories[0]} />} 
            />
            {
                isNotEmpty(this.state.categories) &&
                this.state.categories.slice(1).map(category => (
                <Route 
                    path={`/${category.name}`} 
                    element={<ProductList category={category} />} 
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
