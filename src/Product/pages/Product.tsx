import { Component } from 'react'
import { Attributes, Flex, formatPrice, getPrice, ICartItem, Product, StateContext } from '../../_shared';
import { AddToCartButton, Label, Description, Price, Brand, Name, MainImage, SubImages, SubImage } from '../components/styledComponents';
import { getProduct } from '../services/graphql';

interface State {
  loading: boolean;
  error: string | undefined;
  product: null | Product;
  selectedAttributes: ICartItem['selectedAttributes']
}

export default class ProductPage extends Component<{}, State> {
  state = {
    loading: false,
    error: '',
    product: null as never as Product,
    selectedAttributes: [] as ICartItem['selectedAttributes']
  }

  static contextType = StateContext;

  client = this.context.apolloClient
  id = window.location.href.split('/').pop() as string

  componentDidMount() {
    (async () => {
      this.setState({ loading: true })
      const result = await getProduct(this.client, this.id);
      this.setState({ 
        loading: false,
        ...result, 
        selectedAttributes: result.product.attributes.map(attr => attr.items[0])
      })
    })();
  }

  addToCart = () => {
    this.context.addToCart(this.state.product, this.state.selectedAttributes)
  }

  selectAttribute = (attribute, index) => {
    this.setState(prevState => {
      prevState.selectedAttributes[index] = attribute
      return {
        selectedAttributes: prevState.selectedAttributes
      }
    })
  }

  render() {
    const price = getPrice(this.state?.product?.prices, this.context.state.currency)

    return (
      <div>
        {
          this.state?.product && 
          <Flex style={{ paddingTop: 50 }} justify="space-between" align="flex-start">
            <Flex align="flex-start">
              {
                this.state.product.gallery.length > 1 &&
                <SubImages>
                  {
                    this.state.product.gallery.slice(1).map(image => (
                      <SubImage
                        alt={this.state?.product?.name}
                        src={image}
                      />
                    ))
                  }
                </SubImages>
              }
              <MainImage
                alt={this.state?.product?.name}
                src={this.state?.product?.gallery[0]}
              />
            </Flex>
            
            <div style={{ width: '40%' }}>
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
  
              <AddToCartButton onClick={this.addToCart}>
                ADD TO CART
              </AddToCartButton>

              <Description 
                dangerouslySetInnerHTML={{ 
                  __html: this.state?.product?.description 
                }} 
              />
            </div>
          </Flex>
        }
      </div>
    )
  }
}
