/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddParcel } from "@/components/modules/Parcels/AddParcel";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import {
  useGetCompanyQuery,
  useGetParcelsQuery,
} from "@/redux/features/user/user.api";
import { Trash2 } from "lucide-react";
import { role } from "../../constants/role";

export default function CreateParcel() {
  const { data: userData } = useUserInfoQuery(undefined);
  const { data: myParcels } = useGetParcelsQuery({});

  const { data: myCompanies } = useGetCompanyQuery({});

  console.log(myCompanies, myParcels);

  const handleDeleteParcel = (id: string) => {
    console.log("Delete parcel with ID:", id);
  };

  const userRoles = userData?.data?.role;

  const isOnlyUser = Array.isArray(userRoles)
    ? userRoles.includes(role.user) && userRoles.length === 1
    : userRoles === role.user;

  if (isOnlyUser) {
    return <div className="text-center mt-20">Please add a company</div>;
  }

  return (
    <div>
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="flex justify-between my-8">
          <h1 className="text-xl font-semibold">My Parcels</h1>
          <AddParcel />
        </div>

        <div className="border border-muted rounded-md bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Pickup Address</TableHead>
                <TableHead>Delivery Address</TableHead>
                <TableHead>Weight</TableHead>
                <TableHead>Delivery Charge</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {myParcels?.data && myParcels.data.length > 0 ? (
                myParcels.data.map((parcel: any) => {
                  const matchedCompany = myCompanies?.data?.find(
                    (company) => company._id === parcel.companyId,
                  );

                  return (
                    <TableRow key={parcel._id}>
                      <TableCell className="font-semibold ">
                        {matchedCompany
                          ? matchedCompany.companyName
                          : "Loading..."}
                      </TableCell>
                      <TableCell>{parcel.pickUpAddress}</TableCell>
                      <TableCell>{parcel.deliveryAddress}</TableCell>
                      <TableCell>{parcel.weight} kg</TableCell>
                      <TableCell>৳{parcel.deliveryCharge}</TableCell>
                      <TableCell>৳{parcel.totalCost}</TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteParcel(parcel._id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center h-24 text-muted-foreground"
                  >
                    No parcels found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
