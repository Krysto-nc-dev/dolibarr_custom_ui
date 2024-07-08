import { DOLIBAR_URL } from '../../constants.js'
import { DOLIBARR_API_KEY } from '../../constants.js'
import { apiSlice } from '../apiSlice.js'

export const dolliInvoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvoices: builder.query({
      query: (category) => {
        let params = `category=${category}`
        return {
          // url: `${DOLIBAR_URL}/products?${params}&limit=100`,
          url: `${DOLIBAR_URL}/invoices`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),
    getInvoiceDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/invoices/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetInvoicesQuery,
  useGetInvoiceDetailsQuery,
  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliInvoiceApiSlice
