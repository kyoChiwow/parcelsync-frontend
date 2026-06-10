import { baseApi } from "@/redux/baseApi";
import type { ICompany, IMeta, IParcel } from "@/types";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCompanies: builder.query<{ data: ICompany[]; meta: IMeta }, unknown>({
      query: () => ({
        url: "/company/get-all",
        method: "GET",
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
    getAllParcels: builder.query<{ data: IParcel[]; meta: IMeta }, unknown>({
      query: () => ({
        url: "/parcel/all-parcels",
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useApproveCompanyMutation,
  useRejectCompanyMutation,
  useGetAllParcelsQuery,
} = userApi;
