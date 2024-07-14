import { apiSlice } from './apiSlice' // Assurez-vous que apiSlice est correctement importé depuis votre configuration générale de l'API
import { CASHIERS_URL } from './constants' // Assurez-vous d'avoir défini votre URL d'API correctement dans constants.js

export const cashierApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCashiers: builder.query({
      query: () => ({
        url: CASHIERS_URL, // Endpoint pour récupérer tous les caissiers
      }),
      providesTags: ['Cashier'], // Tags pour la gestion du cache
      keepUnusedDataFor: 5, // Garde les données non utilisées en cache pendant 5 secondes
    }),
    getCashierById: builder.query({
      query: (id) => ({
        url: `${CASHIERS_URL}/${id}`, // Endpoint pour récupérer un caissier par ID
      }),
      providesTags: ['Cashier'], // Tags pour la gestion du cache
      keepUnusedDataFor: 5, // Garde les données non utilisées en cache pendant 5 secondes
    }),
    createCashier: builder.mutation({
      query: (newCashier) => ({
        url: CASHIERS_URL, // Endpoint pour créer un nouveau caissier
        method: 'POST',
        body: newCashier, // Corps de la requête avec les données du nouveau caissier
      }),
      invalidatesTags: ['Cashier'], // Invalide les données en cache associées aux caissiers après la création
    }),
    updateCashier: builder.mutation({
      query: ({ id, updatedCashier }) => ({
        url: `${CASHIERS_URL}/${id}`, // Endpoint pour mettre à jour un caissier par ID
        method: 'PUT',
        body: updatedCashier, // Corps de la requête avec les données mises à jour du caissier
      }),
      invalidatesTags: ['Cashier'], // Invalide les données en cache associées aux caissiers après la mise à jour
    }),
    deleteCashier: builder.mutation({
      query: (id) => ({
        url: `${CASHIERS_URL}/${id}`, // Endpoint pour supprimer un caissier par ID
        method: 'DELETE',
      }),
      invalidatesTags: ['Cashier'], // Invalide les données en cache associées aux caissiers après la suppression
    }),
    addSale: builder.mutation({
      query: ({ cashierId, sale }) => ({
        url: `${CASHIERS_URL}/${cashierId}/sales`, // Endpoint pour ajouter une vente à un caissier par ID
        method: 'POST',
        body: sale, // Corps de la requête avec les détails de la vente
      }),
      invalidatesTags: ['Cashier'], // Invalide les données en cache associées aux caissiers après l'ajout de la vente
    }),
  }),
})

export const {
  useGetCashiersQuery,
  useGetCashierByIdQuery,
  useCreateCashierMutation,
  useUpdateCashierMutation,
  useDeleteCashierMutation,
  useAddSaleMutation,
} = cashierApiSlice
