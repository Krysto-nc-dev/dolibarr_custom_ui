import { apiSlice } from './apiSlice'
import { VEILLES_URL } from './constants'

export const veilleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVeilles: builder.query({
      query: () => ({
        url: `${VEILLES_URL}`,
      }),
      providesTags: ['Veille'],
      keepUnusedDataFor: 5,
    }),
    getVeilleById: builder.query({
      query: (id) => ({
        url: `${VEILLES_URL}/${id}`,
      }),
      providesTags: ['Veille'],
      keepUnusedDataFor: 5,
    }),
  }),
})

export const { useGetVeillesQuery, useGetVeilleByIdQuery } = veilleApiSlice
