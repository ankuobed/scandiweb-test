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

        return (
        <div>
            {
                attributes && attributes.map((attr, index) => (
                    <div>
                        {
                            labels &&
                            <Label>{attr.name.toUpperCase()}:</Label>
                        }
                        <Flex 
                            flexWrap={variant === 'small' ? 'wrap' : undefined} 
                            mb={variant === 'small' ? -6 : undefined}
                        >
                            {
                                attr.items[0].value.charAt(0) === '#' ?
                                attr.items.map(attrItem => 
                                <AttributeColor 
                                    key={attrItem.id}
                                    sm={variant === 'small'}
                                    color={attrItem.value} 
                                    selected={attrItem.id === selectedAttributes[index].id}
                                    onClick={() => onSelect(attrItem, index)} 
                                />) :
                                attr.items.map(attrItem => 
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
        </div>
        )
    }
}
