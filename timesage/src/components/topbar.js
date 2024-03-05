// Components
import { ThemeSwitcher } from "./themeSwitcher";
import SignOut from "./signOut";
import GetUsername from "./getUsername";

const Topbar = () => {
  return (
    <>
      <div className="gap-4 px-10 w-full py-4 sticky top-0 items-center justify-end flex bg-background border-b border-line z-10">
        <GetUsername />
        <ThemeSwitcher />
        <SignOut />
      </div>
    </>
  );
};

export default Topbar;
