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
    addSign: builder.mutation({
      query: (data) => ({
        url: "/signs",
        method: "POST",
        body: data,
      }),
    }),
    updateSign: builder.mutation({
      query: (data) => ({
        url: `/signs/${data._id}/`,
        method: "PATCH",
        body: data,
      }),
    }),
    approveSign: builder.mutation({
      query: (id) => ({
        url: `/signs/${id}/approve`,
        method: "PATCH",
        body: id,
      }),
    }),
    rejectSign: builder.mutation({
      query: (id) => ({
        url: `/signs/${id}/reject`,
        method: "PATCH",
        body: id,
      }),
    }),
    deleteSign: builder.mutation({
      query: (id) => ({
        url: `/signs/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllSignsQuery,
  useGetSignByIdQuery,
  useGetSignAddedByAdminQuery,
  useGetSignAddedByUserQuery,
  useAddSignMutation,
  useUpdateSignMutation,
  useApproveSignMutation,
  useRejectSignMutation,
  useDeleteSignMutation,
} = signsApi;
