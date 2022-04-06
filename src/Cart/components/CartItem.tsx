import { Component } from 'react'
import { Attributes, Flex, formatPrice, getPrice, ICartItem, StateContext } from '../../_shared'
import { 
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
        this.context.addToCart(
            this.props.cartItem.product, 
            this.props.cartItem.selectedAttributes
        )
    }

    removeFromCart = () => {
        this.context.removeFromCart(this.props.cartItem.product)
    }

    selectAttribute = (attribute, index) => {
        this.context.selectAttribute({
            attribute,
            cartItem: this.props.cartItem,
            index
        })
    }

    render() {
        const { quantity, product, selectedAttributes } = this.props.cartItem;
        const price = getPrice(product.prices, this.context.state.currency)

        return (
        <Flex justify="space-between" align="flex-start" mt={45}>
            <Flex direction="column" justify="space-between" align="flex-start" style={{ height: 130 }}>
                <div>
                    <Brand>{product.brand}</Brand>
                    <Name>{product.name}</Name>
                </div>
                <Price>{formatPrice(price)}</Price>

                <Attributes
                    attributes={[product.attributes[0]]}
                    selectedAttributes={selectedAttributes}
                    onSelect={this.selectAttribute}
                    variant="small"
                />
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
