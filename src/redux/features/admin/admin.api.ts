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
    getAllUser: builder.query({
      query: () => ({
        url: "/user/get-all",
        method: "GET",
      }),
      providesTags: ["USER"],
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
    getAllHubs: builder.query({
      query: () => ({
        url: "/hub/get-all",
        method: "GET",
      }),
      providesTags: ["HUB"],
    }),
    getHubAdmins: builder.query({
      query: () => ({
        url: "/user/hub-admins",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
    createHubAdmin: builder.mutation({
      query: (payload) => ({
        url: "/admin/hub-admin/create",
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["HUB_ADMIN"],
    }),
    deleteHubAdmin: builder.mutation({
      query: (userId: string) => ({
        url: "/admin/hub-admin/delete",
        method: "DELETE",
        data: userId,
      }),
      invalidatesTags: ["HUB_ADMIN"],
    }),
  }),
});

export const {
  useGetAllCompaniesQuery,
  useApproveCompanyMutation,
  useRejectCompanyMutation,
  useGetAllParcelsQuery,
  useGetAllHubsQuery,
  useGetHubAdminsQuery,
  useCreateHubAdminMutation,
  useDeleteHubAdminMutation,
  useGetAllUserQuery,
} = userApi;
