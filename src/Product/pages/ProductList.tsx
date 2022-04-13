import { Component } from 'react'
import { capitalize, Category, StateContext } from '../../_shared'
import ProductItem from '../components/ProductItem';
import { CategoryName, ProductListWrapper, ProductsWrapper } from '../components/styledComponents';
import { getCategory } from '../graphqlQueries';

interface State {
  category: Category
}

interface Props {
  categoryName: string;
}

export default class ProductsList extends Component<Props, State> {
  state = {
    category: {} as Category,
  }
  
  static contextType = StateContext
  client = this.context.apolloClient

  componentDidMount() {
    (async () => {
      const result = await getCategory(this.client, this.props.categoryName)
      this.setState({ category: result.category })
    })();
  }

  componentDidUpdate(prevProps) {
    (async () => {
      if(prevProps.categoryName !== this.props.categoryName) {
        const result = await getCategory(this.client, this.props.categoryName)
        this.setState({ category: result.category })
      }
    })();
  }

  render() {
    const { category } = this.state

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
