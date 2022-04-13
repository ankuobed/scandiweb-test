import { Component } from 'react'
import { Currency, Flex, isNotEmpty, StateContext } from '../_shared'
import { HeaderWrapper, Logo, NavItem, RightNav } from './components/styledComponents'
import { CartButton, CartDialog } from '../Cart'
import { getCurrencies } from './graphqlQueries'
import CurrencySwitcher from './components/CurrencySwitcher'
import CurrencySwitcherButton from './components/CurrencySwitcherButton'

interface State {
  currencies: Currency[];
  currencySwitcherOpen: boolean;
  cartDialogOpen: boolean;
  currentPage: string;
}

interface Props {
  categoryNames: string[]
}

export default class Header extends Component<Props, State> {
  initialRoute = `/${window.location.href.split('/').pop()}`

  state = {
    currencies: [],
    currencySwitcherOpen: false,
    cartDialogOpen: false,
    currentPage: this.initialRoute
  }

  static contextType = StateContext
  client = this.context.apolloClient

  componentDidMount() {
    (async () => {
      const currencyData = await getCurrencies(this.client);
      this.setState(prevState => ({ ...prevState, ...currencyData }))
    })();
  }

  render() {
    const currency = this.context.state.currency;

    const cartCount = this.context.state.cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity, 0)

    return (
      <HeaderWrapper justify="space-between">
        <Flex>
          {
            isNotEmpty(this.props.categoryNames) &&
            this.props.categoryNames.map(name => {
              const route = name === 'all'? '/' : `/${name}`

              return (
                <NavItem
                  key={name}
                  to={route}
                  active={this.state.currentPage === route}
                  onClick={() => this.setState({ currentPage: route })}
                  
                >
                  {name.toUpperCase()}
                </NavItem>)
            })
          }
        </Flex>
        
        <Logo />

        <RightNav justify="space-between">
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
        </RightNav>
      </HeaderWrapper>
    )
  }
}
