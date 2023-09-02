import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { URL_BASE_FIREBASE_REALTIME_DATABASE } from '../../../constants/firebase';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: URL_BASE_FIREBASE_REALTIME_DATABASE }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({newUser, localId}) => ({
      
        url: `/users/${localId}.json`,    
        method: 'PUT',
        body: newUser,
      }),
      invalidatesTags: ['User'],
    }),  

  }),
});

export const { useCreateUserMutation, useGetUserQuery } = userApi;