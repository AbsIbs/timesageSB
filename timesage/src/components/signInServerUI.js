"use client";
import React from "react";
import { signInClean } from "./signInClean";
import GoogleIcon from "@mui/icons-material/Google";

const SignInServerUI = () => {
  return (
    <form>
      <button
        formAction={() => signInClean()}
        className="flex gap-4 w-full rounded-md border border-line p-4 items-center justify-center"
      >
        <GoogleIcon /> <p>Continue with google</p>
      </button>
    </form>
  );
};

export default SignInServerUI;