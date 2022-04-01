import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { Category, Product } from '../../_shared';

export const getCategories = async (client: ApolloClient<NormalizedCacheObject>) => {
    const { data, error } = await client.query<{ categories: Category[] }>({
      query: gql`
        query GetCategories {
          categories {
            name,
            products {
              id,
              name,
              prices {
                currency {
                  label,
                  symbol
                }
                amount
              },
              gallery
            }
          }
        }
      `
    })

    return { categories: data.categories, error: error?.message }
}

export const getProduct = async (client: ApolloClient<NormalizedCacheObject>, id: string) => {
  const { data, error } = await client.query<{ product: Product }>({
    query: gql`
      query GetProduct {
        product(id: "${id}") {
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
            name,
            items {
              displayValue,
              value,
            }
          }
        }
      }
    `
  })

  return { ...data, error: error?.message }
}