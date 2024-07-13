// Importez apiSlice et les constantes nécessaires ici
import { apiSlice } from './apiSlice'
import { PROJECTS_URL } from './constants'

export const projectApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: `${PROJECTS_URL}`,
      }),
      providesTags: ['Project'],
      keepUnusedDataFor: 5,
    }),
    getProjectById: builder.query({
      query: (id) => ({
        url: `${PROJECTS_URL}/${id}`,
      }),
      providesTags: ['Project'],
      keepUnusedDataFor: 5,
    }),
    createProject: builder.mutation({
      query: (newProject) => ({
        url: `${PROJECTS_URL}`,
        method: 'POST',
        body: newProject,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation({
      query: ({ id, updatedProject }) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: 'PUT',
        body: updatedProject,
      }),
      invalidatesTags: ['Project'],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${PROJECTS_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
    addStage: builder.mutation({
      query: ({ id, newStage }) => ({
        url: `${PROJECTS_URL}/${id}/stages`,
        method: 'POST',
        body: newStage,
      }),
      invalidatesTags: ['Project'],
    }),
    updateStage: builder.mutation({
      query: ({ projectId, stageId, updatedStage }) => ({
        url: `${PROJECTS_URL}/${projectId}/stages/${stageId}`,
        method: 'PUT',
        body: updatedStage,
      }),
      invalidatesTags: ['Project'],
    }),
  }),
})

// Destructurez les hooks d'API pour les utiliser dans les composants Express
export const {
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useAddStageMutation,
  useUpdateStageMutation, // Ajout du hook pour la mise à jour d'étape
} = projectApiSlice
