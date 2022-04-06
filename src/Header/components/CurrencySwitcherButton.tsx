import { Component } from 'react'
import { Currency, Flex } from '../../_shared'
import chevronDown from '../../assets/images/chevron-down.svg'
import { ChevronDown, CurrencySymbol } from './styledComponents';

interface Props {
    currency: Currency;
    open: boolean;
    onClick: () => void;
}

export default class CurrencySwitcherButton extends Component<Props> {
  render() {
    return (
        <Flex style={{ cursor: 'pointer' }} { ...this.props }>
            <CurrencySymbol>
                {this.props.currency.symbol} 
            </CurrencySymbol>
            <ChevronDown 
                src={chevronDown} 
                alt="Drop down"
                up={this.props.open}
            />
        </Flex>
    )
  }
}
