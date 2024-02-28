"use server";
// Supabase
import { createClient } from "../../utils/supabase/server";

const SignInWithGoogle = async () => {
  /*    // Initialise supabase client
    const supabase = createClient();
    // Sign in with google
    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    console.log(res); */
  console.log("server function");
};

export default SignInWithGoogle;
