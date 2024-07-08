import { apiSlice } from './apiSlice'
import { MACHINES_URL } from './constants'

export const machineApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMachines: builder.query({
      query: () => ({
        url: `${MACHINES_URL}`,
      }),
      providesTags: ['Machine'],
      keepUnusedDataFor: 5,
    }),
    getMachineById: builder.query({
      query: (id) => ({
        url: `${MACHINES_URL}/${id}`,
      }),
      providesTags: ['Machine'],
      keepUnusedDataFor: 5,
    }),
    addMachine: builder.mutation({
      query: (newMachine) => ({
        url: `${MACHINES_URL}`,
        method: 'POST',
        body: newMachine,
      }),
      invalidatesTags: ['Machine'],
    }),
    updateMachine: builder.mutation({
      query: ({ id, updatedMachine }) => ({
        url: `${MACHINES_URL}/${id}`,
        method: 'PUT',
        body: updatedMachine,
      }),
      invalidatesTags: ['Machine'],
    }),
    deleteMachine: builder.mutation({
      query: (id) => ({
        url: `${MACHINES_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Machine'],
    }),
    addMaintenance: builder.mutation({
      query: ({ id, newMaintenance }) => ({
        url: `${MACHINES_URL}/${id}/maintenance`,
        method: 'POST',
        body: newMaintenance,
      }),
      invalidatesTags: ['Machine'],
    }),
    addUsageProcedure: builder.mutation({
      query: ({ id, newUsageProcedure }) => ({
        url: `${MACHINES_URL}/${id}/usage-procedure`,
        method: 'POST',
        body: newUsageProcedure,
      }),
      invalidatesTags: ['Machine'],
    }),
  }),
})

export const {
  useGetMachinesQuery,
  useGetMachineByIdQuery,
  useAddMachineMutation,
  useUpdateMachineMutation,
  useDeleteMachineMutation,
  useAddMaintenanceMutation,
  useAddUsageProcedureMutation,
} = machineApiSlice
