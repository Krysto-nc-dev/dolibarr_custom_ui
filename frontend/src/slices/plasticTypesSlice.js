import { apiSlice } from './apiSlice'
import { PLASTIC_TYPES_URL } from './constants'

export const plasticTypesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlasticTypes: builder.query({
      query: () => ({
        url: `${PLASTIC_TYPES_URL}`,
      }),
      providesTags: ['PlasticColor'],
      keepUnusedDataFor: 5,
    }),
    getPlasticTypeById: builder.query({
      query: (id) => ({
        url: `${PLASTIC_TYPES_URL}/${id}`,
      }),
      providesTags: ['PlasticColor'],
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetPlasticTypesQuery,
  useGetPlasticTypeByIdQuery,
} = plasticTypesApiSlice
