import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromCookies } from "../../../shared/getToken.mjs";
import { BASE_URL } from "../../../constants";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
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
    getFeedbacks: builder.query({
      query: () => "/feedback/",
      method: "GET",
    }),
    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `/feedback/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useGetFeedbacksQuery, useDeleteFeedbackMutation } = feedbackApi;
