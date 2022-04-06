import { Component } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import './App.css'
import { ProductList, Product } from './Product'
import { Cart } from './Cart'
import { Category, StateContext } from './_shared'
import Header from './Header';
import { getCategories } from './Product/services/graphql'

interface State {
  categories: Category[];
  loading: boolean;
  error: string | undefined
}

export default class Navigator extends Component<{}, State> {
  state = {
    categories: [] as Category[],
    loading: false,
    error: ''
  }
  
  static contextType = StateContext
  client = this.context.apolloClient
  
  componentDidMount() {
    (async () => {
      this.setState({ loading: true })
      const result = await getCategories(this.client)
      this.setState({ loading: false, ...result })
    })();
  }

  render() {
      console.log(this.state.categories)
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
                this.state.categories.length > 0 &&
                this.state.categories.slice(1).map(category => (
                <Route 
                    path={`/${category.name}`} 
                    element={<ProductList category={category} />} 
                />
                ))
            }
            <Route path="/product/:id" element={<Product />} />
            <Route path="/cart" element={<Cart />} />
            </Routes>
        </BrowserRouter>
    )
  }
}
