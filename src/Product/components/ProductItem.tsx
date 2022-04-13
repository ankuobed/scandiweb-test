import { Component } from 'react'
import { 
    formatPrice, 
    getPrice, 
    Product, 
    StateContext 
} from '../../_shared'
import { 
    AddToCartButtonRounded, 
    AddToCartButtonWrapper, 
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
    static contextType = StateContext
    
    product = this.props.product

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
            
            <AddToCartButtonWrapper justify="flex-end">
                {
                    this.product.inStock && 
                    <AddToCartButtonRounded onClick={this.addToCart} />
                }
            </AddToCartButtonWrapper>

            <BottomSection to={`/product/${this.product.id}`}>
                <ProductName>{this.product.name}</ProductName>
                <ProductPrice>{formatPrice(price)}</ProductPrice>
            </BottomSection>
        </ProductItemWrapper>
        )
    }
}
