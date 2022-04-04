import { Component } from 'react'
import { Currency, Flex, StateContext } from '../_shared'
import { NavItem } from './components/styledComponents'
import logo from '../assets/images/logo.svg'
import { CartButton, CartDialog } from '../Cart'
import { getCurrencies } from './services/graphql'
import CurrencySwitcher from './components/CurrencySwitcher'
import CurrencySwitcherButton from './components/CurrencySwitcherButton'

interface State {
  currencies: Currency[];
  currencySwitcherOpen: boolean;
  cartDialogOpen: boolean;
}

export default class Header extends Component<{}, State> {
  state = {
    currencies: [],
    currencySwitcherOpen: false,
    cartDialogOpen: false
  }

  static contextType = StateContext
  client = this.context.apolloClient

  componentDidMount() {
    (async () => {
      const result = await getCurrencies(this.client);
      this.setState(prevState => ({ ...prevState, ...result }))
    })();
  }

  render() {
    const currency = this.context.state.currency;
    const cartCount = this.context.state.cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0)

    return (
      <Flex justify="space-between" style={{ padding: 10 }}>
        <Flex>
          <NavItem active >WOMEN</NavItem>
          <NavItem>MEN</NavItem>
          <NavItem>KIDS</NavItem>
        </Flex>
        
        <img src={logo} alt="Logo" style={{ width: 32, height: 30 }} />

        <Flex style={{ width: 75 }} justify="space-between">
          <>
            <CurrencySwitcherButton 
              onClick={() => {
                this.setState({ currencySwitcherOpen: true })
                this.setState({  cartDialogOpen: false })
              }}
              currency={currency}
              open={this.state.currencySwitcherOpen}
            />
            <CurrencySwitcher
              open={this.state.currencySwitcherOpen}
              currencies={this.state.currencies}
              onClose={() => this.setState({ currencySwitcherOpen: false })}
            />
          </>
          <>
            <CartButton 
              count={cartCount}
              onClick={() => {
                this.setState({  cartDialogOpen: true })
                this.setState({ currencySwitcherOpen: false })
              }}
            />
            <CartDialog 
              open={this.state.cartDialogOpen}
              onClose={() => this.setState({  cartDialogOpen: false })}
            />
          </>
        </Flex>
      </Flex>
    )
  }
}
