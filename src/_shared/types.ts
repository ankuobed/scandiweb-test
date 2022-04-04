import 'styled-components';

export interface IFlex {
    direction?: 'column' | 'column-reverse' | 'row' | 'row-reverse';
    align?:
        | 'center'
        | 'end'
        | 'flex-end'
        | 'flex-start'
        | 'self-end'
        | 'self-start'
        | 'start';
    self?:
        | 'center'
        | 'end'
        | 'flex-end'
        | 'flex-start'
        | 'self-end'
        | 'self-start'
        | 'start';
    justify?:
        | 'space-around'
        | 'space-between'
        | 'space-evenly'
        | 'stretch'
        | 'center'
        | 'end'
        | 'flex-end'
        | 'flex-start'
        | 'start';
    flexWrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
    flex?:
        | 'auto'
        | 'content'
        | 'fit-content'
        | 'max-content'
        | 'min-content'
        | 'none'
        | (string & {})
        | (number & {});
    mx?: string | number;
    my?: string | number;
    mt?: string | number;
    mr?: string | number;
    ml?: string | number;
    mb?: string | number;
    m?: string | number;
    px?: string | number;
    py?: string | number;
    pt?: string | number;
    pr?: string | number;
    pl?: string | number;
    pb?: string | number;
    p?: string | number;
}

export interface Theme {
    PRIMARY: string;
    SECONDARY: string;
    BACKGROUND: string;
}

export interface Attribute {
    id: string;
    displayValue: string,
    value: string,
}

export interface AttributeSet {
    id: string;
    name: string;
    type: string;
    items: Attribute[];
}

export interface Product {
    id: string;
    name: string;
    inStock: boolean;
    gallery: string[];
    description: string;
    category: string;
    attributes: AttributeSet[];
    prices: Price[];
    brand: string;
}

export interface Currency {
    label: string;
    symbol: string;
}

export interface Price {
    currency: Currency;
    amount: number;
}

export interface Category {
    name: string;
    products: Product[];
}

export interface ICartItem {
    product: Product;
    quantity: number;
    // selectedAttributes: Attribute[];
}

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {}
}