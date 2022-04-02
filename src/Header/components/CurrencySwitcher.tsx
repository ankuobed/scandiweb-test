import { Component } from 'react'
import { Currency, StateContext } from '../../_shared'
import { CurrencySwitcherItem, CurrencySwitcherWrapper, Overlay } from './styledComponents'

interface Props {
    currencies: Currency[];
    open: boolean;
    onClose: () => void;
}

const formatCurrency = (currency: Currency) => {
    return  `${currency.symbol} ${currency.label}`
}

export default class CurrencySwitcher extends Component<Props> {
    static contextType = StateContext
    setCurrency = this.context.setCurrency

    render() {
        return (
        <Overlay visible={this.props.open} variant="transparent" onClick={this.props.onClose}>
            <CurrencySwitcherWrapper>
                {
                    this.props.currencies.map(currency => (
                        <CurrencySwitcherItem onClick={() => this.setCurrency(currency)}>
                            {formatCurrency(currency)}
                        </CurrencySwitcherItem>
                    ))
                }
            </CurrencySwitcherWrapper>
        </Overlay>
        )
  }
}
