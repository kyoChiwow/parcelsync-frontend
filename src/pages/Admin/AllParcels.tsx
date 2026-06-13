/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetAllCompaniesQuery,
  useGetAllParcelsQuery,
} from "@/redux/features/admin/admin.api";
import { useGetSingleParcelHistoryQuery } from "@/redux/features/user/user.api";
import { Cog } from "lucide-react";
import { Fragment, useState } from "react";

export default function AllParcels() {
  const { data: allParcels } = useGetAllParcelsQuery(undefined);
  const { data: allCompanies } = useGetAllCompaniesQuery(undefined);

  const [expandedParcelId, setExpandedParcelId] = useState<string | null>(null);

  const { data: parcelHistory, isLoading } = useGetSingleParcelHistoryQuery(
    expandedParcelId!,
    {
      skip: !expandedParcelId,
    },
  );

  const handleExpand = (id: string) => {
    setExpandedParcelId((prev) => (prev === id ? null : id));
  };

  return (
    <div>
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="flex justify-between my-8">
          <h1 className="text-xl font-semibold">My Parcels</h1>
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
              {allParcels?.data && allParcels.data.length > 0 ? (
                allParcels.data.map((parcel: any) => {
                  const matchedCompany = allCompanies?.data?.find(
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

                        <TableCell className="flex items-center justify-center">
                          <Cog />
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
