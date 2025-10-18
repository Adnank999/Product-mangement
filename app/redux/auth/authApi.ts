import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../store/apiBaseQuery'; // Import apiBaseQuery

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({

    login: builder.mutation<{ token: string }, { email: string }>({
      query: (body) => ({
        url: '/auth', 
        method: 'POST',
        body, 
      }),
    }),


  }),
});

export const { useLoginMutation } = authApi;