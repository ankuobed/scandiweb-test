import { Component } from 'react'
import { Image, ImageWrapper, OutOfStockWatermark } from './styledComponents';

interface Props {
    src: string;
    alt: string;
    inStock: boolean;
}

export default class ProductItemImage extends Component<Props> {
  render() {
    const { src, alt, inStock } = this.props

    return (
      <ImageWrapper>
          {
            !inStock &&
            <OutOfStockWatermark>OUT OF STOCK</OutOfStockWatermark>
          }
          <Image src={src} alt={alt} />
      </ImageWrapper>
    )
  }
}
