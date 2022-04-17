import { Component } from 'react'
import { connect } from 'react-redux';
import { Currency, formatCurrency, Overlay, ApolloContext } from '../../_shared'
import { SET_CURRENCY } from '../../_shared/redux';
import { CurrencySwitcherItem, CurrencySwitcherWrapper } from './styledComponents'

interface Props {
    currencies: Currency[];
    open: boolean;
    onClose: () => void;
    setCurrency: (currency: Currency) => void;
}

class CurrencySwitcher extends Component<Props> {
    static contextType = ApolloContext

    render() {
        return (
        <Overlay 
            visible={this.props.open} 
            variant="transparent" 
            onClick={this.props.onClose}
        >
            <CurrencySwitcherWrapper>
                {
                    this.props.currencies.map(currency => (
                        <CurrencySwitcherItem 
                            key={currency.label} 
                            onClick={() => this.props.setCurrency(currency)}
                        >
                            {formatCurrency(currency)}
                        </CurrencySwitcherItem>
                    ))
                }
            </CurrencySwitcherWrapper>
        </Overlay>
        )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrency: (currency: Currency) => 
            dispatch({ type: SET_CURRENCY, payload: currency })
    }
}

export default connect(null, mapDispatchToProps)(CurrencySwitcher)
