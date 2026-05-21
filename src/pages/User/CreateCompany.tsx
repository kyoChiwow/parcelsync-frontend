import { DeleteConfirmation } from "@/components/DeleteConfirmation";
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
import {
  useDeleteCompanyMutation,
  useGetCompanyQuery,
} from "@/redux/features/user/user.api";
import type { ICompany } from "@/types";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function CreateCompany() {
  const { data: myCompanies } = useGetCompanyQuery({});
  const [deleteCompany] = useDeleteCompanyMutation();

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

  const handleDeleteCompany = (id: string) => {
    try {
      const toastId = toast.loading("Deleting Company...");

      deleteCompany(id).unwrap();

      toast.success("Company deleted successfully!", {
        id: toastId,
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
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
              {myCompanies?.data?.map((item: ICompany) => (
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
                    <DeleteConfirmation
                      onConfirm={() => handleDeleteCompany(item._id)}
                    >
                      <Button variant="destructive" size={"sm"}>
                        <Trash2 />
                      </Button>
                    </DeleteConfirmation>
                  </TableCell>
                </TableRow>
              ))}

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
