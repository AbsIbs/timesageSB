"use client";
import { useState } from "react";
// Material UI
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { Alert, CircularProgress, Snackbar } from "@mui/material";
// NextJS
import Link from "next/link";
import { useRouter } from "next/navigation";
// Logic
import SignInWithGoogle from "./signInWithGoogle";

const AuthForm = () => {
  // States
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

  const style = {
    position: "absolute",
    width: 600,
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: `var(--surface)`,
    padding: 4,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  return (
    <Box sx={style}>
      {/* Loading */}
      <div>
        <Modal open={loading} className="flex items-center justify-center">
          <CircularProgress />
        </Modal>
      </div>
      {/* Sign in with google */}
      <SignInWithGoogle />
      <hr className="border-line" />
      {/* Email and password form */}
      <form
        action={() => {
          setLoading(true);
          submitHandler({
            name: name,
            desc: desc,
            icon: icon,
          });
        }}
        className="flex gap-8 flex-col"
      >
        <label htmlFor="name" className=" flex flex-col gap-2">
          <p className="text-sm font-light">Email address</p>
          <input
            name="email"
            maxLength={maxNameNum}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ backgroundColor: "#121212" }}
            className={`p-4 rounded-md border ${
              nameError ? "border-red-900 text-red-900" : "border-line"
            }`}
          />
        </label>
        <label htmlFor="desc" className="flex flex-col gap-2">
          <p className="text-sm font-light">Password</p>
          <input
            name="desc"
            maxLength={maxDescNum}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            style={{ backgroundColor: "#121212" }}
            className={`p-4 rounded-md bg-background border border-line ${
              descError ? "border-red-900 text-red-900" : "border-line"
            }`}
          />
        </label>
        <div className="flex flex-col gap-4">
          <button
            variant="outlined"
            className="p-4 w-100 rounded-md bg-primary font-medium text-white"
            type="submit"
          >
            Sign in
          </button>
        </div>
      </form>
    </Box>
  );
};

export default AuthForm;
