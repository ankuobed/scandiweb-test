import { Component } from 'react'
import { CartBadge, CartButtonWrapper, CartIcon } from './styledComponents'

interface Props {
  count: number;
  onClick: () => void;
}

export  default class CartButton extends Component<Props> {
  render() {
    return (
      <CartButtonWrapper onClick={this.props.onClick}>
        <CartIcon />
        {
          this.props.count > 0 &&
          <CartBadge>
            {this.props.count}
          </CartBadge>
        }
      </CartButtonWrapper>
    )
  }
}
