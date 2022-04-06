import { Component } from 'react'
import { Flex, getTotal, ICartItem, Overlay, StateContext } from '../../_shared'
import CartItem from './CartItem';
import { CartDialogWrapper, CheckoutButton, ViewBagButton } from './styledComponents';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default class CartDialogBox extends Component<Props> {
  static contextType = StateContext;

  render() {
    const { cartItems, currency } = this.context.state

    return (
      <Overlay
        visible={this.props.open} 
        onClick={this.props.onClose}
      >
        <CartDialogWrapper onClick={e => e.stopPropagation()}>
          {
            cartItems.length > 0 ?
            <>
              <p><b>My Bage,</b> {cartItems.length} Item{cartItems.length > 1 && 's'}</p>

              {
                cartItems.map((cartItem: ICartItem) => 
                  <CartItem 
                    key={cartItem.product.id} 
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
