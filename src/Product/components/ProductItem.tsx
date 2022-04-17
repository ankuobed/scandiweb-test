import { Component } from 'react'
import { 
    Attribute,
    Currency,
    formatPrice, 
    getPrice, 
    Product, 
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
import { ADD_TO_CART } from '../../_shared/redux';

interface Props {
    product: Product;
    currency: Currency;
    addToCart: (product: Product, selectedAttributes: Attribute[]) => void;
}

class ProductItem extends Component<Props> {    
    product = this.props.product

    addToCart = () => {
        this.props.addToCart(
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

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (product, selectedAttributes) => 
            dispatch({ 
                type: ADD_TO_CART, 
                payload: { product, selectedAttributes } 
            }),
    }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(ProductItem)
