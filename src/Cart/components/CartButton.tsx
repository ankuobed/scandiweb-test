import { Component } from 'react'
import { Flex } from '../../_shared';
import { CartBadge, CartIcon } from './styledComponents'

interface Props {
  count: number;
}

export  default class CartButton extends Component<Props> {
  render() {
    return (
      <Flex style={{ cursor: "pointer" }}>
        <CartIcon />
        {
          this.props.count > 0 &&
          <CartBadge>{this.props.count}</CartBadge>
        }
      </Flex>
    )
  }
}
