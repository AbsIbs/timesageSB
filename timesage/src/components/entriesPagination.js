"use client";
import { useState, useEffect } from "react";
// NextJS
import { useRouter, useSearchParams } from "next/navigation";
// UI
import { Pagination } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";

const EntriesPagination = (props) => {
  // Router config
  const router = useRouter();
  const params = useSearchParams();

  const minRows = 10;

  const handleChangePage = (newPage) => {
    router.push(
      `/dashboard/entries/?page=${newPage}&perPage=${
        params.get("perPage") || minRows
      }`
    );
  };

  // Create a state and use it as the key for the pagination component
  const [seed, setSeed] = useState(1);
  // When the key changes, the state is reset
  const reset = () => {
    setSeed(Math.random());
  };
  const handleChangeRowsPerPage = (event) => {
    router.push(`/dashboard/entries/?page=1&perPage=${event.target.value}`);
    // After the rows per page is changed, the pagination component is reset. Resetting the UI as well
    reset();
  };

  const rowOptions = [
    { label: "5", value: 5 },
    { label: minRows.toString(), value: minRows },
    { label: "25", value: 25 },
    { label: "50", value: 50 },
  ];
  const variant = "bordered";
  const totalPages = Math.ceil(
    props.total / (params.get("perPage") || minRows)
  );
  useEffect(() => {
    console.log(props.total);
  }, []);
  return (
    <div className="py-4 flex justify-between items-center">
      {/* Rows per page selector */}
      <Select
        className="min-w-0 w-[140px]"
        variant={variant}
        label="Rows per page"
        placeholder={params.get("perPage") || minRows.toString()}
        value={parseInt(params.get("perPage")) || minRows}
        onChange={(e) => handleChangeRowsPerPage(e)}
      >
        {rowOptions.map((row) => (
          <SelectItem key={row.value} value={row.value}>
            {row.label}
          </SelectItem>
        ))}
      </Select>
      <Pagination
        key={seed}
        isCompact
        onChange={(num) => handleChangePage(num)}
        showControls
        total={totalPages}
      />
    </div>
  );
};

export default EntriesPagination;
