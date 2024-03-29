import { Component } from 'react'
import { Currency, Flex, ICartItem, isNotEmpty, ApolloContext } from '../_shared'
import { HeaderWrapper, Logo, NavItem, RightNav } from './components/styledComponents'
import { CartButton, CartDialog } from '../Cart'
import { getCurrencies } from './graphqlQueries'
import CurrencySwitcher from './components/CurrencySwitcher'
import CurrencySwitcherButton from './components/CurrencySwitcherButton'
import { connect } from 'react-redux'

interface State {
  currencies: Currency[];
  currencySwitcherOpen: boolean;
  cartDialogOpen: boolean;
  currentPage: string;
}

interface Props {
  categoryNames: string[];
  currency: Currency;
  cartItems: ICartItem[];
}

class Header extends Component<Props, State> {
  initialRoute = `/${window.location.href.split('/').pop()}`

  state = {
    currencies: [],
    currencySwitcherOpen: false,
    cartDialogOpen: false,
    currentPage: this.initialRoute
  }

  static contextType = ApolloContext
  client = this.context

  componentDidMount() {
    (async () => {
      const currencyData = await getCurrencies(this.client);
      this.setState(prevState => ({ ...prevState, ...currencyData }))
    })();
  }

  render() {
    const currency = this.props.currency

    const cartCount = this.props.cartItems.reduce(
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

const mapStateToProps = state => {
  return {
    currency: state.currency,
    cartItems: state.cart.cartItems
  }
}

export default connect(mapStateToProps)(Header)
