import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL, DOLIBAR_URL } from '../constants'

// Si Event, PlasticColor, PlasticType, Recipes, Veilles sont des chaînes de caractères
const tagTypes = [
  'Event',
  'PlasticColor',
  'PlasticType',
  'Recipes',
  'Veilles',
  'RecyclableProducts',
  'CollecteDetails',
  'Email',
]

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL })
const doliBaseQuery = fetchBaseQuery({ baseUrl: DOLIBAR_URL })

export const apiSlice = createApi({
  baseQuery,
  tagTypes,
  endpoints: (builder) => ({}),
})

export const dolibarrApiSlice = createApi({
  baseQuery: doliBaseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
})
