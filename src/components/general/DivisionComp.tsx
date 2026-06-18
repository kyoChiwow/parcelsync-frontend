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
import { useGetDivisionsQuery } from "@/redux/features/location/location.api";
import PaginationComp from "./PaginateComp";

export default function DivisionsComp() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetDivisionsQuery({
    page: currentPage,
    searchTerm,
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search division..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Division Name</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.data?.map((division: any) => (
            <TableRow key={division._id}>
              <TableCell>{division.name}</TableCell>
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