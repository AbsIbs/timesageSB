"use client";
import React from "react";
import { createClient } from "../../utils/supabase/client";

const SignIn = () => {
  const supabase = createClient();
  const logInWithGoogle = () => {
    supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  return <button onClick={() => logInWithGoogle()}>SignIn</button>;
};

export default SignIn;
