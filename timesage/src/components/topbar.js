// Components
import { ThemeSwitcher } from "./themeSwitcher";
import SignOut from "./signOut";
import GetUsername from "./getUsername";

const Topbar = () => {
  return (
    <>
      <div className="gap-4 px-4 w-full py-10 h-16 sticky top-0 items-center justify-end flex bg-surface border-b border-line z-10">
        <GetUsername />
        <ThemeSwitcher />
        <SignOut />
      </div>
    </>
  );
};

export default Topbar;
