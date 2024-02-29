// NextJS
import { redirect } from "next/navigation";
// Supabase
import { createClient } from "../../../utils/supabase/server";
// Components
import AuthForm from "@/components/authForm";
import SignInServerUI from "@/components/signInServerUI";

export const SignIn = async () => {
  // Auth check
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(data);
  if (data.user) {
    // Redirect user to the dashboard if they are signed in
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-1 h-screen items-center justify-center">
      {/* <SignInServerUI /> */}
      <AuthForm />
    </div>
  );
};

export default SignIn;
