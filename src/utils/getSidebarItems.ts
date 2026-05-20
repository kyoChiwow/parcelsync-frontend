import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/useSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  const roles = (Array.isArray(userRole) ? userRole : [userRole]) as string[];

  if (roles.includes(role.superAdmin) || roles.includes(role.admin)) {
    return [...adminSidebarItems];
  }

  if (roles.includes(role.user)) {
    return [...userSidebarItems];
  }

  return [];
};
