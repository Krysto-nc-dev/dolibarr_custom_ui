import { DOLIBAR_URL } from '../../constants'
import { DOLIBARR_API_KEY } from '../../constants'
import { apiSlice } from '../apiSlice'

export const dolliThirdPartyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getThirdParties: builder.query({
      query: () => {
        // Commencez par les paramètres fixes.
        // obtiens tout les produits et service avec le tag SOLEN (19)
        let params = `limit=100000`

        // Construisez l'URL complète avec les paramètres.
        return {
          url: `${DOLIBAR_URL}/thirdparties?${params}`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),

    getThirdPartyDetails: builder.query({
      query: (id) => ({
        url: `${DOLIBAR_URL}/thirdparties/${id}`,
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetThirdPartiesQuery,
  useGetThirdPartyDetailsQuery,

  // Ajoutez d'autres exports ici pour les autres queries, mutations, etc.
} = dolliThirdPartyApiSlice
