import { baseApi } from "@/redux/baseApi";
import type { ICompany, IMeta } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanies: builder.query<{ data: ICompany[]; meta: IMeta }, unknown>({
      query: (params) => ({
        url: "/company/get-all",
        method: "GET",
        params,
      }),
      providesTags: ["COMPANY"],
    }),
  }),
});

export const { useGetAllCompaniesQuery } = userApi;
