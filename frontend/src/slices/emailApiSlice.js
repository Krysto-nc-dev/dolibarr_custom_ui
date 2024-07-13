import { apiSlice } from './apiSlice'
import { EMAILS_URL } from './constants'

export const emailsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEmails: builder.query({
      query: () => ({
        url: `${EMAILS_URL}`,
      }),
      providesTags: ['Email'],
      keepUnusedDataFor: 5,
    }),
    getEmailById: builder.query({
      query: (id) => ({
        url: `${EMAILS_URL}/${id}`,
      }),
      providesTags: ['Email'],
      keepUnusedDataFor: 5,
    }),
    addEmail: builder.mutation({
      query: (newEmail) => ({
        url: `${EMAILS_URL}`,
        method: 'POST',
        body: newEmail,
      }),
      invalidatesTags: ['Email'],
    }),
    updateEmail: builder.mutation({
      query: ({ id, updatedEmail }) => ({
        url: `${EMAILS_URL}/${id}`,
        method: 'PUT',
        body: updatedEmail,
      }),
      invalidatesTags: ['Email'],
    }),
    deleteEmail: builder.mutation({
      query: (id) => ({
        url: `${EMAILS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Email'],
    }),
  }),
})

export const {
  useGetEmailsQuery,
  useGetEmailByIdQuery,
  useAddEmailMutation,
  useUpdateEmailMutation,
  useDeleteEmailMutation,
} = emailsApiSlice
