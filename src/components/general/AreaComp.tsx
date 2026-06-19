/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAreasQuery } from "@/redux/features/location/location.api";
import { useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import PaginationComp from "./PaginateComp";

export interface Props {
  selectedArea: string;
  setValue: UseFormSetValue<any>;
}

export default function AreasComp({ selectedArea, setValue }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetAreasQuery({
    page: currentPage,
    searchTerm,
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search area..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Area Name</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.data?.map((area: any) => (
            <TableRow
              key={area._id}
              className={`cursor-pointer ${
                selectedArea === area._id ? "bg-primary/10" : ""
              }`}
              onClick={() => {
                setValue("hubArea", area._id);
              }}
            >
              <TableCell>{area.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PaginationComp
        currentPage={currentPage}
        totalPage={data?.meta?.totalPage || 1}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
