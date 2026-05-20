import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCompanyQuery } from "@/redux/features/user/user.api";
import type { ICompany } from "@/types";

export default function CreateCompany() {
  const { data: myCompanies } = useGetCompanyQuery({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20 border-green-500/20";
      case "REJECTED":
        return "bg-destructive/10 text-destructive hover:bg-destructive/20 border-destructive/20";
      default:
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-yellow-500/20";
    }
  };

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
              {myCompanies?.data?.map((item: ICompany) => (
                <TableRow key={item._id}>
                  {/* Corrected mapping property from item.name to item.companyName */}
                  <TableCell className="font-medium">
                    {item?.companyName}
                  </TableCell>

                  {/* Added Address Column */}
                  <TableCell className="text-muted-foreground">
                    {item?.address}
                  </TableCell>

                  {/* Added Status Column with dynamic styling */}
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusColor(item?.isApproved)}
                    >
                      {item?.isApproved || "PENDING"}
                    </Badge>
                  </TableCell>

                  <TableCell className="text-right">
                    {/* Actions slot left flexible for your future buttons */}
                    <span className="text-sm text-muted-foreground">-</span>
                  </TableCell>
                </TableRow>
              ))}

              {/* Graceful fallback if no companies exist */}
              {!myCompanies?.data?.length && (
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
