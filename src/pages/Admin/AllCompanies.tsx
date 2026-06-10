import ApproveRejectConfirmation from "@/components/ApproveRejectConfirmation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useApproveCompanyMutation,
  useGetAllCompaniesQuery,
  useRejectCompanyMutation,
} from "@/redux/features/admin/admin.api";
import type { ICompany } from "@/types";
import { getStatusColor } from "@/utils/statusColor";
import { toast } from "sonner";

export default function AllCompanies() {
  const { data: companies, isLoading: isFetching } =
    useGetAllCompaniesQuery(undefined);
  const [approveCompany, { isLoading: isApproving }] =
    useApproveCompanyMutation();
  const [rejectCompany, { isLoading: isRejecting }] =
    useRejectCompanyMutation();

  const handleApproveCompany = async (id: string) => {
    try {
      await approveCompany({ id }).unwrap();
      toast.success("Company approved successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to approve company!");
    }
  };

  const handleRejectCompany = async (id: string) => {
    try {
      await rejectCompany({ id }).unwrap();
      toast.success("Company rejected successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to reject company!");
    }
  };

  const isMutating = isApproving || isRejecting;

  return (
    <div>
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="flex justify-between my-8">
          <h1 className="text-xl font-semibold">My Companies</h1>
        </div>

        <div className="border border-muted rounded-md bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="w-37.5">Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetching ? (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Loading companies...
                  </TableCell>
                </TableRow>
              ) : (
                companies?.data?.map((item: ICompany) => (
                  <TableRow key={item._id}>
                    <TableCell className="font-medium">
                      {item?.companyName}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {item?.address}
                    </TableCell>

                    <TableCell>
                      <Badge
                        variant="outline"
                        className={getStatusColor(item?.isApproved)}
                      >
                        {item?.isApproved || "PENDING"}
                      </Badge>
                    </TableCell>

                    <TableCell className="text-right">
                      <ApproveRejectConfirmation
                        onApprove={() => handleApproveCompany(item._id)}
                        onReject={() => handleRejectCompany(item._id)}
                      >
                        {/* 👈 Disable button while processing an action */}
                        <Button size="sm" disabled={isMutating}>
                          {isMutating ? "Processing..." : "Review"}
                        </Button>
                      </ApproveRejectConfirmation>
                    </TableCell>
                  </TableRow>
                ))
              )}

              {!isFetching && !companies?.data?.length && (
                <TableRow>
                  <TableCell
                    colSpan={4}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No companies registered yet.
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
