import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllHubsQuery } from "@/redux/features/admin/admin.api";

interface IHub {
  _id: string;
  name: string;
  division: string;
  district: string;
  area: string;
  hubAdmin?: string;
}

export default function AllHubs() {
  const { data: allHubs, isLoading } = useGetAllHubsQuery(undefined);
  const hubsList = allHubs?.data as IHub[];

  return (
    <div>
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="flex justify-between my-8">
          <h1 className="text-xl font-semibold">All Hubs</h1>
        </div>

        <div className="border border-muted rounded-md bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hub Name</TableHead>
                <TableHead>Division</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Area</TableHead>
                <TableHead>Hub Admin</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* 1. Loading State */}
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

              {/* 2. Render List */}
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

              {/* 3. Empty State */}
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
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
