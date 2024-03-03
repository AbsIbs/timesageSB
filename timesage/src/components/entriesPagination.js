"use client";
import { useState, useEffect } from "react";
// NextJS
import { useRouter, useSearchParams } from "next/navigation";
// UI
import { Pagination } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

const EntriesPagination = () => {
  // Router config
  const router = useRouter();
  const params = useSearchParams();

  const handleChangePage = (newPage) => {
    router.push(`/dashboard/entries/?page=${newPage}`);
  };

  const handleChangeRowsPerPage = (event) => {
    router.push(`/dashboard/entries/?page=0&perPage=${event.target.value}`);
  };

  const rowOptions = [
    { label: "10", value: 10 },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
  ];
  const variant = "bordered";
  return (
    <div className="py-4 flex justify-between items-center">
      {/* Rows per page selector */}
      <Select
        className="min-w-0 w-[140px]"
        variant={variant}
        label="Rows per page"
        placeholder={params.get("perPage") || "25"}
        value={parseInt(params.get("perPage")) || 25}
        onChange={(e) => handleChangeRowsPerPage(e)}
      >
        {rowOptions.map((row) => (
          <SelectItem key={row.value} value={row.value}>
            {row.label}
          </SelectItem>
        ))}
      </Select>
      <Pagination
        isCompact
        onChange={(num) => handleChangePage(num)}
        showControls
        total={10}
        initialPage={1}
      />
    </div>
  );
};

export default EntriesPagination;
