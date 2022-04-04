import { Component } from 'react'
import { Flex, formatPrice, getPrice, ICartItem, StateContext } from '../../_shared'
import { 
    AttributeColor, 
    AttributeItem, 
    Brand, 
    DecreaseButton, 
    Image, 
    IncreaseButton, 
    Name, 
    Price, 
    Quantity 
} from './styledComponents'
import plusIcon from '../../assets/images/plus.svg'
import minusIcon from '../../assets/images/minus.svg'

export default class CartItem extends Component<{ cartItem: ICartItem }> {
    static contextType = StateContext;

    addToCart = () => {
        this.context.addToCart(this.props.cartItem.product)
    }

    removeFromCart = () => {
        this.context.removeFromCart(this.props.cartItem.product)
    }

    render() {
        const { quantity, product } = this.props.cartItem;
        const price = getPrice(product.prices, this.context.state.currency)
        const attr = product?.attributes[0]

        return (
        <Flex justify="space-between" align="flex-start" mt={45}>
            <Flex direction="column" justify="space-between" align="flex-start" style={{ height: 130 }}>
                <div>
                    <Brand>{product.brand}</Brand>
                    <Name>{product.name}</Name>
                </div>
                <Price>{formatPrice(price)}</Price>

                {
                    attr?.items?.length > 0 &&
                    <Flex flexWrap="wrap" mb={-6}>
                    {
                        attr.items[0].value.charAt(0) === '#' ?
                        attr.items.map(attrItem => <AttributeColor color={attrItem.value} active={attr.items.indexOf(attrItem) === 1} />) :
                        attr.items.map(attrItem => <AttributeItem active={attr.items.indexOf(attrItem) === 1}>{attrItem.value}</AttributeItem>)
                    }
                    </Flex>
                }
            </Flex>

            <Flex>
                <Flex 
                    style={{ height: 130 }} 
                    direction="column" 
                    justify="space-between"
                    mr={12}
                >
                    <IncreaseButton 
                        alt="increase" 
                        src={plusIcon} 
                        onClick={this.addToCart} 
                    />
                    <Quantity>{quantity}</Quantity>
                    <DecreaseButton 
                        alt="decrease" 
                        src={minusIcon}
                        onClick={this.removeFromCart}  
                    />
                </Flex>
                <Image alt={product.name} src={product.gallery[0]} />
            </Flex>
        </Flex>
        )
    }
}
