import { Component } from 'react'
import { Flex, Product } from '../../_shared'
import { 
    AddToCartButtonRounded, 
    ProductItemWrapper, 
    ProductName, 
    ProductPrice 
} from './styledComponents';
import cartImage from '../../assets/images/cart-white.svg'

interface Props {
    product: Product;
}

export default class ProductItem extends Component<Props> {
    product = this.props.product;

    render() {
        return (
        <ProductItemWrapper to={`/product/${this.product.id}`}>
            <img
                src={this.product.gallery[0]} 
                alt={this.product.name} 
                style={{ width: 330, height: 335, }}
            />
            <Flex justify="flex-end" style={{ width: '100%' }}>
                <AddToCartButtonRounded>
                    <img
                        src={cartImage}
                        alt="add to cart"
                        style={{ width: 24 }}
                    />
                </AddToCartButtonRounded>
            </Flex>
            <div style={{ textAlign: 'left', width: '100%' }}>
                <ProductName>{this.product.name}</ProductName>
                <ProductPrice>{`${this.product.prices[0].currency.symbol}${this.product.prices[0].amount}`}</ProductPrice>
            </div>
        </ProductItemWrapper>
        )
    }
}
