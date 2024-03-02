"use client";
import { useState, useEffect } from "react";
// UI
import { Modal } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { Snackbar, Alert } from "@mui/material";
// Logic
import { getProjects, updateEntry } from "@/logic/crudLogic";

const UpdateLogEntry = (props) => {
  const data = props.data;

  const maxDescNum = 100;
  const [desc, setDesc] = useState(data.desc);

  const formatDate = (dateString) => {
    try {
      // Parse the date-time string
      const dateObj = new Date(dateString);

      // Format the date components
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Add leading zero for single-digit months
      const day = String(dateObj.getDate()).padStart(2, "0");

      // Format the time components
      const hours = String(dateObj.getHours()).padStart(2, "0");
      const minutes = String(dateObj.getMinutes()).padStart(2, "0");

      // Construct the formatted date-time string
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    } catch (error) {
      console.error("Error converting date-time:", error);
      return null; // Or return a default value if conversion fails
    }
  };
  const [startedAt, setStartedAt] = useState(formatDate(data.started_at));

  // Retrieve the current values from the entry
  const [dateTimeError, setDateTimeError] = useState(false);
  const [nameProjectError, setProjectError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [timeError, setTimeError] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  // TIME
  // Variables
  const [hours, setHours] = useState(Math.floor(data.time / 1000 / 60 / 60));
  const [minutes, setMinutes] = useState(
    Math.floor((data.time % 3600000) / 60000)
  );
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
    id: data.project_id,
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

  const projectChangeHandler = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const selectedId = selectedOption.getAttribute("id");
    setProject({
      id: selectedId,
      name: e.target.value,
    });
  };

  const submitHandler = async (details) => {
    setDescError(false);
    setProjectError(false);
    setTimeError(false);
    console.log(details);
    const res = await updateEntry(details);
    switch (res.type) {
      case "dateTimeError":
        setDateTimeError(true);
        setErrorAlert(true);
        break;
      case "timeError":
        setTimeError(true);
        setErrorAlert(true);
        break;
      case "descError":
        setDescError(true);
        setErrorAlert(true);
        break;
      case "projectError":
        setProjectError(true);
        setErrorAlert(true);
        break;
      case "unknownError":
        setErrorAlert(true);
        break;
      case "success":
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
                time:
                  hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000,
                desc: desc,
                project_id: project.id,
                started_at: startedAt,
              });
            }}
            className="flex flex-col gap-8"
          >
            {/* Time container */}
            <div className="flex text-4xl items-center text-primary gap-2">
              {/* Hours */}
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-xs">Hour(s)</p>
                <input
                  type="number"
                  value={hours}
                  maxLength={2}
                  min={0}
                  placeholder="00"
                  onChange={(event) => {
                    setHours(numberValidation(event.target.value));
                  }}
                  className={`w-full rounded-md border-2 border-line bg-transparent text-center py-2 ${
                    timeError ? "border-red-900 text-red-900" : "border-line"
                  }`}
                />
              </div>
              :{/* Minutes */}
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-xs">Minute(s)</p>
                <input
                  type="number"
                  value={minutes}
                  placeholder="00"
                  maxLength={2}
                  min={0}
                  max={59}
                  onChange={(event) => {
                    setMinutes(numberValidation(event.target.value));
                  }}
                  className={`w-full rounded-md border-2 border-line bg-transparent text-center py-2 ${
                    timeError ? "border-red-900 text-red-900" : "border-line"
                  }`}
                />
              </div>
              :{/* Seconds */}
              <div className="flex flex-col gap-1 flex-1">
                <p className="text-xs">Second(s)</p>
                <input
                  type="number"
                  placeholder="00"
                  maxLength={2}
                  min={0}
                  max={59}
                  value={seconds}
                  onChange={(event) => {
                    setSeconds(numberValidation(event.target.value));
                  }}
                  className={`w-full rounded-md border-2 border-line bg-transparent text-center py-2 ${
                    timeError ? "border-red-900 text-red-900" : "border-line"
                  }`}
                />
              </div>
            </div>
            <label className="flex flex-col gap-2">
              Entry Date
              <input
                className={`p-2 rounded-md bg-surface border-2 border-line ${
                  dateTimeError ? "border-red-900 text-red-900" : "border-line"
                }`}
                value={startedAt}
                type="datetime-local"
                name="entryDate"
                onChange={(event) => {
                  setStartedAt(event.target.value);
                  console.log(event.target.value);
                }}
              />
            </label>
            <label className="flex flex-col gap-2">
              Project
              <select
                value={project.name}
                label="Project"
                onChange={projectChangeHandler}
                className={`p-2 rounded-md bg-surface border-2 border-line ${
                  nameProjectError
                    ? "border-red-900 text-red-900"
                    : "border-line"
                }`}
              >
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
