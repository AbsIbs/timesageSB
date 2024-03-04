"use client";
// React
import { useState, useEffect } from "react";
// UI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
// NextJS
import Link from "next/link";
import { useRouter } from "next/navigation";
// Icons
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CodeIcon from "@mui/icons-material/Code";
import EventIcon from "@mui/icons-material/Event";
// Server actions
import { createProject } from "@/logic/crudLogic";

const CreateProjectForm = () => {
  const router = useRouter();
  const maxNameNum = 30;
  const maxDescNum = 100;

  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState("work");
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [nameError, setNameError] = useState(false);
  const [descError, setDescError] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);

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
    const res = await createProject(details);
    if (res.type == "error") {
      setNameError(res.name);
      setDescError(res.desc);
      setErrorAlert(true);
      setLoading(false);
    } else {
      setLoading(false);
      setSuccessAlert(true);
      router.push("/dashboard/projects");
    }
  };

  useEffect(() => {
    console.log(loading);
  }, [loading]);

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
          Oops! There was a problem with creating your project
        </Alert>
      </Snackbar>
      <Modal aria-labelledby="unstyled-modal-title" open={true}>
        <Box sx={style} className={"bg-surface"}>
          {/* Loading */}
          <div>
            <Modal open={loading} className="flex items-center justify-center">
              <CircularProgress />
            </Modal>
          </div>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Let&rsquo;s create a project
          </Typography>
          <form
            action={() => {
              setLoading(true);
              submitHandler({
                name: name,
                desc: desc,
                icon: icon,
              });
            }}
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
                      onClick={() => setIcon(name)}
                      type="button"
                      className={`bg-background flex justify-center items-center p-6 rounded-md border-2 ${name==icon? 'border-primary': 'border-line'}`}
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
              <Link
                href={"/dashboard/projects"}
                variant="outlined"
                className="border-2 flex items-center justify-center border-line rounded-md py-2 w-24"
              >
                Cancel
              </Link>
              <button
                variant="outlined"
                className="py-2 w-24 rounded-md bg-primary font-medium text-white"
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

export default CreateProjectForm;
