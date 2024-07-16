import { apiSlice } from './apiSlice'
import { MESSAGE_URL } from './constants'

export const messageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => ({
        url: `${MESSAGE_URL}`,
      }),
      providesTags: ['Message'],
      keepUnusedDataFor: 5,
    }),
    getMessageById: builder.query({
      query: (id) => ({
        url: `${MESSAGE_URL}/${id}`,
      }),
      providesTags: ['Message'],
      keepUnusedDataFor: 5,
    }),
    addMessage: builder.mutation({
      query: (newMessage) => ({
        url: `${MESSAGE_URL}`,
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: ['Message'],
    }),
    updateMessage: builder.mutation({
      query: ({ id, updatedMessage }) => ({
        url: `${MESSAGE_URL}/${id}`,
        method: 'PUT',
        body: updatedMessage,
      }),
      invalidatesTags: ['Message'],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `${MESSAGE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Message'],
    }),
  }),
})

export const {
  useGetMessagesQuery,
  useGetMessageByIdQuery,
  useAddMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = messageApiSlice
