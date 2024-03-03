"use client";
import { useState, useEffect } from "react";
// NextJS
import { useRouter, usePathname } from "next/navigation";
// UI
import Modal from "@mui/material/Modal";
import { Alert, Snackbar, CircularProgress } from "@mui/material";
// Logic
import { deleteProject } from "@/logic/crudLogic";

const DeleteProjectUI = (props) => {
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    console.log(path);
  }, []);

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
        /* If the user is inside a project then we reroute them back to all projects */
        if (path != "/dashboard/projects") {
          router.push("/dashboard/projects");
        }
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
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="text-3xl">Delete project</p>
              <p>
                Deleting it will delete ALL of its associated entries. THIS
                CANNOT BE REVERSED!
              </p>
            </div>
          </div>
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
                No
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
