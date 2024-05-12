import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromCookies } from "../../../shared/getToken.mjs";
import { BASE_URL } from "../../../constants";

export const signsApi = createApi({
  reducerPath: "signsApi",
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
    getAllSigns: builder.query({
      query: () => "/signs/",
      method: "GET",
    }),
    getSignAddedByAdmin: builder.query({
      query: () => "/signs/added-by-admin",
      method: "GET",
    }),
    getSignAddedByUser: builder.query({
      query: () => "/signs/added-by-user",
      method: "GET",
    }),
    getSignById: builder.query({
      query: (id) => `/signs/${id}`,
      method: "GET",
    }),
  }),
});

export const {
  useGetAllSignsQuery,
  useGetSignByIdQuery,
  useGetSignAddedByAdminQuery,
  useGetSignAddedByUserQuery,
} = signsApi;
