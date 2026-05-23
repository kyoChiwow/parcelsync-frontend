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
  }),
});

export const { useGetDivisionsQuery } = userApi;
