import { Component } from 'react'
import { Divider, ICartItem, StateContext } from '../../_shared'
import CartItem from '../components/CartItem'
import { CartPageTitle } from '../components/styledComponents'

export default class Cart extends Component {
  static contextType = StateContext

  render() {
    const { cartItems } = this.context.state

    return (
      <div>
        <CartPageTitle>CART</CartPageTitle>
        {
          cartItems.map((cartItem: ICartItem) => 
            <>
              <Divider height={25} />
              <CartItem 
                key={cartItem.product.id} 
                cartItem={cartItem} 
              />
            </>
          )
        }
      </div>
    )
  }
}
