"use client";
import { useState } from "react";
// UI
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Alert, Snackbar, CircularProgress } from "@mui/material";
// Logic
import { deleteProject } from "@/logic/crudLogic";

const DeleteProjectUI = (props) => {
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const handleSubmission = async (id) => {
    setErrorAlert(false);
    setSuccessAlert(false);
    setLoading(true);
    try {
      const res = await deleteProject(id);
      if (res?.type == "error") {
        setErrorAlert(true);
      } else {
        setSuccessAlert(true);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Delete Button */}
      <button
        onClick={() => setDeleteModal(true)}
        className="flex flex-1 py-2 px-4 items-center justify-center border border-red-900 rounded-md text-red-900 hover:bg-red hover:bg-red-900 hover:border-red-900 hover:text-white"
      >
        Delete
      </button>
      {/* Modal */}
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
          Project edited!
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
          Oops! There was a problem with deleting your project
        </Alert>
      </Snackbar>
      {/* Delete modal */}
      <Modal open={deleteModal}>
        <div
          style={style}
          className="bg-surface py-8 px-16 rounded-lg flex flex-col gap-8 w-100"
        >
          {/* Loading mmodal */}
          <Modal open={loading} className="flex items-center justify-center">
            <CircularProgress />
          </Modal>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <p>
              Are you sure you would like to delete this project? This will
              delete ALL entries related to the project.
            </p>
          </Typography>
          <form
            action={() => {
              handleSubmission(props.id);
            }}
          >
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setDeleteModal(false)}
                className="py-2 rounded-md border-2 border-line flex flex-1 justify-center items-center "
              >
                On second thought...
              </button>
              <button
                type="submit"
                className="py-2 rounded-md bg-red-900 text-white flex flex-1 justify-center items-center"
              >
                Yes
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default DeleteProjectUI;
