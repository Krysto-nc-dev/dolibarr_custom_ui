import { DOLIBAR_URL } from '../../constants'
import { DOLIBARR_API_KEY } from '../../constants.js'
import { apiSlice } from '../apiSlice'

export const dolliProposalApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProposals: builder.query({
      query: (category) => {
        let params = `category=${category}`
        return {
          // url: `${DOLIBAR_URL}/products?${params}&limit=100`,
          url: `${DOLIBAR_URL}/proposals`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),

    getProposalDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/proposals/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
    createProposal: builder.mutation({
      query: ({ proposalData }) => {
        return {
          url: `${DOLIBAR_URL}/proposals`,
          method: 'POST',
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
          body: proposalData, // les données du formulaire vont ici
        }
      },
      // invalidatesTags: ['Product'],
    }),
    createLine: builder.mutation({
      query: ({ proposalId, lineData }) => {
        return {
          url: `${DOLIBAR_URL}/proposals/${proposalId}/line`,
          method: 'POST',
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
          body: lineData, // les données du formulaire vont ici
        }
      },
      // invalidatesTags: ['Product'],
    }),
    deleteProposalLine: builder.mutation({
      query: ({ proposalId, lineId }) => {
        return {
          url: `${DOLIBAR_URL}/proposals/${proposalId}/lines/${lineId}`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
          method: 'DELETE',
        }
      },
    }),
  }),
})

export const {
  useGetProposalsQuery,
  useGetProposalDetailsQuery,
  useCreateProposalMutation,
  useCreateLineMutation,
  useDeleteProposalLineMutation,

  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliProposalApiSlice
