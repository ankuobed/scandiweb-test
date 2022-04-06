import { Component } from 'react'
import { Attribute, ICartItem, Product } from '../types'
import { AttributeColor, AttributeItem, Flex, Label } from './styledComponents';

interface Props {
    attributes: Product['attributes'];
    selectedAttributes: ICartItem['selectedAttributes'];
    onSelect: (attribute: Attribute, index: number) => void;
    variant?: 'default' | 'small';
    labels?: boolean;
}

export class Attributes extends Component<Props> {
    render() {
        const { 
            attributes, 
            selectedAttributes, 
            onSelect, 
            variant = 'default', 
            labels = false
        } = this.props

        return attributes.length > 0 && attributes.map((attr, index) => (
            <div>
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
                            onClick={() => onSelect(attrItem, index)} 
                        />) :
                        attr?.items.map(attrItem => 
                        <AttributeItem 
                            key={attrItem.id}
                            sm={variant === 'small'}
                            selected={attrItem.id === selectedAttributes[index].id}
                            onClick={() => onSelect(attrItem, index)}
                        >
                            {attrItem.value}
                        </AttributeItem>)
                    }
                </Flex>
            </div>
        ))
               
    }
}
