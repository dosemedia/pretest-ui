import { Client, fetchExchange } from 'urql';

export const client = new Client({
  url: 'http://localhost:8080/v1/graphql',
  exchanges: [fetchExchange]
})
