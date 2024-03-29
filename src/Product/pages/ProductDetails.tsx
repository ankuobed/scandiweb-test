import { Component } from 'react'
import { 
  Attribute,
  Attributes, 
  Currency, 
  Flex, 
  formatPrice, 
  getPrice, 
  ICartItem, 
  Product, 
  ApolloContext 
} from '../../_shared';
import parseHtmlString from 'html-react-parser'
import { 
  AddToCartButton, 
  Label, 
  Price, 
  Brand, 
  Name, 
  MainImage, 
  SubImages, 
  SubImage, 
  ProductDetailsContent,
  Description
} from '../components/styledComponents';
import { getProduct } from '../graphqlQueries';
import { connect } from 'react-redux';
import { ADD_TO_CART } from '../../_shared/redux';

interface State {
  product: null | Product;
  selectedAttributes: ICartItem['selectedAttributes'],
  currentImage: string;
}

interface Props {
  currency: Currency;
  addToCart: (product: Product, selectedAttributes: Attribute[]) => void;
}

class ProductDetails extends Component<Props, State> {
  state = {
    product: null as never as Product,
    selectedAttributes: [] as ICartItem['selectedAttributes'],
    currentImage: ''
  }
  
  static contextType = ApolloContext;

  client = this.context
  productId = window.location.href.split('/').pop() as string

  componentDidMount() {
    (async () => {
      const result = await getProduct(this.client, this.productId);
      this.setState({ 
        product: result.product, 
        selectedAttributes: result.product.attributes.map(attr => attr.items[0]),
        currentImage: result.product.gallery[0]
      })
    })();
  }

  addToCart = () => {
    this.props.addToCart(this.state.product, this.state.selectedAttributes)
  }

  selectAttribute = (newAttribute, index) => {
    this.setState(prevState => {
      return {
        selectedAttributes: prevState.selectedAttributes.map((attribute, i) => {
          if(i === index) {
            return newAttribute
          } else {
            return attribute
          }
        })
      }
    })
  }

  render() {
    const price = getPrice(this.state?.product?.prices, this.props.currency)

    return (
      <div>
        {
          this.state?.product && 
          <Flex pt={50} justify="space-between" align="flex-start">
            <Flex align="flex-start">
              {
                this.state.product.gallery.length > 1 &&
                <SubImages>
                  {
                    this.state.product.gallery.map(image => (
                      <SubImage
                        key={image}
                        alt={this.state?.product?.name}
                        src={image}
                        onClick={() => this.setState({ currentImage: image })}
                      />
                    ))
                  }
                </SubImages>
              }
              <MainImage
                alt={this.state?.product?.name}
                src={this.state?.currentImage}
              />
            </Flex>
            
            <ProductDetailsContent>
              <Brand>{this.state?.product?.brand}</Brand>
              <Name>{this.state?.product?.name}</Name>

              <Attributes
                attributes={this.state.product.attributes}
                selectedAttributes={this.state.selectedAttributes}
                onSelect={this.selectAttribute}
                labels
              />

              <Label>PRICE:</Label>
              <Price>{formatPrice(price)}</Price>
  
              <AddToCartButton 
                onClick={
                  this.state.product.inStock ? 
                  this.addToCart : undefined
                }
                disabled={!this.state.product.inStock}
              >
                ADD TO CART
              </AddToCartButton>

              <Description>
                {parseHtmlString(this.state?.product?.description)}
              </Description>
           </ProductDetailsContent>
          </Flex>
        }
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
