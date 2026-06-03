/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

// Changed requiredRole? to ...requiredRoles using a rest parameter
export const withAuth = (
  Component: ComponentType,
  ...requiredRoles: TRole[]
) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    if (isLoading) {
      return (
        <div className="flex h-screen items-center justify-center">
          Loading...
        </div>
      );
    }

    if (!data?.data?.email) {
      return <Navigate to={"/login"} replace />;
    }

    const userRoles = Array.isArray(data?.data?.role)
      ? data.data.role
      : [data?.data?.role];

    if (requiredRoles.length > 0) {
      const hasPermission = userRoles.some((role: any) =>
        requiredRoles.includes(role as TRole),
      );

      if (!hasPermission) {
        return <Navigate to={"/unauthorized"} replace />;
      }
    }

    return <Component />;
  };
};
