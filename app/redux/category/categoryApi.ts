import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../store/apiBaseQuery'; 

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Category'], 

  endpoints: (builder) => ({
   
    getCategories: builder.query({
      query: ({ offset = 0, limit = 10 }) => ({
        url: '/categories',
        params: { offset, limit },
      }),
      providesTags: ['Category'], 
    }),

 
    
    searchCategories: builder.query({
      query: (searchedText) => ({
        url: '/categories/search',
        params: { searchedText },
      }),
      providesTags: ['Category'],
    }),

  }),
});

export const {
  useGetCategoriesQuery,
  useSearchCategoriesQuery,

} = categoryApi;
