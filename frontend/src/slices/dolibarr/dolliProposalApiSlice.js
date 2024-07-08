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
  }),
})

export const {
  useGetProposalsQuery,
  useGetProposalDetailsQuery,

  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliProposalApiSlice
