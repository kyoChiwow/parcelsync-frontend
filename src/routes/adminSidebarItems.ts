import CreateParcel from "@/pages/User/CreateParcel";
import type { ISidebarItem } from "@/types";

export const adminSidebarItems: ISidebarItem[] = [
    {
        title: "Create Parcel",
        items: [
            {
                title: "Create New Parcel",
                url: "/user/create-parcel",
                component: CreateParcel
            }
        ]
    }
]