import CreateCompany from "@/pages/User/CreateCompany";
import CreateParcel from "@/pages/User/CreateParcel";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Parcel",
    items: [
      {
        title: "My Parcels",
        url: "/user/my-parcels",
        component: CreateParcel,
      },
      {
        title: "My Companies",
        url: "/user/my-company",
        component: CreateCompany,
      },
    ],
  },
];
