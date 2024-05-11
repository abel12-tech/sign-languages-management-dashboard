import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getTokenFromCookies } from "../../../shared/getToken.mjs";
import { BASE_URL } from "../../../constants";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
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
    getAllCategories: builder.query({
      query: () => "/categories/",
      method: "GET",
    }),
    getCategoryById: builder.query({
      query: (id) => `/signs/${id}`,
      method: "GET",
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery } =
  categoriesApi;
