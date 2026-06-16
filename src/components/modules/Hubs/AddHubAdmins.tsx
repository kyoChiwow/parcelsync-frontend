import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useGetAreasQuery, useGetDistrictsQuery, useGetDivisionsQuery } from "@/redux/features/location/location.api";

export default function AddHubAdmins() {
  const { data: allDivision, isLoading: allDivisionsLoading } =
    useGetDivisionsQuery(undefined);
  const { data: allArea, isLoading: allAreaLoading } =
    useGetAreasQuery(undefined);
  const { data: allDistrict, isLoading: allDistrictLoading } =
    useGetDistrictsQuery(undefined);

  console.log(allArea, allDivision, allDistrict);

  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Hub Admin</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
