/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllUserQuery } from "@/redux/features/admin/admin.api";
import { useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import { Input } from "../ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import PaginationComp from "./PaginateComp";

export interface Props {
  selectedAdmin: string;
  setValue: UseFormSetValue<any>;
}

export default function AllHubAdminsComp({ selectedAdmin, setValue }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetAllUserQuery({
    page: currentPage,
    searchTerm,
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search user..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User Name</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.data?.map((user: any) => (
            <TableRow
              key={user._id}
              className={`cursor-pointer ${
                selectedAdmin === user._id ? "bg-primary/10" : ""
              }`}
              onClick={() => {
                setValue("userId", user._id);
              }}
            >
              <TableCell>{user.name}</TableCell>
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
