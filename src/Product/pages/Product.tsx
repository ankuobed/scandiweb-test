import { Component } from 'react'
import { AppolloClientContext, Flex, Product } from '../../_shared';
import { AddToCartButton, AttributeItem, Label, Description, Price, Brand, Name, AttributeColor } from '../components/styledComponents';
import { getProduct } from '../services/graphql';

interface State {
  loading: boolean;
  error: string | undefined;
  product: null | Product;
}

export default class ProductPage extends Component<{}, State> {
  state = {
    loading: false,
    error: '',
    product: null as never as Product
  }

  static contextType = AppolloClientContext;
  client = this.context
  id = window.location.href.split('/').pop() as string

  componentDidMount() {
    (async () => {
      this.setState({ loading: true })
      const result = await getProduct(this.client, this.id);
      this.setState({ loading: false, ...result })
    })();
  }

  render() {
    return (
      <div>
        {
          this.state?.product && 
          <Flex style={{ paddingTop: 50 }} justify="space-between" align="flex-start">
            <img
              alt={this.state?.product?.name}
              src={this.state?.product?.gallery[0]}
              style={{ width: 500, maxHeight: 500 }} 
            />
            
            <div style={{ width: '40%'}}>
              <Brand>{this.state?.product?.brand}</Brand>
              <Name>{this.state?.product?.name}</Name>

              {
                this.state?.product?.attributes.map(attr => (
                  <div>
                    <Label>{attr.name.toUpperCase()}:</Label>
                    <Flex>
                      {
                        attr.items[0].value.charAt(0) === '#' ?
                        attr.items.map(attrItem => <AttributeColor color={attrItem.value} active={attr.items.indexOf(attrItem) === 1} />) :
                        attr.items.map(attrItem => <AttributeItem active={attr.items.indexOf(attrItem) === 1}>{attrItem.value}</AttributeItem>)
                      }
                    </Flex>
                  </div>
                ))
              }

              <Label>PRICE:</Label>
              <Price>{this.state?.product?.prices[0].currency.symbol}{this.state?.product?.prices[0].amount}</Price>

              <AddToCartButton>
                ADD TO CART
              </AddToCartButton>

              <Description dangerouslySetInnerHTML={{ __html: this.state?.product?.description }} />
            </div>
          </Flex>
        }
      </div>
    )
  }
}
