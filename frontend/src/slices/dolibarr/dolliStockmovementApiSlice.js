import { DOLIBAR_URL } from '../../constants.js'
import { DOLIBARR_API_KEY } from '../../constants.js'
import { apiSlice } from '../apiSlice.js'

export const dolliStockmovementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStockmovements: builder.query({
      query: (category) => {
        return {
          // url: `${DOLIBAR_URL}/products?${params}&limit=100`,
          url: `${DOLIBAR_URL}/stockmovements?limit=1000`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),

    getStockmovementsDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/stockmovements/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetStockmovementsQuery,
  useGetStockmovementsDetailsQuery,

  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliStockmovementApiSlice
