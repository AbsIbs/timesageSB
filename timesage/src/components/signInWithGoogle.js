// Supabase
"use client";
// React
import { useEffect } from "react";
// NextJS
import { createClient } from "../../utils/supabase/client";
import { useRouter } from "next/navigation";
// Material UI
import GoogleIcon from "@mui/icons-material/Google";

const SignInWithGoogle = () => {
  const router = useRouter();
  const supabase = createClient();
  const logInWithGoogle = async () => {
    const res = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/signIn/",
      },
    });
    console.log(res);
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      if (event == "SIGNED_IN") {
        router.push("/dashboard");
      }
    });
  }, [supabase]);

  return (
    <form action={logInWithGoogle} className="w-full">
      <button className="flex gap-4 w-full rounded-md border border-line p-4 items-center justify-center bg-background">
        <GoogleIcon /> <p className="text-sm">Continue with Google</p>
      </button>
    </form>
  );
};

export default SignInWithGoogle;
