/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
import PaginationComp from "./PaginateComp";

export default function AreasComp() {
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
            <TableHead>District Id</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.data?.map((area: any) => (
            <TableRow key={area._id}>
              <TableCell>{area.name}</TableCell>
              <TableCell>{area.districtId}</TableCell>
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