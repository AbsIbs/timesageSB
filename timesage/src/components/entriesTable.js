"use client";
//React
import { useState } from "react";
// Components
import UpdateLogEntry from "./updateLogEntry";
import DeleteEntryUI from "./deleteEntryUI";
import EntriesPagination from "./entriesPagination";
// Material UI
import { Modal } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EntriesTable = (props) => {
  // Modals
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Store the data in a state
  const [selectedEntry, setSelectedEntry] = useState("");
  const columns = ["DATE", "PROJECT", "DURATION", ""];

  // FORMATTING
  const formatDate = (timestamp) => {
    const dateObject = new Date(timestamp);
    const formattedDate = dateObject.toISOString().split("T")[0];
    return formattedDate;
  };

  const formatDuration = (duration) => {
    // Hours
    const hours = Math.floor(duration / 3600000)
      .toString()
      .padStart(2, "0");
    // Minutes calculation
    const minutes = Math.floor((duration % 3600000) / 60000)
      .toString()
      .padStart(2, "0");
    return `${hours} hr ${minutes}m`;
  };

  const HandleEdit = (row) => {
    setShowEditModal(true);
    setSelectedEntry(row);
  };

  const HandleDelete = (row) => {
    setShowDeleteModal(true);
    setSelectedEntry(row);
  };

  return (
    <>
      {/* Edit Modal */}
      <Modal open={showEditModal} onClose={() => setShowEditModal(false)}>
        <div>
          <UpdateLogEntry data={selectedEntry} setModal={setShowEditModal} />
        </div>
      </Modal>
      {/* Delete Modal */}
      <Modal open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <div>
          <DeleteEntryUI id={selectedEntry.id} setModal={setShowDeleteModal} />
        </div>
      </Modal>
      {/* Content */}
      <TableContainer
        sx={{ maxHeight: 450 }}
        className="border-line border rounded-md"
      >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableCell
                  className="bg-card text-on-surface border-line"
                  key={index}
                  align={"left"}
                  /* style={{ minWidth: column.minWidth }} */
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.map((row, index) => {
              return (
                <TableRow
                  hover
                  key={row.id}
                  className={`${index % 2 == 0 ? "" : "bg-card"}`}
                >
                  <TableCell className="text-on-surface border-0">
                    {formatDate(row.started_at)}
                  </TableCell>
                  <TableCell className="text-on-surface border-0">
                    {row.project.name}
                  </TableCell>
                  <TableCell className="text-on-surface border-0">
                    {formatDuration(row.time)}
                  </TableCell>
                  <TableCell className="text-on-surface border-0 w-20">
                    <div className="flex-row flex gap-2">
                      <button onClick={() => HandleEdit(row)}>
                        <EditIcon />
                      </button>
                      <button onClick={() => HandleDelete(row)}>
                        <DeleteIcon />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <EntriesPagination total={props.total} />
    </>
  );
};

export default EntriesTable;
