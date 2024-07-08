import { DOLIBAR_URL } from '../../constants'
import { DOLIBARR_API_KEY } from '../../constants.js'
import { apiSlice } from '../apiSlice'

export const dolliDocumentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query({
      query: ({ modulepart, id }) => {
        let params = `modulepart=${modulepart}&id=${id}`
        return {
          url: `${DOLIBAR_URL}/documents?${params}`,
          headers: {
            DOLAPIKEY: DOLIBARR_API_KEY,
          },
        }
      },
      keepUnusedDataFor: 5,
    }),
    downloadDocument: builder.query({
      query: ({ modulepart, original_file }) => ({
        url: `${DOLIBAR_URL}/documents/download?modulepart=${modulepart}&original_file=${encodeURIComponent(
          original_file,
        )}`,
        method: 'GET',
        headers: {
          DOLAPIKEY: DOLIBARR_API_KEY,
        },
      }),
    }),
  }),
})

export const {
  useGetDocumentsQuery,
  useLazyDownloadDocumentQuery,
} = dolliDocumentApiSlice
