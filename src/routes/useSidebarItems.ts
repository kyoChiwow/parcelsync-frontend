import CreateParcel from "@/pages/User/CreateParcel";
import type { ISidebarItem } from "@/types";

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Parcel",
    items: [
      {
        title: "Create New Parcel",
        url: "/user/create-parcel",
        component: CreateParcel,
      },
    ],
  },
];
