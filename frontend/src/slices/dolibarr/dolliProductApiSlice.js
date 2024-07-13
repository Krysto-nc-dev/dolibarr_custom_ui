import { DOLIBAR_URL, DOLIBARR_API_KEY } from '../../constants'
import { apiSlice } from '../apiSlice'

export const dolliProductApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ mode, variant_filter, category } = {}) => {
        const params = new URLSearchParams()

        if (mode) {
          params.append('mode', mode)
        }
        if (variant_filter) {
          params.append('variant_filter', variant_filter)
        }
        if (category) {
          params.append('category', category)
        }

        const queryString = params.toString()
        const url = queryString
          ? `${DOLIBAR_URL}/products?${queryString}`
          : `${DOLIBAR_URL}/products`

        return {
          url: url,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),
    getProductCategories: builder.query({
      query: () => ({
        url: `${DOLIBAR_URL}/categories`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
        params: {
          type: 'product',
        },
      }),
      keepUnusedDataFor: 5,
    }),
    getProductDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/products/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetProductCategoriesQuery,
  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliProductApiSlice
