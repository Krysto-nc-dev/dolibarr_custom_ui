import { apiSlice } from './apiSlice'
import { RECIPES_URL } from './constants'

export const plasticTypesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRecipes: builder.query({
      query: () => ({
        url: `${RECIPES_URL}`,
      }),
      providesTags: ['Recipes'],
      keepUnusedDataFor: 5,
    }),
    getRecipesById: builder.query({
      query: (id) => ({
        url: `${RECIPES_URL}/${id}`,
      }),
      providesTags: ['Recipes'],
      keepUnusedDataFor: 5,
    }),
  }),
})

export const {
  useGetRecipesQuery,
  useGetRecipesByIdQuery,
} = plasticTypesApiSlice
