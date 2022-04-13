import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { Category, Product } from '../_shared';

export const getCategory = async (client: ApolloClient<NormalizedCacheObject>, name: string) => {
    const { data } = await client.query<{ category: Category }>({
      variables: {
        name
      },
      query: gql`
        query GetCategory($name: String!) {
          category(input: { title: $name }) {
            name,
            products {
              id,
              name,
              brand,
              prices {
                currency {
                  label,
                  symbol
                }
                amount
              },
              inStock,
              gallery,
              attributes {
                id,
                type,
                name,
                items {
                  id,
                  displayValue,
                  value,
                }
              }
            }
          }
        }
      `
    })

    return { category: data.category  }
}

export const getCategoryNames = async (client: ApolloClient<NormalizedCacheObject>) => {
  const { data } = await client.query<{ categories: { name: string }[] }>({
    query: gql`
    query GetCategoryNames {
        categories { 
          name
        }
      }
    `
  })
  
  return { categoryNames: data.categories.map(({ name }) => name)  }
}

export const getProduct = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
  const { data } = await client.query<{ product: Product }>({
    variables: {
      id
    },
    query: gql`
    query GetProduct($id: String!) {
        product(id: $id) {
          id,
          name,
          gallery,
          description,
          prices {
            currency {
              label,
              symbol
            },
            amount
          },
          brand,
          attributes {
            id,
            type,
            name,
            items {
              id,
              displayValue,
              value,
            }
          },
          inStock
        }
      }
    `
  })

  return { product: data.product }
}