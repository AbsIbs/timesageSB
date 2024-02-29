/* "use client";
// Supabase
import { createClient } from "../../utils/supabase/client";
// Material UI
import GoogleIcon from "@mui/icons-material/Google";

const SignInWithGoogle = async () => {
  const supabase = createClient();
  const logInWithGoogle = async () => {
    const res = supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(res);
  };
  return (
    <button
      onClick={() => logInWithGoogle()}
      className="flex gap-4 w-full rounded-md border border-line p-4 items-center justify-center"
    >
      <GoogleIcon /> <p>Continue with google</p>
    </button>
  );
};

export default SignInWithGoogle;
 */
/* import React from "react";
// Supabase
import { createClient } from "../../utils/supabase/client";
// Material UI
import GoogleIcon from "@mui/icons-material/Google";

const SignInWithGoogle = () => {
  const supabase = createClient();
  const logInWithGoogle = async () => {
    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };
  return (
    <button
      onClick={() => logInWithGoogle()}
      className="flex gap-4 w-full rounded-md border border-line p-4 items-center justify-center"
    >
      <GoogleIcon /> <p>Continue with google</p>
    </button>
  );
};

export default SignInWithGoogle; */

// Supabase
"use client"
// NextJS
import { createClient } from "../../utils/supabase/client";
// Material UI
import GoogleIcon from "@mui/icons-material/Google";

const SignInWithGoogle = async () => {
  const supabase = createClient();
  const logInWithGoogle = async () => {
    const res = supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: 'http://localhost:3000/signIn/'
      }
    });
    console.log(res);
  };
  return (
    <form action={logInWithGoogle} className="w-full">
      <button className="flex gap-4 w-full rounded-md border border-line p-4 items-center justify-center">
        <GoogleIcon /> <p>Continue with google</p>
      </button>
    </form>
  );
};

export default SignInWithGoogle;

/* "use client";
// Material UI
import GoogleIcon from "@mui/icons-material/Google";
import { signInClean } from "./signInClean";

const SignInWithGoogle = async () => {
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

export default SignInWithGoogle;
 */