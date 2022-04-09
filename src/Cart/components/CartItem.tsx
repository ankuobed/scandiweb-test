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
    DecreaseButton, 
    Image, 
    IncreaseButton, 
    Name, 
    NextImageButton, 
    PreviousImageButton, 
    Price, 
    Quantity 
} from './styledComponents'
import plusIcon from '../../assets/images/plus.svg'
import minusIcon from '../../assets/images/minus.svg'

interface Props {
    cartItem: ICartItem;
    variant?: 'default' | 'small'
}

export default class CartItem extends Component<Props> {
    state = {
        currentImage: this.props.cartItem.product.gallery[0]
    }

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

    previousImage = () => {
        const gallery = this.props.cartItem.product.gallery
        const index = gallery.indexOf(this.state.currentImage)
        if(index > 0) {
            this.setState({
                currentImage: gallery[index - 1]
            })
        }
    }

    nextImage = () => {
        const gallery = this.props.cartItem.product.gallery
        const index = gallery.indexOf(this.state.currentImage)
        if(index < gallery.length - 1) {
            this.setState({
                currentImage: gallery[index + 1]
            })
        }
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
            <Flex 
                direction="column" 
                justify="space-between" 
                align="flex-start" 
                style={{ minHeight: variant === 'default' ? 170 : 130 }}
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
            </Flex>

            <Flex>
                <Flex 
                    style={{ height: variant === 'default' ? 170 : 130 }} 
                    direction="column" 
                    justify="space-between"
                    mr={12}
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
                </Flex>
                <Flex>
                    {
                        variant === 'default' &&
                        <PreviousImageButton onClick={this.previousImage} />
                    }
                    <Image 
                        alt={product.name} 
                        src={this.state.currentImage} 
                        sm={variant === 'small'} 
                    />
                    {
                        variant === 'default' &&
                        <NextImageButton onClick={this.nextImage} />
                    }
                </Flex>
            </Flex>
        </Flex>
        )
    }
}
