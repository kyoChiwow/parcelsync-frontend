import App from "@/App";
import Verify from "@/components/general/Verify";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/About";
import HomePage from "@/pages/HomePage";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import type { TRole } from "@/types";
import { generateRoutes } from "@/utils/generateRoutes";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./useSidebarItems";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: HomePage,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      {
        index: true,
        element: <Navigate to={"/user"} />,
      },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: withAuth(
      DashboardLayout,
      role.admin as TRole,
      role.superAdmin as TRole,
    ),
    path: "/admin",
    children: [
      {
        index: true,
        element: <Navigate to={"/admin"} />,
      },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
]);
