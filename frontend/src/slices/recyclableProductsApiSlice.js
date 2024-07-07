import { apiSlice } from './apiSlice'
import { RECYCLABLE_PRODUCTS_URL } from './constants'

export const recyclableProductsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecyclableProducts: builder.query({
      query: () => ({
        url: `${RECYCLABLE_PRODUCTS_URL}`,
      }),
      providesTags: ['RecyclableProducts'],
      keepUnusedDataFor: 5,
    }),
    getRecyclableProductById: builder.query({
      query: (id) => ({
        url: `${RECYCLABLE_PRODUCTS_URL}/${id}`,
      }),
      providesTags: ['RecyclableProducts'],
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetRecyclableProductsQuery,
  useGetRecyclableProductByIdQuery,
} = recyclableProductsApiSlice
