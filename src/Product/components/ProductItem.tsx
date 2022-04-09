import { Component } from 'react'
import { 
    Flex, 
    formatPrice, 
    getPrice, 
    Product, 
    StateContext 
} from '../../_shared'
import { 
    AddToCartButtonRounded, 
    BottomSection, 
    ProductItemImage, 
    ProductItemWrapper, 
    ProductName, 
    ProductPrice 
} from './styledComponents';
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
                <ProductItemImage
                    src={this.product.gallery[0]} 
                    alt={this.product.name} 
                />
            </Link>
            
            <Flex justify="flex-end" style={{ width: '100%' }}>
                {
                    this.product.inStock && 
                    <AddToCartButtonRounded onClick={this.addToCart} />
                }
            </Flex>

            <BottomSection to={`/product/${this.product.id}`}>
                <ProductName>{this.product.name}</ProductName>
                <ProductPrice>{formatPrice(price)}</ProductPrice>
            </BottomSection>
        </ProductItemWrapper>
        )
    }
}
