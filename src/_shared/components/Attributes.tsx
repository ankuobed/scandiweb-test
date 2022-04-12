import { Component } from 'react'
import { ICartItem, Product } from '../types'
import { isNotEmpty } from '../utils';
import { AttributeColor, AttributeItem, Flex, Label } from './styledComponents';

interface Props {
    attributes: Product['attributes'];
    selectedAttributes: ICartItem['selectedAttributes'];
    variant?: 'default' | 'small';
    labels?: boolean;
}

export class Attributes extends Component<Props> {
    render() {
        const { 
            attributes, 
            selectedAttributes, 
            variant = 'default', 
            labels = false
        } = this.props

        return isNotEmpty(attributes) && attributes.map((attr, index) => (
            <div key={attr.id}>
                {
                    labels &&
                    <Label>{attr.name.toUpperCase()}:</Label>
                }
                <Flex 
                    flexWrap={variant === 'small' ? 'wrap' : undefined} 
                    mt={25}
                >
                    {
                        attr?.type === 'swatch' ?
                        attr?.items.map(attrItem => 
                        <AttributeColor 
                            key={attrItem.id}
                            sm={variant === 'small'}
                            color={attrItem.value} 
                            selected={attrItem.id === selectedAttributes[index].id}
                        />) :
                        attr?.items.map(attrItem => 
                        <AttributeItem 
                            key={attrItem.id}
                            sm={variant === 'small'}
                            selected={attrItem.id === selectedAttributes[index].id}
                        >
                            {attrItem.value}
                        </AttributeItem>)
                    }
                </Flex>
            </div>
        ))
               
    }
}
