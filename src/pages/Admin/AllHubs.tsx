import AddHub from "@/components/modules/Hubs/AddHub";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllHubsQuery } from "@/redux/features/admin/admin.api";
import { Trash2 } from "lucide-react";

export interface ILocationRef {
  _id: string;
  name: string;
}

export interface IHubComponent {
  _id: string;
  hubName: string;
  divisionId: ILocationRef;
  districtId: ILocationRef;
  areaId: ILocationRef;
  hubAdminId?: {
    _id: string;
    name: string;
  };
  __v: number;
}

export default function AllHubs() {
  const { data: allHubs, isLoading } = useGetAllHubsQuery(undefined);
  const hubsList = allHubs?.data;

  return (
    <div>
      <div className="w-full max-w-7xl mx-auto px-5">
        <div className="flex justify-between my-8">
          <h1 className="text-xl font-semibold">All Hubs</h1>
          <AddHub />
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
                hubsList?.map((hub: IHubComponent) => (
                  <TableRow key={hub._id}>
                    <TableCell className="font-medium">{hub.hubName}</TableCell>
                    <TableCell>{hub.divisionId?.name}</TableCell>
                    <TableCell>{hub.districtId?.name}</TableCell>
                    <TableCell>{hub.areaId?.name}</TableCell>
                    <TableCell>{hub.hubAdminId?.name}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="destructive">
                        <Trash2 />
                      </Button>
                    </TableCell>
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
