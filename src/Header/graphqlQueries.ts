import { ApolloClient, gql, NormalizedCacheObject } from '@apollo/client';
import { Currency } from '../_shared';

export const getCurrencies = async (client: ApolloClient<NormalizedCacheObject>) => {
  const { data } = await client.query<{ currencies: Currency[] }>({
    query: gql`
    query GetCurrencies {
        currencies {
          label,
          symbol
        }
      }
    `
  })

  return { ...data }
}
