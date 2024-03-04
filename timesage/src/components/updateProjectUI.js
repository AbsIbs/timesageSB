"use client";
import { useState } from "react";
// UI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Alert, Snackbar } from "@mui/material";
// Icons
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CodeIcon from "@mui/icons-material/Code";
import EventIcon from "@mui/icons-material/Event";
// Logic
import { updateProject } from "@/logic/crudLogic";

const UpdateProjectUI = (props) => {
  const [name, setName] = useState(props.name);
  const [desc, setDesc] = useState(props.desc);
  const [icon, setIcon] = useState(props.icon);
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [iconError, setIconError] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const maxNameNum = 30;
  const maxDescNum = 100;
  // Alerts
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

  const icons = {
    work: <WorkIcon fontSize="large" />,
    school: <SchoolIcon fontSize="large" />,
    libraryBooks: <LibraryBooksIcon fontSize="large" />,
    code: <CodeIcon fontSize="large" />,
    event: <EventIcon fontSize="large" />,
  };

  const iconsArray = ["work", "school", "libraryBooks", "code", "event"];

  const style = {
    position: "absolute",
    width: 600,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 4,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  };

  const submitHandler = async (details) => {
    setNameError(false);
    setDescError(false);
    const res = await updateProject(details);
    switch (res.type) {
      case "nameError":
        setNameError(true);
        setErrorAlert(true);
        break;
      case "descError":
        setDescError(true);
        setErrorAlert(true);
        break;
      case "iconError":
        setNameError(true);
        setErrorAlert(true);
        break;
      case "success":
        setSuccessAlert(true);
        setShowModal(false);
    }
  };

  const cancelHandler = async () => {
    setShowModal(false);
    setDesc(props.desc);
    setName(props.name);
    setIcon(props.icon);
  };

  return (
    <>
      {/* Edit Button */}
      <button
        onClick={() => setShowModal(true)}
        className="flex flex-1 py-2 px-8 items-center justify-center bg-on-surface rounded-md text-surface text-sm font-semibold"
      >
        Edit
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
          Oops! There was a problem with editing your project
        </Alert>
      </Snackbar>
      <Modal open={showModal}>
        <Box sx={style} className={"bg-surface"}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit project
          </Typography>
          <form
            action={() =>
              submitHandler({
                name: name,
                desc: desc,
                icon: icon,
                id: props.id,
              })
            }
            className="flex flex-col"
          >
            <label htmlFor="projectIcon" className="py-6 flex flex-col gap-2">
              Choose an icon
              <div className="flex gap-2">
                {iconsArray.map((name, index) => {
                  return (
                    <button
                      key={index}
                      name="icon"
                      type={"button"}
                      onClick={() => setIcon(name)}
                      className={`flex justify-center bg-background items-center p-6 rounded-md border-2 ${
                        name == icon ? `border-primary` : `border-line`
                      }`}
                    >
                      {icons[name]}
                    </button>
                  );
                })}
              </div>
            </label>
            <label htmlFor="name" className="py-2 flex flex-col gap-2">
              Project name
              <input
                name="name"
                maxLength={maxNameNum}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`p-2 rounded-md bg-background border-2 ${
                  nameError ? "border-red-900 text-red-900" : "border-line"
                }`}
                placeholder="Learning python"
              />
              <div
                className={`flex justify-end ${
                  nameError ? "text-red-900 font-medium" : ""
                }`}
              >
                {name.length}/{maxNameNum}
              </div>
            </label>
            <label htmlFor="desc" className="py-2 flex flex-col gap-2">
              Project description
              <textarea
                name="desc"
                maxLength={maxDescNum}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className={`p-2 rounded-md bg-background border-2 border-line ${
                  descError ? "border-red-900 text-red-900" : "border-line"
                }`}
                placeholder="Learning python through youtube videos and udemy courses."
              ></textarea>
              <div
                className={`flex justify-end ${
                  descError ? "text-red-900 font-medium" : ""
                }`}
              >
                {desc.length}/{maxDescNum}
              </div>
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => cancelHandler()}
                type="button"
                className="border-2 border-line rounded-md py-2 px-4"
              >
                Cancel
              </button>
              <button
                className="py-2 px-6 rounded-md bg-primary font-medium text-white"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateProjectUI;
