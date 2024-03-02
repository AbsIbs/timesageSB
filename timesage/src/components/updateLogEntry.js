"use client";
import { useState, useEffect } from "react";
// NextJS
import { useRouter } from "next/navigation";
// UI
import { Modal } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { Snackbar, Alert } from "@mui/material";
// Logic
import { getProjects } from "@/logic/crudLogic";

const UpdateLogEntry = (props) => {
  const data = props.data;
  // Router
  const router = useRouter();
  useEffect(() => {
    console.log(data.time);
  }, []);

  const maxDescNum = 100;
  const [desc, setDesc] = useState(data.desc);

  // Retrieve the current values from the entry
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  // TIME
  // Variables
  const [hours, setHours] = useState(Math.floor(data.time / 1000 / 60 / 60));
  const [minutes, setMinutes] = useState(Math.floor(data.time / 60000));
  const [seconds, setSeconds] = useState(
    ((data.time % 60000) / 1000).toFixed(0)
  );

  // Numerical validation
  const numberValidation = (value) => {
    const newValue = value.replace(/[^0-9]/g, "");
    return isNaN(Number(newValue)) ? null : Number(newValue);
  };

  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({
    id: data.projectEntriesId,
    name: data.project.name,
  });

  // Modal style
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const getProjectHandler = async () => {
    const res = await getProjects();
    setProjects(res);
  };

  useEffect(() => {
    getProjectHandler();
  }, []);

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
    setNameError(false);
    setTimeError(false);
    /* const res = await updateEntryLogic(details); */
    if (res.type == "timeError") {
      setTimeError(true);
      setErrorAlert(true);
    }
    if (res.type == "descError") {
      setDescError(true);
      setErrorAlert(true);
    } else if (res.type == "nameError") {
      setNameError(true);
      setErrorAlert(true);
    } else if (res.type == "error") {
      setErrorAlert(true);
    } else if (res.type == "success") {
      setSuccessAlert(true);
      setProject("");
      setDesc("");
      props.setModal(false);
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
      <Modal open={true}>
        <div
          style={style}
          className="flex flex-col border-line border bg-surface p-8 rounded-md gap-8 w-[600px]"
        >
          {/* Title */}
          <div className="flex justify-between items-center">
            <div className="flex flex-col gap-2">
              <p className="text-2xl">Update entry</p>
            </div>
            <FactCheckIcon style={{ fontSize: 60 }} />
          </div>
          {/* Form */}
          <form
            action={() => {
              submitHandler({
                id: data.id,
                name: project.name,
                time: 1000 * (seconds + minutes * 60 + hours * 60 * 60),
                desc: desc,
                projectEntriesId: project.id,
              });
            }}
            className="flex flex-col gap-8"
          >
            {/* Time header */}
            <div className="flex text-4xl text-primary">
              {/* Hours */}
              <div className="flex flex-col items-center flex-1">
                <input
                  type="text"
                  value={hours}
                  maxLength={2}
                  placeholder="00"
                  onChange={(event) => {
                    setHours(numberValidation(event.target.value));
                  }}
                  className={`w-full rounded-md border-2 border-line bg-transparent text-center py-2 ${
                    timeError ? "border-red-900 text-red-900" : "border-line"
                  }`}
                />
                <p className="text-xs">hr(s)</p>
              </div>
              :{/* Minutes */}
              <div className="flex flex-col items-center flex-1">
                <input
                  type="text"
                  value={minutes}
                  placeholder="00"
                  maxLength={2}
                  onChange={(event) => {
                    setMinutes(numberValidation(event.target.value));
                  }}
                  className={`w-full rounded-md border-2 border-line bg-transparent text-center py-2 ${
                    timeError ? "border-red-900 text-red-900" : "border-line"
                  }`}
                />
                <p className="text-xs">min(s)</p>
              </div>
              :{/* Seconds */}
              <div className="flex flex-col items-center flex-1">
                <input
                  type="text"
                  placeholder="00"
                  maxLength={2}
                  value={seconds}
                  onChange={(event) => {
                    setSeconds(numberValidation(event.target.value));
                  }}
                  className={`w-full rounded-md border-2 border-line bg-transparent text-center py-2 ${
                    timeError ? "border-red-900 text-red-900" : "border-line"
                  }`}
                />
                <p className="text-xs">sec(s)</p>
              </div>
            </div>
            <label className="flex flex-col gap-2">
              Project
              <select
                value={project.name}
                label="Project"
                onChange={changeHandler}
                className={`p-2 rounded-md bg-surface border-2 border-line ${
                  nameError ? "border-red-900 text-red-900" : "border-line"
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
                onClick={() => props.setModal(false)}
                className="flex justify-center items-center border border-line w-24 py-2 rounded-md hover:bg-on-surface hover:text-surface"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex justify-center items-center bg-primary w-24 py-2 rounded-md text-white"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default UpdateLogEntry;
