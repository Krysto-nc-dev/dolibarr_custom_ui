import { apiSlice } from './apiSlice'
import { PRESENTATION_URL } from './constants'

export const presentationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPresentations: builder.query({
      query: () => ({
        url: `${PRESENTATION_URL}`,
      }),
      providesTags: ['Presentation'],
      keepUnusedDataFor: 5,
    }),
    getPresentationById: builder.query({
      query: (id) => ({
        url: `${PRESENTATION_URL}/${id}`,
      }),
      providesTags: ['Presentation'],
      keepUnusedDataFor: 5,
    }),
    addPresentation: builder.mutation({
      query: (newPresentation) => ({
        url: `${PRESENTATION_URL}`,
        method: 'POST',
        body: newPresentation,
      }),
      invalidatesTags: ['Presentation'],
    }),
    updatePresentation: builder.mutation({
      query: ({ id, updatedPresentation }) => ({
        url: `${PRESENTATION_URL}/${id}`,
        method: 'PUT',
        body: updatedPresentation,
      }),
      invalidatesTags: ['Presentation'],
    }),
    deletePresentation: builder.mutation({
      query: (id) => ({
        url: `${PRESENTATION_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Presentation'],
    }),
    addSlideToPresentation: builder.mutation({
      query: ({ presentationId, newSlide }) => ({
        url: `${PRESENTATION_URL}/${presentationId}/slides`,
        method: 'POST',
        body: newSlide,
      }),
      invalidatesTags: ['Presentation'],
    }),
    updateSlideOfPresentation: builder.mutation({
      query: ({ presentationId, slideId, updatedSlide }) => ({
        url: `${PRESENTATION_URL}/${presentationId}/slides/${slideId}`,
        method: 'PUT',
        body: updatedSlide,
      }),
      invalidatesTags: ['Presentation'],
    }),
    deleteSlideFromPresentation: builder.mutation({
      query: ({ presentationId, slideId }) => ({
        url: `${PRESENTATION_URL}/${presentationId}/slides/${slideId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Presentation'],
    }),
  }),
})

export const {
  useGetPresentationsQuery,
  useGetPresentationByIdQuery,
  useAddPresentationMutation,
  useUpdatePresentationMutation,
  useDeletePresentationMutation,
  useAddSlideToPresentationMutation,
  useUpdateSlideOfPresentationMutation,
  useDeleteSlideFromPresentationMutation,
} = presentationApiSlice
