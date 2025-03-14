import { useState, } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../../components/ui/table";

const columns = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "uid", header: "UID" },
  { accessorKey: "valid_us_ssn", header: "Valid SSN" },
  { accessorKey: "invalid_us_ssn", header: "Invalid SSN" },
];

const Home = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem("apiData");
    return savedData ? JSON.parse(savedData) : [];
  });
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = () => {
    setLoading(true);
    setError(null);
    const myHeaders = new Headers();
    myHeaders.append("x-apihub-key", "hHfycXQGyez3vn7ADEPmpx4PG6o8kV2ze6QcVjce-jelEHOd1j");
    myHeaders.append("x-apihub-host", "False-Data-API.allthingsdev.co");
    myHeaders.append("x-apihub-endpoint", "98a24028-ad79-425d-acde-492d6fd7220f");

    fetch("https://False-Data-API.proxy-production.allthingsdev.co/api/id_number/random_id_number", {
      method: "GET",
      headers: myHeaders,
    })
      .then((response) => {
        if (!response.ok) {
          
        }
        return response.json();
      })
      .then((result) => {
        const newData = [...data, result];
        setData(newData);
        localStorage.setItem("apiData", JSON.stringify(newData));
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination },
    onPaginationChange: setPagination,
  });

  return (
    <Card className="p-6 w-full max-w-4xl mx-auto mt-6">
      {error && <div className="text-red-500">Error: {error}</div>}
      <Button onClick={fetchData} disabled={loading} className="mb-4">
        {loading ? "Fetching..." : "Fetch Data"}
      </Button>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} onClick={header.column.getToggleSortingHandler()}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between mt-4">
        <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </Card>
  );
};

export default Home;