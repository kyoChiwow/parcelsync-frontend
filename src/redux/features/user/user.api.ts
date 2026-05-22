import { baseApi } from "@/redux/baseApi";
import type { ICompany, IMeta, IResponse } from "@/types";
import type { IParcel } from "@/types/parcel.type";

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
    getParcels: builder.query<{ data: IParcel[]; meta: IMeta }, unknown>({
      query: (params) => ({
        url: "/parcel/my-parcels",
        method: "GET",
        params,
      }),
      providesTags: ["COMPANY"],
    }),
    deleteCompany: builder.mutation<IResponse<null>, string>({
      query: (companyId) => ({
        url: `/company/${companyId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["COMPANY"],
    }),
  }),
});

export const {
  useCreateCompanyMutation,
  useGetCompanyQuery,
  useDeleteCompanyMutation,
  useGetParcelsQuery,
} = userApi;
