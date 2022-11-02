import { api } from '@/Services/api'
import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'
import fetchAll from './fetchAll'
import fetchOne from './fetchOne'

export const pokeApi = api.injectEndpoints({
  endpoints: (build: EndpointBuilder<any, any, any>) => ({
    fetchOne: fetchOne(build),
    fetchAll: fetchAll(build),
  }),
  overrideExisting: false,
})

export const { useFetchOneQuery, useFetchAllQuery } = pokeApi
