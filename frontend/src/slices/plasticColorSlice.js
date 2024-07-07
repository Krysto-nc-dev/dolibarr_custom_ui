import { apiSlice } from './apiSlice'
import { PLASTIC_COLORS_URL } from './constants'

export const plasticColorsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlasticColors: builder.query({
      query: () => ({
        url: `${PLASTIC_COLORS_URL}`,
      }),
      providesTags: ['PlasticColor'],
      keepUnusedDataFor: 5,
    }),
    getPlasticColorById: builder.query({
      query: (id) => ({
        url: `${PLASTIC_COLORS_URL}/${id}`,
      }),
      providesTags: ['PlasticColor'],
      keepUnusedDataFor: 5,
    }),
    addPlasticColor: builder.mutation({
      query: (newPlasticColor) => ({
        url: `${PLASTIC_COLORS_URL}`,
        method: 'POST',
        body: newPlasticColor,
      }),
      invalidatesTags: ['PlasticColor'],
    }),
    updatePlasticColor: builder.mutation({
      query: ({ id, updatedPlasticColor }) => ({
        url: `${PLASTIC_COLORS_URL}/${id}`,
        method: 'PUT',
        body: updatedPlasticColor,
      }),
      invalidatesTags: ['PlasticColor'],
    }),
    deletePlasticColor: builder.mutation({
      query: (id) => ({
        url: `${PLASTIC_COLORS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['PlasticColor'],
    }),
  }),
})

export const {
  useGetPlasticColorsQuery,
  useGetPlasticColorByIdQuery,
  useAddPlasticColorMutation,
  useUpdatePlasticColorMutation,
  useDeletePlasticColorMutation,
} = plasticColorsApiSlice
