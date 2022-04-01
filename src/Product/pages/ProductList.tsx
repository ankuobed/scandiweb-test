import { Component } from 'react'
import { AppolloClientContext, Category } from '../../_shared'
import ProductItem from '../components/ProductItem';
import { ProductsWrapper } from '../components/styledComponents';
import { getCategories } from '../services/graphql';

interface State {
  loading: boolean;
  error: string | undefined;
  categories: Category[];
}

export default class ProductsListPage extends Component<{}, State> {
  state = {
    loading: false,
    error: '',
    categories: []
  }
  
  static contextType = AppolloClientContext;
  client = this.context
  
  componentDidMount() {
    (async () => {
      this.setState({ loading: true })
      const result = await getCategories(this.client);
      this.setState({ loading: false, ...result })
    })();
  }

  render() {
    return (
      <div>
        {
          this.state.categories?.map((category: Category) => {
            return (
              <div style={{ marginTop: 70, marginBottom: 100 }}>
                <p style={{ fontSize: 42 }}>{category.name}</p>
                <ProductsWrapper>
                  {
                    category.products.map(product => <ProductItem key={product.id} product={product} />)
                  }
                </ProductsWrapper>
              </div>
            )
          })
        }
      </div>
    )
  }
}
