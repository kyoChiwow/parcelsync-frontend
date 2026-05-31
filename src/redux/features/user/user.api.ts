import { baseApi } from "@/redux/baseApi";
import type { ICompany, IMeta, IParcel, IParcelHistory, IResponse } from "@/types";

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
    createParcel: builder.mutation<IResponse<IParcel>, Partial<IParcel>>({
      query: (parcelInfo) => ({
        url: "/parcel/create",
        method: "POST",
        data: parcelInfo,
      }),
      invalidatesTags: ["PARCEL"],
    }),
    getParcels: builder.query<{ data: IParcel[]; meta: IMeta }, unknown>({
      query: (params) => ({
        url: "/parcel/my-parcels",
        method: "GET",
        params,
      }),
      providesTags: ["PARCEL"],
    }),
    getSingleParcelHistory: builder.query<IResponse<IParcelHistory>, string>({
      query: (id) => ({
        url: `/parcel-history/${id}`,
        method: "GET",
      }),
      providesTags: ["PARCEL"],
    }),
    deleteParcel: builder.mutation<IResponse<null>, string>({
      query: (id) => ({
        url: `/parcel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PARCEL"],
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
  useCreateParcelMutation,
  useGetSingleParcelHistoryQuery,
  useDeleteParcelMutation,
} = userApi;
