import { Component } from 'react'
import { Link } from 'react-router-dom';
import { Flex } from '../../_shared';
import { CartBadge, CartIcon } from './styledComponents'

interface Props {
  count: number;
}

export  default class CartButton extends Component<Props> {
  render() {
    return (
      <Link to="/cart">
        <Flex style={{ cursor: "pointer" }}>
          <CartIcon />
          {
            this.props.count > 0 &&
            <CartBadge>{this.props.count}</CartBadge>
          }
        </Flex>
      </Link>
    )
  }
}
