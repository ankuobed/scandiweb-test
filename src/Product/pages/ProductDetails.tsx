import { Component } from 'react'
import { 
  Attributes, 
  Flex, 
  formatPrice, 
  getPrice, 
  ICartItem, 
  Product, 
  StateContext 
} from '../../_shared';
import Description from '../components/Description';
import { 
  AddToCartButton, 
  Label, 
  Price, 
  Brand, 
  Name, 
  MainImage, 
  SubImages, 
  SubImage, 
  ProductDetailsContent
} from '../components/styledComponents';
import { getProduct } from '../graphqlQueries';

interface State {
  product: null | Product;
  selectedAttributes: ICartItem['selectedAttributes'],
  currentImage: string;
}

export default class ProductDetails extends Component<{}, State> {
  state = {
    product: null as never as Product,
    selectedAttributes: [] as ICartItem['selectedAttributes'],
    currentImage: ''
  }
  
  static contextType = StateContext;

  client = this.context.apolloClient
  productId = window.location.href.split('/').pop() as string

  componentDidMount() {
    (async () => {
      const result = await getProduct(this.client, this.productId);
      this.setState({ 
        ...result, 
        selectedAttributes: result.product.attributes.map(attr => attr.items[0]),
        currentImage: result.product.gallery[0]
      })
    })();
  }

  addToCart = () => {
    this.context.addToCart(this.state.product, this.state.selectedAttributes)
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
    const price = getPrice(this.state?.product?.prices, this.context.state.currency)

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

              <Description html={this.state?.product?.description} />
           </ProductDetailsContent>
          </Flex>
        }
      </div>
    )
  }
}
