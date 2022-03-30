import { Component } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import { ProductListPage, ProductPage } from './Product'
import { CartPage } from './Cart'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
