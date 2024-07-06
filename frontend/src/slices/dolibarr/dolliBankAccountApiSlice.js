import { DOLIBAR_URL } from '../../constants'
import { DOLIBARR_API_KEY } from '../../constants.js'
import { apiSlice } from '../apiSlice'

export const dolliBankAccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBankAccounts: builder.query({
      query: (category) => {
        let params = `category=${category}`
        return {
          // url: `${DOLIBAR_URL}/products?${params}&limit=100`,
          url: `${DOLIBAR_URL}/bankaccounts`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),

    getBankAccountsDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/bankaccounts/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getBankAccountLines: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/bankaccounts/${id}/lines`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetBankAccountsQuery,
  useGetBankAccountsDetailsQuery,
  useGetBankAccountLinesQuery,

  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliBankAccountApiSlice
