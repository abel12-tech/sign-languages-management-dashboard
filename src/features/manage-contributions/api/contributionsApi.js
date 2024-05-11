import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromCookies } from "../../../shared/getToken.mjs";
import { BASE_URL } from "../../../constants";

export const contributionsApi = createApi({
  reducerPath: "contributionsApi",
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
    addSign: builder.mutation({
      query: (data) => ({
        url: `/signs/`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddSignMutation } = contributionsApi;
