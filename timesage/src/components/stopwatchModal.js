"use client";
import { useContext, useState, useEffect, useRef } from "react";
// Logic
import { createEntry, getProjects } from "@/logic/crudLogic";
// UI
import { Modal } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { Snackbar, Alert } from "@mui/material";
// Stopwatch Modal Context
import { StopwatchModalContext } from "./stopwatchModalContext";
import { StopwatchContext } from "./stopwatchContext";

const StopwatchModal = () => {
  const prevShowModalRef = useRef(false);

  const maxDescNum = 100;

  const [desc, setDesc] = useState("");
  const [projectNameError, setProjectNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  const { showModal, setShowModal } = useContext(StopwatchModalContext);

  const { time } = useContext(StopwatchContext);

  // Hours calculation
  const hours = Math.floor(time / 360000);

  // Minutes calculation
  const minutes = Math.floor((time % 360000) / 6000);

  // Seconds calculation
  const seconds = Math.floor((time % 6000) / 1000);

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState("");

  // Modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const getProjectsHandler = async () => {
    const projects = await getProjects();
    setProjects(projects);
  };

  useEffect(() => {
    if (showModal && !prevShowModalRef.current) {
      getProjectsHandler();
      console.log("fetched projects");
    }
    prevShowModalRef.current = showModal;
  }, [showModal]);

  const changeHandler = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedId = selectedOption.getAttribute("id");
    setProject({
      id: selectedId,
      name: e.target.value,
    });
  };

  const submitHandler = async (details) => {
    setDescError(false);
    setProjectNameError(false);
    const res = await createEntry(details);
    switch (res.type) {
      case "projectError":
        setProjectNameError(true);
        setErrorAlert(true);
        break;
      case "descError":
        setDescError(true);
        setErrorAlert(true);
        break;
      case "unknownError":
        setErrorAlert(true);
        break;
      case "success":
        setSuccessAlert(true);
        setProject("");
        setDesc("");
        setShowModal(false);
    }
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
          Entry added!
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
          Oops! There was a problem with adding your entry.
        </Alert>
      </Snackbar>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <div
          style={style}
          className="flex flex-col border-line border bg-surface p-8 rounded-md gap-8 w-[600px]"
        >
          {/* Title */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="text-3xl">Nice work!</p>
              Let&rsquo;s log your time to a project.
            </div>
            <FactCheckIcon style={{ fontSize: 60 }} />
          </div>
          {/* Time header */}
          <div className="flex text-4xl text-primary">
            {/* Hours */}
            <div className="flex flex-col items-center flex-1">
              <p>{hours.toString().padStart(2, "0")}</p>
              <p className="text-xs">hr</p>
            </div>
            :{/* Minutes */}
            <div className="flex flex-col items-center flex-1">
              <p>{minutes.toString().padStart(2, "0")}</p>
              <p className="text-xs">min</p>
            </div>
            :{/* Seconds */}
            <div className="flex flex-col items-center flex-1">
              <p>{seconds.toString().padStart(2, "0")}</p>
              <p className="text-xs">sec</p>
            </div>
          </div>
          {/* Form */}
          <form
            action={() => {
              submitHandler({
                name: project.name,
                time: time,
                desc: desc,
                id: project.id,
              });
            }}
            className="flex flex-col gap-8"
          >
            <label className="flex flex-col gap-2">
              Project
              <select
                value={project.name}
                label="Project"
                onChange={changeHandler}
                className={`p-2 rounded-md bg-surface border-2 border-line ${
                  projectNameError
                    ? "border-red-900 text-red-900"
                    : "border-line"
                }`}
              >
                <option value="">Select a project</option>
                {projects.map((item) => {
                  return (
                    <option key={item.id} value={item.name} id={item.id}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label className="flex flex-col gap-2">
              Description
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
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex justify-center items-center border border-line w-24 py-2 rounded-md hover:bg-on-surface hover:text-surface"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex justify-center items-center bg-primary w-24 py-2 rounded-md text-white"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default StopwatchModal;
