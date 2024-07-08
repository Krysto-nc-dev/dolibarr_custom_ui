import { DOLIBAR_URL } from '../../constants'
import { DOLIBARR_API_KEY } from '../../constants.js'
import { apiSlice } from '../apiSlice'

export const dolliWarehouseApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWarehouses: builder.query({
      query: (category) => {
        let params = `category=${category}`
        return {
          // url: `${DOLIBAR_URL}/products?${params}&limit=100`,
          url: `${DOLIBAR_URL}/warehouses`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),
    getWarehouseDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/warehouses/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetWarehousesQuery,
  useGetWarehouseDetailsQuery,

  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliWarehouseApiSlice
