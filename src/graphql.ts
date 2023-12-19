import { Client, fetchExchange } from 'urql'
import { authStore } from './stores/stores'
console.log(import.meta.env.VITE_HASURA_BASE_URL)
export const client = new Client({
  url: (import.meta.env.VITE_HASURA_BASE_URL || 'http://localhost:8081') + '/v1/graphql',
  fetchOptions: () => {
    // const token = localStorage.getItem('auth.token')
    // return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
    const token = authStore.token
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {}
  },
  exchanges: [fetchExchange]
})
