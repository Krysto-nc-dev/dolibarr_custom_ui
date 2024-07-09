import { DOLIBAR_URL } from '../../constants.js'
import { DOLIBARR_API_KEY } from '../../constants.js'
import { apiSlice } from '../apiSlice.js'

export const dolliStockmovementApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStockmovements: builder.query({
      query: (category) => {
        return {
          url: `${DOLIBAR_URL}/stockmovements?limit=1000`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),

    addStockmovement: builder.mutation({
      query: (newStockmovement) => ({
        url: `${DOLIBAR_URL}/stockmovements`,
        method: 'POST',
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
        body: newStockmovement,
      }),
    }),
  }),
})

export const {
  useGetStockmovementsQuery,
  useAddStockmovementMutation,
} = dolliStockmovementApiSlice
