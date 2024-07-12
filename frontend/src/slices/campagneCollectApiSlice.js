import { apiSlice } from './apiSlice'
import { CAMPAGNE_COLLECTE_URL } from './constants'

export const campagneCollecteApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCampagnesCollecte: builder.query({
      query: () => ({
        url: `${CAMPAGNE_COLLECTE_URL}`,
      }),
      providesTags: ['CampagneCollecte'],
      keepUnusedDataFor: 5,
    }),
    getCampagneCollecteById: builder.query({
      query: (id) => ({
        url: `${CAMPAGNE_COLLECTE_URL}/${id}`,
      }),
      providesTags: ['CampagneCollecte'],
      keepUnusedDataFor: 5,
    }),
    addCampagneCollecte: builder.mutation({
      query: (newCampagneCollecte) => ({
        url: `${CAMPAGNE_COLLECTE_URL}`,
        method: 'POST',
        body: newCampagneCollecte,
      }),
      invalidatesTags: ['CampagneCollecte'],
    }),
    updateCampagneCollecte: builder.mutation({
      query: ({ id, updatedCampagneCollecte }) => ({
        url: `${CAMPAGNE_COLLECTE_URL}/${id}`,
        method: 'PUT',
        body: updatedCampagneCollecte,
      }),
      invalidatesTags: ['CampagneCollecte'],
    }),
    deleteCampagneCollecte: builder.mutation({
      query: (id) => ({
        url: `${CAMPAGNE_COLLECTE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CampagneCollecte'],
    }),
    addCollecte: builder.mutation({
      query: ({ id, newCollecte }) => ({
        url: `${CAMPAGNE_COLLECTE_URL}/${id}/collecte`,
        method: 'POST',
        body: newCollecte,
      }),
      invalidatesTags: ['CampagneCollecte'],
    }),
  }),
})

export const {
  useGetCampagnesCollecteQuery,
  useGetCampagneCollecteByIdQuery,
  useAddCampagneCollecteMutation,
  useUpdateCampagneCollecteMutation,
  useDeleteCampagneCollecteMutation,
  useAddCollecteMutation,
} = campagneCollecteApiSlice
