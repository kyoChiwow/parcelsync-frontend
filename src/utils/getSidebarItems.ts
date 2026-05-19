import { role } from "@/constants/role";
import { adminSidebarItems } from "@/routes/adminSidebarItems";
import { userSidebarItems } from "@/routes/useSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  // Explicitly cast or type the array as a flat array of strings so .includes() accepts a single string argument
  const roles = (Array.isArray(userRole) ? userRole : [userRole]) as string[];

  if (roles.includes(role.superAdmin) || roles.includes(role.admin)) {
    return [...adminSidebarItems];
  }

  if (roles.includes(role.user)) {
    return [...userSidebarItems];
  }

  return [];
};
