import { Component } from 'react'
import { Flex } from '../_shared'
import { NavItem } from './components/styledComponents'
import logo from '../assets/images/logo.svg'
import chevronDown from '../assets/images/chevron-down.svg'
import { CartButton } from '../Cart'

export default class Header extends Component {
  render() {
    return (
      <Flex justify="space-between" style={{ padding: 10 }}>
        <Flex>
          <NavItem active >WOMEN</NavItem>
          <NavItem>MEN</NavItem>
          <NavItem>KIDS</NavItem>
        </Flex>
        
        <img src={logo} alt="Logo" style={{ width: 32, height: 30 }} />

        <Flex style={{ width: 75 }} justify="space-between">
          <Flex><span style={{ fontSize: 19, marginRight: 5 }}>$</span> <img src={chevronDown} alt="Drop down" style={{ width: 10 }} /></Flex>
          <CartButton count={0} />
        </Flex>
      </Flex>
    )
  }
}
