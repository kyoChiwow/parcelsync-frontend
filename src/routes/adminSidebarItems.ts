import AllCompanies from "@/pages/Admin/AllCompanies";
import AllParcels from "@/pages/Admin/AllParcels";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Companies",
    items: [
      {
        title: "All Companies",
        url: "/admin/comapnies",
        component: AllCompanies,
      },
      {
        title: "All Parcels",
        url: "/admin/parcels",
        component: AllParcels,
      },
    ],
  },
];
