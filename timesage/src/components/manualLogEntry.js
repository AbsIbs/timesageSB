"use client";
import { useContext, useState, useEffect } from "react";
// NextJS
import Link from "next/link";
import { useRouter } from "next/navigation";
// Supabase Logic
import { createEntry, getProjects } from "@/logic/crudLogic";
// UI
import { Modal } from "@mui/material";
import FactCheckIcon from "@mui/icons-material/FactCheck";
import { Snackbar, Alert } from "@mui/material";

const ManualLogEntry = () => {
  // Router
  const router = useRouter();

  const maxDescNum = 100;
  const [desc, setDesc] = useState("");
  const [dateTimeError, setDateTimeError] = useState(false);
  const [projectNameError, setProjectNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [hoursError, setHoursError] = useState();
  const [minutesError, setMinutesError] = useState(false);
  const [secondsError, setSecondsError] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

  // DATETIME
  const [startedAt, setStartedAt] = useState(
    new Date().toISOString().slice(0, 16)
  );

  // TIME
  // Variables
  const [seconds, setSeconds] = useState("");
  const [minutes, setMinutes] = useState("");
  const [hours, setHours] = useState("");

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
    getProjectsHandler();
    console.log("fetched projects");
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
    setProjectNameError(false);
    // Time
    setSecondsError(false);
    setMinutesError(false);
    setHoursError(false);
    const res = await createEntry(details);
    switch (res.type) {
      case "dateTimeError":
        setDateTimeError(true);
        setErrorAlert(true);
        break;
      case "hoursError":
        setHoursError(true);
        setErrorAlert(true);
        break;
      case "minutesError":
        setMinutesError(true);
        setErrorAlert(true);
        break;
      case "secondsError":
        setSecondsError(true);
        setErrorAlert(true);
        break;
      case "totalTimeError":
        setHoursError(true);
        setMinutesError(true);
        setSecondsError(true);
        setErrorAlert(true);
        break;
      case "descError":
        setDescError(true);
        setErrorAlert(true);
        break;
      case "projectError":
        setProjectNameError(true);
        setErrorAlert(true);
        break;
      case "unknownError":
        setErrorAlert(true);
        break;
      case "success":
        setSuccessAlert(true);
        setProject("");
        setDesc("");
        router.push("/dashboard/entries");
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
              <p className="text-3xl">Nice work!</p>
              Let&rsquo;s log your time to a project.
            </div>
            <FactCheckIcon style={{ fontSize: 60 }} />
          </div>
          {/* Form */}
          <form
            action={() => {
              submitHandler({
                seconds: seconds,
                minutes: minutes,
                hours: hours,
                desc: desc,
                project_id: project.id,
                started_at: startedAt,
              });
            }}
            className="flex flex-col gap-8"
          >
            {/* Time header */}
            <div className="flex text-4xl text-primary">
              {/* Hours */}
              <div className="flex flex-col items-center flex-1">
                <input
                  type="number"
                  value={hours}
                  maxLength={2}
                  min={0}
                  placeholder="00"
                  onChange={(event) => {
                    setHours(event.target.value);
                  }}
                  className={`w-full rounded-md border-2 border-line bg-background text-center py-2 ${
                    hoursError ? "border-red-900 text-red-900" : "border-line"
                  }`}
                />
                <p className="text-xs">hr(s)</p>
              </div>
              :{/* Minutes */}
              <div className="flex flex-col items-center flex-1">
                <input
                  type="number"
                  value={minutes}
                  placeholder="00"
                  maxLength={2}
                  min={0}
                  max={59}
                  onChange={(event) => {
                    setMinutes(event.target.value);
                  }}
                  className={`w-full rounded-md border-2 border-line bg-background text-center py-2 ${
                    minutesError ? "border-red-900 text-red-900" : "border-line"
                  }`}
                />
                <p className="text-xs">min(s)</p>
              </div>
              :{/* Seconds */}
              <div className="flex flex-col items-center flex-1">
                <input
                  type="number"
                  placeholder="00"
                  maxLength={2}
                  max={59}
                  min={0}
                  value={seconds}
                  onChange={(event) => {
                    setSeconds(event.target.value);
                  }}
                  className={`w-full rounded-md border-2 border-line bg-background text-center py-2 ${
                    secondsError ? "border-red-900 text-red-900" : "border-line"
                  }`}
                />
                <p className="text-xs">sec(s)</p>
              </div>
            </div>
            <label className="flex flex-col gap-2">
              Started
              <input
                className={`p-2 rounded-md bg-background border-2 border-line ${
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
                onChange={changeHandler}
                className={`p-2 rounded-md bg-background border-2 border-line ${
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
              <Link
                type="button"
                href={"/dashboard/entries"}
                className="flex justify-center items-center border border-line w-24 py-2 rounded-md hover:bg-on-surface hover:text-surface"
              >
                Cancel
              </Link>
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

export default ManualLogEntry;
