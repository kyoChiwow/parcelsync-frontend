/* eslint-disable @typescript-eslint/no-unused-vars */
import AddHubAdmins from "@/components/modules/Hubs/AddHubAdmins";
import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetHubAdminsQuery } from "@/redux/features/admin/admin.api";

export default function AllHubAdmins() {
  const { data: allHubAdmins, isLoading } = useGetHubAdminsQuery(undefined);
  console.log(allHubAdmins);

  return (
    <div>
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="flex justify-between my-8">
          <h1 className="text-xl font-semibold">All Hub Admins</h1>
          <AddHubAdmins />
        </div>

        <div className="border border-muted rounded-md bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Admin Name</TableHead>
                <TableHead>Hub Name</TableHead>
                <TableHead>Division</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Area</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            {/* <TableBody>
              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    Loading hubs...
                  </TableCell>
                </TableRow>
              )}

              
              {!isLoading &&
                hubsList?.map((hub) => (
                  <TableRow key={hub._id}>
                    <TableCell className="font-medium">{hub.name}</TableCell>
                    <TableCell>{hub.division}</TableCell>
                    <TableCell>{hub.district}</TableCell>
                    <TableCell>{hub.area}</TableCell>
                    <TableCell>{hub.hubAdmin}</TableCell>
                    <TableCell className="text-right">Actions</TableCell>
                  </TableRow>
                ))}

              {!isLoading && !hubsList?.length && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No hubs found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody> */}
          </Table>
        </div>
      </div>
    </div>
  );
}
