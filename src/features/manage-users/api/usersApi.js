import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromCookies } from "../../../shared/getToken.mjs";
import { BASE_URL } from "../../../constants";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const token = getTokenFromCookies();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/user",
      method: "GET",
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
      method: "GET",
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = usersApi;
