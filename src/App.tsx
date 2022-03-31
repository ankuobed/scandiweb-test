import { Component } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import './App.css'
import { ProductList, Product } from './Product'
import { Cart } from './Cart'
import { ThemeProvider } from 'styled-components';
import { AppolloClientProvider, constants } from './_shared'
import Header from './Header';
export default class App extends Component {
  render() {
    return (
      <AppolloClientProvider>
        <ThemeProvider theme={constants.theme}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AppolloClientProvider>
    )
  }
}
