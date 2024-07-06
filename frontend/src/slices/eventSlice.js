// Import necessary constants and the apiSlice
import { apiSlice } from './apiSlice'
import { EVENTS_URL } from './constants'

// Use apiSlice to inject endpoints
export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing getEvents query
    getEvents: builder.query({
      query: () => ({
        url: `${EVENTS_URL}`,
      }),
      providesTags: ['Event'],
      keepUnusedDataFor: 5,
    }),
    // New getEventById query
    getEventById: builder.query({
      query: (id) => ({
        url: `${EVENTS_URL}/${id}`,
      }),
      providesTags: ['Event'],
      keepUnusedDataFor: 5,
    }),
    // New addEvent mutation
    addEvent: builder.mutation({
      query: (newEvent) => ({
        url: `${EVENTS_URL}`,
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: ['Event'],
    }),
    // New updateEvent mutation
    updateEvent: builder.mutation({
      query: ({ id, updatedEvent }) => ({
        url: `${EVENTS_URL}/${id}`,
        method: 'PUT',
        body: updatedEvent,
      }),
      invalidatesTags: ['Event'],
    }),
  }),
})

// Export the generated hooks
export const {
  useGetEventsQuery,
  useGetEventByIdQuery,
  useAddEventMutation,
  useUpdateEventMutation,
} = eventsApiSlice
