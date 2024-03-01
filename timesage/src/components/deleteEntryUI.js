"use client";
import React from "react";
import { useState } from "react";
// Material UI
import { Snackbar, Alert } from "@mui/material";
// Logic
import { deleteEntry } from "@/logic/crudLogic";

const DeleteEntryUI = (props) => {
  // Alerts
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const HandleDelete = async (id) => {
    console.log(id)
    setSuccessAlert(false);
    setErrorAlert(false);
    try {
      const res = await deleteEntry(id);
      if (res.type == "success") {
        setSuccessAlert(true);
        props.setModal(false);
      } else {
        setErrorAlert(true);
      }
    } catch (e) {
      setErrorAlert(true);
      console.log(e);
    }
  };

  // Delete Modal style
  const deleteModalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <>
      {/* Success alert */}
      <Snackbar
        open={successAlert}
        autoHideDuration={6000}
        onClose={() => setSuccessAlert(false)}
      >
        <Alert
          onClose={() => setSuccessAlert(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Project added!
        </Alert>
      </Snackbar>
      {/* Error alert */}
      <Snackbar
        open={errorAlert}
        autoHideDuration={6000}
        onClose={() => setErrorAlert(false)}
      >
        <Alert
          onClose={() => setErrorAlert(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Oops! There was a problem with deleting your entry
        </Alert>
      </Snackbar>
      {/* Content */}
      <div
        style={deleteModalStyle}
        className="flex flex-col border-line border bg-surface p-8 rounded-md gap-10 w-[600px]"
      >
        {/* Title */}
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-2">
            <p className="text-3xl">Delete entry</p>
            <p>Are you sure you want to delete your entry?</p>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-row w-full gap-4">
          <button
            onClick={() => props.setModal(false)}
            className="py-3 border border-line flex-1 rounded-md hover:bg-on-surface hover:text-surface"
          >
            <p className="text-sm">Cancel</p>
          </button>
          <button
            onClick={() => HandleDelete(props.id)}
            className="py-3 flex-1 rounded-md bg-red-900 "
          >
            <p className="text-sm">Delete</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default DeleteEntryUI;
