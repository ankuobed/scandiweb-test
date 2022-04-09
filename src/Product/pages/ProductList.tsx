import { Component } from 'react'
import { capitalize, Category } from '../../_shared'
import ProductItem from '../components/ProductItem';
import { ProductsWrapper } from '../components/styledComponents';

interface Props {
  category: Category;
}

export default class ProductsList extends Component<Props> {
  render() {
    const { category } = this.props

    return (
      <div 
        key={category?.name} 
        style={{ 
          marginTop: 70, 
          marginBottom: 100, 
        }}
      >
        {
          category?.name &&
          <p style={{ fontSize: 42 }}>{capitalize(category.name)}</p>
        }
        <ProductsWrapper>
          {
            category?.products &&
            category.products.map(product => 
              <ProductItem 
                key={product.id} 
                product={product} />
            )
          }
        </ProductsWrapper>
      </div>
    )
  }
}
