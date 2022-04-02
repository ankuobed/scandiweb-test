import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { Currency } from '../../_shared';

export const getCurrencies = async (client: ApolloClient<NormalizedCacheObject>) => {
  const { data, error } = await client.query<{ currencies: Currency[] }>({
    query: gql`
      query GetProduct {
        currencies {
          label,
          symbol
        }
      }
    `
  })

  return { ...data, error: error?.message }
}