import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import { role } from "../../constants/role";

export default function CreateParcel() {
  const { data: userData } = useUserInfoQuery(undefined);

  console.log(userData);

  const userRoles = userData?.data?.role;

  const isOnlyUser = Array.isArray(userRoles)
    ? userRoles.includes(role.user) && userRoles.length === 1
    : userRoles === role.user;

  if (isOnlyUser) {
    return <div>Please add a company</div>;
  }

  return <div>CreateParcel</div>;
}
