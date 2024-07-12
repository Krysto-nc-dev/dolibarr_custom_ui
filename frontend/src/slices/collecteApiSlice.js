import { apiSlice } from './apiSlice'
import { COLLECTE_URL } from './constants'

export const collecteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCollectes: builder.query({
      query: () => ({
        url: `${COLLECTE_URL}`,
      }),
      providesTags: ['Collecte'],
      keepUnusedDataFor: 5,
    }),
    getCollecteById: builder.query({
      query: (id) => ({
        url: `${COLLECTE_URL}/${id}`,
      }),
      providesTags: ['Collecte'],
      keepUnusedDataFor: 5,
    }),
    addCollecte: builder.mutation({
      query: (newCollecte) => ({
        url: `${COLLECTE_URL}`,
        method: 'POST',
        body: newCollecte,
      }),
      invalidatesTags: ['Collecte'],
    }),
    updateCollecte: builder.mutation({
      query: ({ id, updatedCollecte }) => ({
        url: `${COLLECTE_URL}/${id}`,
        method: 'PUT',
        body: updatedCollecte,
      }),
      invalidatesTags: ['Collecte'],
    }),
    deleteCollecte: builder.mutation({
      query: (id) => ({
        url: `${COLLECTE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Collecte'],
    }),
  }),
})

export const {
  useGetCollectesQuery,
  useGetCollecteByIdQuery,
  useAddCollecteMutation,
  useUpdateCollecteMutation,
  useDeleteCollecteMutation,
} = collecteApiSlice
