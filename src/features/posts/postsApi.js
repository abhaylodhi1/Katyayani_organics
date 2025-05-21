import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://dummyjson.com/' }),
  endpoints: (builder) => ({
    getPosts: builder.query({
        query: ({ limit = 10, skip = 0 }) => `posts?limit=${limit}&skip=${skip}`,

    }),
  }),
});

export const { useGetPostsQuery } = postsApi;
