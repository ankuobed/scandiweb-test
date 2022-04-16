import { Component } from 'react'
import { Currency } from '../../_shared'
import chevronDown from '../../assets/images/chevron-down.svg'
import { ChevronDown, CurrencySwitcherButtonWrapper, CurrencySymbol } from './styledComponents';

interface Props {
    currency: Currency;
    open: boolean;
    onClick: () => void;
}

export default class CurrencySwitcherButton extends Component<Props> {
  render() {
    return (
        <CurrencySwitcherButtonWrapper {...this.props}>
            <CurrencySymbol>
                {this.props.currency.symbol} 
            </CurrencySymbol>
            <ChevronDown 
                src={chevronDown} 
                alt="Drop down"
                up={this.props.open}
            />
        </CurrencySwitcherButtonWrapper>
    )
  }
}
