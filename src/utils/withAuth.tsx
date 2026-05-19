import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    // 1. Keep showing loading while fetching user info
    if (isLoading) {
      return <div className="flex h-screen items-center justify-center">Loading...</div>;
    }

    // 2. If not logged in, kick to login
    if (!data?.data?.email) {
      return <Navigate to={"/login"} replace />;
    }

    // 3. Safely normalize user roles to an array
    const userRoles = Array.isArray(data?.data?.role) 
      ? data.data.role 
      : [data?.data?.role];

    // 4. Check if the user's role array does NOT include the required role
    if (requiredRole && !userRoles.includes(requiredRole)) {
      return <Navigate to={"/unauthorized"} replace />;
    }

    // 5. Render component if authorized
    return <Component />;
  };
};
