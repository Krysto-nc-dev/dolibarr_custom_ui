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
    getInvoiceLines: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/invoices/${id}/lines`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getInvoicePaiment: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/invoices/${id}/payments`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    createInvoice: builder.mutation({
      query: (invoiceData) => ({
        url: `${DOLIBAR_URL}/invoices`,
        method: 'POST',
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
        body: invoiceData,
      }),
    }),
    createInvoiceLine: builder.mutation({
      query: ({ invoiceId, lineData }) => ({
        url: `${DOLIBAR_URL}/invoices/${invoiceId}/lines`,
        method: 'POST',
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
        body: lineData,
      }),
    }),
  }),
})

export const {
  useGetInvoicesQuery,
  useGetInvoiceDetailsQuery,
  useGetInvoiceLinesQuery,
  useGetInvoicePaimentQuery,
  useCreateInvoiceMutation,
  useCreateInvoiceLineMutation,
  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliInvoiceApiSlice
