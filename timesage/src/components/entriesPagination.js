"use client";
import { useState } from "react";
// UI
import { Pagination } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

const EntriesPagination = () => {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const rows = [
    { label: "10", value: 10 },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
  ];
  const variant = "bordered";
  return (
    <div className="py-4 flex justify-between items-center">
      {/* Rows per page selector */}
      <Select
        className="min-w-0 w-40"
        variant={variant}
        label="Rows per page"
        placeholder="25"
      >
        {rows.map((row) => (
          <SelectItem key={row.value} value={row.value}>
            {row.label}
          </SelectItem>
        ))}
      </Select>
      <Pagination isCompact showControls total={10} initialPage={1} />
    </div>
  );
};

export default EntriesPagination;
