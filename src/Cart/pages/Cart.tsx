import { Component } from 'react'
import { Divider, ICartItem, StateContext } from '../../_shared'
import CartItem from '../components/CartItem'

export default class Cart extends Component {
  static contextType = StateContext

  render() {
    const { cartItems } = this.context.state

    return (
      <div>
        <h1 style={{ margin: '60px 0'}}>CART</h1>
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
