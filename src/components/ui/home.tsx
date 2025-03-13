import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const data = [
  { name: "Sharjeel Ahmad", email: "sharjeelahmad@gmail.com", designation: "Developer" },
  { name: "Ali Khan", email: "alikhan@gmail.com", designation: "Designer" },
  { name: "Ayesha Fatima", email: "ayeshafatima@gmail.com", designation: "Project Manager" },
  { name: "Usman Tariq", email: "usmantariq@gmail.com", designation: "QA Engineer" },
  { name: "Sara Ahmed", email: "saraahmed@gmail.com", designation: "HR Manager" },
  { name: "Bilal Khan", email: "bilalkhan@gmail.com", designation: "Data Analyst" },
  { name: "Zain Malik", email: "zainmalik@gmail.com", designation: "Backend Developer" },
  { name: "Farah Javed", email: "farahjaved@gmail.com", designation: "UI/UX Designer" },
  { name: "Hamza Shahid", email: "hamzashahid@gmail.com", designation: "Software Engineer" },
  { name: "Noor Fatima", email: "noorfatima@gmail.com", designation: "Marketing Manager" },
  { name: "Ahmed Raza", email: "ahmedraza@gmail.com", designation: "System Admin" },
  { name: "Faisal Mehmood", email: "faisalmehmood@gmail.com", designation: "Network Engineer" },
];

const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "designation",
    header: "Designation",
  },
];

const Home = () => {
  
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      
      pagination,
    },
    onPaginationChange: setPagination,
  });

  return (
    <div className="p-4">
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left cursor-pointer"
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === "asc" ? " 🔼" : header.column.getIsSorted() === "desc" ? " 🔽" : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-b">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
