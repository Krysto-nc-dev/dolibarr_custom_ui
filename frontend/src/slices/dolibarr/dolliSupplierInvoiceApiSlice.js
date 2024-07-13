import { DOLIBAR_URL } from '../../constants'
import { DOLIBARR_API_KEY } from '../../constants.js'
import { apiSlice } from '../apiSlice'

export const dolliSupplierInvoiceApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupplierInvoices: builder.query({
      query: (category) => {
        return {
          // url: `${DOLIBAR_URL}/products?${params}&limit=100`,
          url: `${DOLIBAR_URL}/supplierinvoices`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),

    getSupplierInvoiceDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/supplierinvoices/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetSupplierInvoicesQuery,
  useGetSupplierInvoiceDetailsQuery,
} = dolliSupplierInvoiceApiSlice
