import { Component } from 'react'
import { 
    Attributes, 
    Flex, 
    formatPrice, 
    getPrice, 
    ICartItem, 
    StateContext 
} from '../../_shared'
import { 
    Brand, 
    CartItemSection, 
    DecreaseButton, 
    IncreaseButton, 
    Name,  
    Price, 
    Quantity 
} from './styledComponents'
import plusIcon from '../../assets/images/plus.svg'
import minusIcon from '../../assets/images/minus.svg'
import CartItemImage from './CartItemImage'

interface Props {
    cartItem: ICartItem;
    variant?: 'default' | 'small'
}

export default class CartItem extends Component<Props> {
    static contextType = StateContext;

    addToCart = () => {
        this.context.addToCart(
            this.props.cartItem.product, 
            this.props.cartItem.selectedAttributes
        )
    }

    reduceCartItemQty = () => {
        this.context.reduceCartItemQty(this.props.cartItem)
    }

    selectAttribute = (attribute, index) => {
        this.context.selectAttribute({
            attribute,
            cartItem: this.props.cartItem,
            index
        })
    }

    render() {
        const { 
            variant = 'default', 
            cartItem: { 
                quantity, 
                product, 
                selectedAttributes
            } 
        } = this.props

        const price = getPrice(product.prices, this.context.state.currency)

        return (
        <Flex 
            justify="space-between" 
            align="flex-start" 
            mt={variant === 'small' ? 45 : undefined}
        >
            <CartItemSection 
                direction="column" 
                justify="space-between" 
                align="flex-start"
                variant={variant}
            >
                <div>
                    <Brand sm={variant === 'small'}>{product.brand}</Brand>
                    <Name sm={variant === 'small'}>{product.name}</Name>
                </div>
                <Price sm={variant === 'small'}>{formatPrice(price)}</Price>

                <Attributes
                    attributes={product.attributes}
                    selectedAttributes={selectedAttributes}
                    onSelect={this.selectAttribute}
                    variant={variant}
                />
            </CartItemSection>

            <Flex>
                <CartItemSection 
                    direction="column" 
                    justify="space-between"
                    mr={12}
                    variant={variant}
                >
                    <IncreaseButton 
                        alt="increase" 
                        src={plusIcon} 
                        onClick={this.addToCart}
                        sm={variant === 'small'} 
                    />
                    <Quantity sm={variant === 'small'}>{quantity}</Quantity>
                    <DecreaseButton 
                        alt="decrease" 
                        src={minusIcon}
                        onClick={this.reduceCartItemQty}
                        sm={variant === 'small'}  
                    />
                </CartItemSection>
                <CartItemImage
                    gallery={product.gallery}
                    variant={variant}
                />
            </Flex>
        </Flex>
        )
    }
}
