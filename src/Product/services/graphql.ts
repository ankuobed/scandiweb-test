import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { Category } from '../../_shared';

export const getCategories = async (client: ApolloClient<NormalizedCacheObject>) => {
    const { data, error } = await client.query<{ categories: Category[] }>({
      query: gql`
        query GetCategories {
          categories {
            name,
            products {
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