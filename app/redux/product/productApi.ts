

import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../store/apiBaseQuery'; 


export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Product'], 

  endpoints: (builder) => ({
   
    getProducts: builder.query({
      query: ({ offset = 0, limit = 10 }) => ({
        url: '/products',
        params: { offset, limit },
      }),
      providesTags: ['Product'], 
    }),

  
    getProductsByCategory: builder.query({
      query: (categoryId) => ({
        url: '/products',
        params: { categoryId },
      }),
      providesTags: ['Product'],
    }),

   
    getProductBySlug: builder.query({
      query: (slug) => `/products/${slug}`,
      providesTags: ['Product'],
    }),

    
    searchProducts: builder.query({
      query: (searchedText) => ({
        url: '/products/search',
        params: { searchedText },
      }),
      providesTags: ['Product'],
    }),

    
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/products',
        method: 'POST',
        body: newProduct,
      }),
      invalidatesTags: ['Product'], 
    }),


    updateProduct: builder.mutation({
      query: ({ id, updatedProduct }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: updatedProduct,
      }),
      invalidatesTags: ['Product'],
    }),

    // Delete a product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'], 
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductBySlugQuery,
  useSearchProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
