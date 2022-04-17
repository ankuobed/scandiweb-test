import { Component } from 'react'
import { connect } from 'react-redux';
import { Currency, Flex, getTotal, ICartItem, isNotEmpty, Overlay } from '../../_shared'
import CartItem from './CartItem';
import { CartDialogWrapper, CheckoutButton, ViewBagButton } from './styledComponents';

interface Props {
  open: boolean;
  onClose: () => void;
  cartItems: ICartItem[];
  currency: Currency;
}

class CartDialogBox extends Component<Props> {
  render() {
    const { cartItems, currency } = this.props

    return (
      <Overlay
        visible={this.props.open} 
        onClick={this.props.onClose}
      >
        <CartDialogWrapper onClick={e => e.stopPropagation()}>
          {
            isNotEmpty(cartItems) ?
            <>
              <p><b>My Bage,</b> {cartItems.length} Item{cartItems.length > 1 && 's'}</p>

              {
                cartItems.map((cartItem: ICartItem) => 
                  <CartItem 
                    key={`${cartItem.product.id}${JSON.stringify(cartItem.selectedAttributes)}`} 
                    cartItem={cartItem}
                    variant="small"
                  />
                )
              }

              <Flex justify="space-between" my={30}>
                <b>Total</b>
                <b>{getTotal(cartItems, currency)}</b>
              </Flex>
            </> :
            <Flex justify="center" align="center">
              <p>Your cart is empty</p>
            </Flex>
          }

          <Flex justify="space-between" mt={15}>
            <ViewBagButton to="/cart" onClick={this.props.onClose}>VIEW BAG</ViewBagButton>
            <CheckoutButton>CHECK OUT</CheckoutButton>
          </Flex>
        </CartDialogWrapper>
      </Overlay>
    )
  }
}

const mapStateToProps = state => {
  return {
    currency: state.currency,
    cartItems: state.cart.cartItems
  }
}

export default connect(mapStateToProps)(CartDialogBox)