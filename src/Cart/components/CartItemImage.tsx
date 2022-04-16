import { Component } from 'react'
import { Flex, Product } from '../../_shared';
import { NextImageButton, PreviousImageButton, Image } from './styledComponents';

interface State {
    currentImage: string;
}

interface Props {
    gallery: Product['gallery'];
    variant: 'default' | 'small';
}

export default class CartItemImage extends Component<Props, State> {
    state = {
        currentImage: this.props.gallery[0]
    }

    previousImage = () => {
        const gallery = this.props.gallery
        const index = gallery.indexOf(this.state.currentImage)
        if(index > 0) {
            this.setState({
                currentImage: gallery[index - 1]
            })
        }
    }

    nextImage = () => {
        const gallery = this.props.gallery
        const index = gallery.indexOf(this.state.currentImage)
        if(index < gallery.length - 1) {
            this.setState({
                currentImage: gallery[index + 1]
            })
        }
    }

    
    render() {
        const showImageSwitchButton = this.props.variant === 'default' && this.props.gallery.length > 1
        
        return (
            <Flex>
                {
                    showImageSwitchButton &&
                    <PreviousImageButton onClick={this.previousImage} />
                }
                <Image 
                    alt={this.state.currentImage} 
                    src={this.state.currentImage} 
                    sm={this.props.variant === 'small'} 
                />
                {
                    showImageSwitchButton &&
                    <NextImageButton onClick={this.nextImage} />
                }
            </Flex>
        )
    }
}
