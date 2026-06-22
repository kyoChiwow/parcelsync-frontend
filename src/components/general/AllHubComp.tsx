/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllHubsQuery } from "@/redux/features/admin/admin.api";
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
  selectedHub: string;
  setValue: UseFormSetValue<any>;
}

export default function AllHubComp({ selectedHub, setValue }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useGetAllHubsQuery({
    page: currentPage,
    searchTerm,
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search hub..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setCurrentPage(1);
        }}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hub Name</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.data?.map((hub: any) => (
            <TableRow
              key={hub._id}
              className={`cursor-pointer ${
                selectedHub === hub._id ? "bg-primary/10" : ""
              }`}
              onClick={() => {
                setValue("hubId", hub._id);
              }}
            >
              <TableCell>{hub.hubName}</TableCell>
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
