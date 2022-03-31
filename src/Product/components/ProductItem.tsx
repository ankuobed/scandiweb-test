import { Component } from 'react'
import { Product } from '../../_shared'
import { ProductItemWrapper, ProductName, ProductPrice } from './styledComponents';

interface Props {
    product: Product;
}

export default class ProductItem extends Component<Props> {
    product = this.props.product;

    render() {
        return (
        <ProductItemWrapper>
            <img
                src={this.product.gallery[0]} 
                alt={this.product.name} 
                style={{ width: 330, height: 335, }}
            />
            <div style={{ textAlign: 'left', width: '100%' }}>
                <ProductName>{this.product.name}</ProductName>
                <ProductPrice>{`${this.product.prices[0].currency.symbol}${this.product.prices[0].amount}`}</ProductPrice>
            </div>
        </ProductItemWrapper>
        )
    }
}
