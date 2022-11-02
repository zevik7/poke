import { EndpointBuilder } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export default (build: EndpointBuilder<any, any, any>) =>
  build.query<any, any>({
    query: name => ({ url: `/pokemon/${name}`, method: 'get' }),
  })
