import { Client, fetchExchange } from 'urql';

export const client = new Client({
  url: (import.meta.env.VITE_HASURA_BASE_URL || 'http://localhost:8080') + '/v1/graphql',
  exchanges: [fetchExchange]
})
