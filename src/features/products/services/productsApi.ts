import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Product, ProductsResponse, Category } from '../../../types/product.types';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  tagTypes: ['Products', 'Product'],
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, { limit?: number; skip?: number }>({
      query: ({ limit = 10, skip = 0 }) => `products?limit=${limit}&skip=${skip}`,
      providesTags: ['Products'],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `products/${id}`,
      providesTags: (_, __, id) => [{ type: 'Product', id }],
    }),
    getCategories: builder.query<Category[], void>({
      query: () => 'products/categories',
    }),
    getProductsByCategory: builder.query<ProductsResponse, string>({
      query: (category) => `products/category/${category}`,
      providesTags: ['Products'],
    }),
    updateProduct: builder.mutation<Product, Partial<Product> & { id: number }>({
      query: ({ id, ...patch }) => ({
        url: `products/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (_, __, { id }) => [
        { type: 'Product', id },
        'Products',
      ],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useUpdateProductMutation,
} = productsApi;
