/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
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
  useDeleteParcelMutation,
  useGetCompanyQuery,
  useGetParcelsQuery,
  useGetSingleParcelHistoryQuery,
} from "@/redux/features/user/user.api";
import { Trash2 } from "lucide-react";
import { Fragment, useState } from "react";
import { toast } from "sonner";
import { role } from "../../constants/role";

export default function CreateParcel() {
  const { data: userData } = useUserInfoQuery(undefined);
  const { data: myParcels } = useGetParcelsQuery({});
  const { data: myCompanies } = useGetCompanyQuery({});
  const [deleteParcel] = useDeleteParcelMutation();

  const [expandedParcelId, setExpandedParcelId] = useState<string | null>(null);

  const { data: parcelHistory, isLoading } = useGetSingleParcelHistoryQuery(
    expandedParcelId!,
    {
      skip: !expandedParcelId,
    },
  );

  const handleDeleteParcel = (id: string) => {
    try {
      const toastId = toast.loading("Deleting Parcel...");

      deleteParcel(id).unwrap();

      toast.success("Parcel deleted successfully!", {
        id: toastId,
      });
    } catch (error: any) {
      const serverMessage = error?.message || "Something went wrong!"
      toast.error(serverMessage);
    }
  };

  const handleExpand = (id: string) => {
    setExpandedParcelId((prev) => (prev === id ? null : id));
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
                <TableHead>Weight (Grams)</TableHead>
                <TableHead>Delivery Charge</TableHead>
                <TableHead>Total Cost</TableHead>
                <TableHead>Net Cost</TableHead>
                <TableHead>Collection Amount</TableHead>
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
                    <Fragment key={parcel._id}>
                      <TableRow
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => handleExpand(parcel._id)}
                      >
                        <TableCell className="font-semibold">
                          {matchedCompany?.companyName ?? "Loading..."}
                        </TableCell>

                        <TableCell>{parcel.pickUpAddress}</TableCell>
                        <TableCell>{parcel.deliveryAddress}</TableCell>
                        <TableCell>{parcel.weight}</TableCell>
                        <TableCell>৳{parcel.deliveryCharge}</TableCell>
                        <TableCell>৳{parcel.totalCost}</TableCell>
                        <TableCell>৳{parcel.netCost}</TableCell>
                        <TableCell>৳{parcel.collectionAmount}</TableCell>

                        <TableCell className="text-right">
                          <DeleteConfirmation
                            onConfirm={() => handleDeleteParcel(parcel._id)}
                          >
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </DeleteConfirmation>
                        </TableCell>
                      </TableRow>

                      {expandedParcelId === parcel._id && (
                        <TableRow>
                          <TableCell colSpan={9}>
                            <div className="p-4 bg-muted/30 rounded-md">
                              {isLoading ? (
                                <p className="text-sm text-muted-foreground">
                                  Loading timeline...
                                </p>
                              ) : (
                                <div className="space-y-4">
                                  {parcelHistory?.data?.timeline?.map(
                                    (
                                      item: {
                                        status: string;
                                        remarks: string;
                                        timeStamp: string;
                                      },
                                      index: number,
                                    ) => (
                                      <div key={index} className="flex gap-4">
                                        <div className="flex flex-col items-center">
                                          <div className="h-3 w-3 rounded-full bg-primary" />

                                          {index !==
                                            parcelHistory.data.timeline.length -
                                              1 && (
                                            <div className="w-px flex-1 min-h-8 bg-border" />
                                          )}
                                        </div>

                                        <div>
                                          <p className="font-medium">
                                            {item.status}
                                          </p>

                                          <p className="text-sm text-muted-foreground">
                                            {item.remarks}
                                          </p>

                                          <p className="text-xs text-muted-foreground">
                                            {new Date(
                                              item.timeStamp,
                                            ).toLocaleString()}
                                          </p>
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={9}
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
