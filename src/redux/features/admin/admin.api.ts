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
    approveCompany: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/approve`,
        method: "PATCH",
        data: { id },
      }),
      invalidatesTags: ["COMPANY"],
    }),
    rejectCompany: builder.mutation({
      query: ({ id }) => ({
        url: `/admin/reject`,
        method: "PATCH",
        data: { id },
      }),
      invalidatesTags: ["COMPANY"],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useApproveCompanyMutation,
  useRejectCompanyMutation,
} = userApi;
