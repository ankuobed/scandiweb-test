import { Component } from 'react'
import { Flex, formatPrice, getPrice, Product, StateContext } from '../../_shared'
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
    product = this.props.product
    
    static contextType = StateContext
    currency = this.context.state.currency
    price = getPrice(this.product.prices, this.currency)

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
                <ProductPrice>{formatPrice(this.price)}</ProductPrice>
            </div>
        </ProductItemWrapper>
        )
    }
}
