import { Component } from 'react'
import { capitalize, Category } from '../../_shared'
import ProductItem from '../components/ProductItem';
import { CategoryName, ProductListWrapper, ProductsWrapper } from '../components/styledComponents';

interface Props {
  category: Category;
}

export default class ProductsList extends Component<Props> {
  render() {
    const { category } = this.props

    return (
      <ProductListWrapper>
        {
          category?.name &&
          <CategoryName>{capitalize(category.name)}</CategoryName>
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
      </ProductListWrapper>
    )
  }
}
