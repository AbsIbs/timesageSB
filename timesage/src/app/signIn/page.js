// Materail UI
import { Box } from "@mui/material";
// Components
import AuthForm from "@/components/authForm";

export const SignIn = async () => {
  return (
    <div className="flex flex-1 h-screen items-center justify-center">
      <AuthForm />
    </div>
  );
};

export default SignIn;
