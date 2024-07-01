import { ChangePasswordDTO, User } from '@/types';
import { API_HOST, API_PATHS } from '@constants/api-paths';
import { LOCAL_STORAGE_TOKEN_KEY } from '@constants/common.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userServiceApi = createApi({
  reducerPath: 'user',
  tagTypes: ['user'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_HOST,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      if (token) {
        headers.set('authorization', `Bearer ${token}`);

        return headers;
      }
    },
  }),
  endpoints: (builder) => ({
    me: builder.query<User, void>({
      query: () => ({
        url: API_PATHS.getMe,
        method: 'GET',
      }),
      transformResponse: (response: { user: User }) => {
        return response.user;
      },
    }),
    changePassword: builder.mutation<void, ChangePasswordDTO>({
      query: ({ oldPassword, newPassword }) => ({
        url: API_PATHS.changePassword,
        method: 'POST',
        body: { oldPassword, newPassword },
      }),
    }),
  }),
});

export const { useMeQuery, useChangePasswordMutation } = userServiceApi;
