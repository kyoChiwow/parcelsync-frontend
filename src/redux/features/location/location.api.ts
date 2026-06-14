import { baseApi } from "@/redux/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDivisions: builder.query({
      query: (params) => ({
        url: "/location/division",
        method: "GET",
        params,
      }),
      providesTags: ["LOCATION"],
    }),
    getAreas: builder.query({
      query: (params) => ({
        url: "/location/areas",
        method: "GET",
        params,
      }),
      providesTags: ["LOCATION"],
    }),
    getDistricts: builder.query({
      query: (params) => ({
        url: "/location/district",
        method: "GET",
        params,
      }),
      providesTags: ["LOCATION"],
    }),
  }),
});

export const { useGetDivisionsQuery, useGetAreasQuery, useGetDistrictsQuery } = userApi;
