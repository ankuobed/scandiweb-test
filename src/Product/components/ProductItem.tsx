import { Component } from 'react'
import { constants, Flex, formatPrice, getPrice, Product, StateContext } from '../../_shared'
import { 
    AddToCartButtonRounded, 
    ProductItemWrapper, 
    ProductName, 
    ProductPrice 
} from './styledComponents';
import cartImage from '../../assets/images/cart-white.svg'
import { Link } from 'react-router-dom';

interface Props {
    product: Product;
}

export default class ProductItem extends Component<Props> {
    product = this.props.product
    
    static contextType = StateContext

    addToCart = () => {
        this.context.addToCart(
            this.product,
            this.product.attributes.map(attr => attr.items[0])
        )
    }
    
    render() {
       const currency = this.context.state.currency
       const price = getPrice(this.product.prices, currency)

        return (
        <ProductItemWrapper>
            <Link to={`/product/${this.product.id}`}>
                <img
                    src={this.product.gallery[0]} 
                    alt={this.product.name} 
                    style={{ width: 330, height: 335, }}
                />
            </Link>
            
            <Flex justify="flex-end" style={{ width: '100%' }}>
                <AddToCartButtonRounded onClick={this.addToCart}>
                    <img
                        src={cartImage}
                        alt="add to cart"
                        style={{ width: 24 }}
                    />
                </AddToCartButtonRounded>
            </Flex>

            <Link 
                to={`/product/${this.product.id}`} 
                style={{ 
                    textAlign: 'left', 
                    width: '100%', 
                    textDecoration: 'none',
                    color: constants.theme.SECONDARY
                }}
            >
                <ProductName>{this.product.name}</ProductName>
                <ProductPrice>{formatPrice(price)}</ProductPrice>
            </Link>
        </ProductItemWrapper>
        )
    }
}
