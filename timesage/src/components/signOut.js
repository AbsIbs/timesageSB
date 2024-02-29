"use client";
import React from "react";
// Supabase
import { logout } from "@/logic/authLogic";

const SignOut = () => {
  return (
    <form>
      <button
        className="px-4 py-2 border-2 border-line rounded-md flex gap-2"
        formAction={() => logout()}
      >
        Sign out
      </button>
    </form>
  );
};

export default SignOut;