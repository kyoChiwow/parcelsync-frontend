import AllCompanies from "@/components/modules/Company/AllCompanies";
import AllParcels from "@/components/modules/Parcels/AllParcels";
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
