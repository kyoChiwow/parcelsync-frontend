import ApproveRejectConfirmation from "@/components/ApproveRejectConfirmation";
import { AddCompanyModal } from "@/components/modules/Company/AddCompany";
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
import { useGetAllCompaniesQuery } from "@/redux/features/admin/admin.api";
import type { ICompany } from "@/types";
import { getStatusColor } from "@/utils/statusColor";

export default function AllCompanies() {
  const { data: companies } = useGetAllCompaniesQuery(undefined);

  console.log(companies);

  const handleApproveCompany = (id: string) => {
    console.log("approve", id);
  };

  const handleRejectCompany = (id: string) => {
    console.log("reject", id);
  };

  return (
    <div>
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="flex justify-between my-8">
          <h1 className="text-xl font-semibold">My Companies</h1>
          <AddCompanyModal />
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
              {companies?.data?.map((item: ICompany) => (
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
                      <Button size="sm">Review</Button>
                    </ApproveRejectConfirmation>
                  </TableCell>
                </TableRow>
              ))}

              {!companies?.data?.length && (
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
