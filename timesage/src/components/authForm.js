// Material UI
import { Box } from "@mui/material";
// Components
import SignInWithGoogle from "./signInWithGoogle";
import SignInWithGitHub from "./signInWithGitHub";

const AuthForm = () => {
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
    gap: "16px",
  };

  return (
    <Box className={"bg-surface"} sx={style}>
      <SignInWithGoogle />
      <SignInWithGitHub />
    </Box>
  );
};

export default AuthForm;
