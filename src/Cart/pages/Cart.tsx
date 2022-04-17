import { Component } from 'react'
import { connect } from 'react-redux'
import { Divider, ICartItem } from '../../_shared'
import CartItem from '../components/CartItem'
import { CartPageTitle } from '../components/styledComponents'

interface Props {
  cartItems: ICartItem[];
}

class Cart extends Component<Props> {
  render() {
    const { cartItems } = this.props

    return (
      <div>
        <CartPageTitle>CART</CartPageTitle>
        {
          cartItems.map((cartItem: ICartItem) =>  {
            const key = `${JSON.stringify(cartItem.selectedAttributes)}${cartItem.product.id}`
            return (
              <div key={key}>
                <Divider height={25} />
                <CartItem 
                  cartItem={cartItem} 
                />
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cart.cartItems
  }
}

export default connect(mapStateToProps)(Cart)
