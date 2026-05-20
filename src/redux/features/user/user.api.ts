import { baseApi } from "@/redux/baseApi";
import type { ICompany, IMeta, IResponse } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation<IResponse<ICompany>, Partial<ICompany>>({
      query: (companyInfo) => ({
        url: "/company/create",
        method: "POST",
        data: companyInfo,
      }),
      invalidatesTags: ["COMPANY"],
    }),
    getCompany: builder.query<{ data: ICompany[]; meta: IMeta }, unknown>({
      query: (params) => ({
        url: "/company/my-companies",
        method: "GET",
        params,
      }),
      providesTags: ["COMPANY"],
    }),
  }),
});

export const { useCreateCompanyMutation, useGetCompanyQuery } = userApi;
