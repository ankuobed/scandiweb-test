import { Component } from 'react'
import { 
    Currency,
    formatPrice, 
    getPrice, 
    Product, 
    StateContext 
} from '../../_shared'
import { 
    AddToCartButtonRounded, 
    AddToCartButtonWrapper, 
    BottomSection, 
    ProductItemWrapper, 
    ProductName, 
    ProductPrice, 
    TopSection
} from './styledComponents';
import ProductItemImage from './ProductItemImage';
import { connect } from 'react-redux';

interface Props {
    product: Product;
    currency: Currency;
}

class ProductItem extends Component<Props> {
    static contextType = StateContext
    
    product = this.props.product

    addToCart = () => {
        this.context.addToCart(
            this.product,
            this.product.attributes.map(attr => attr.items[0])
        )
    }
    
    render() {
       const currency = this.props.currency
       const price = getPrice(this.product.prices, currency)

        return (
        <ProductItemWrapper>
            <TopSection to={`/product/${this.product.id}`}>
                <ProductItemImage
                    src={this.product.gallery[0]} 
                    alt={this.product.name}
                    inStock={this.product.inStock}
                />
            </TopSection>
            
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

const mapStateToProps = state => {
    return {
      currency: state.currency
    }
}
  
export default connect(mapStateToProps)(ProductItem)
