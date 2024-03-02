"use client";
import { useState } from "react";
import {
  Pagination,
} from "@nextui-org/react";

const EntriesPagination = () => {
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return <Pagination isCompact showControls total={10} initialPage={1} />;
};

export default EntriesPagination;
