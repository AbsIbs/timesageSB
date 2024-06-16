import GitHubIcon from "@mui/icons-material/GitHub";
import { Popover, PopoverTrigger, PopoverContent } from "@nextui-org/popover";

const SignInWithGitHub = () => {
  return (
    <form className="w-full">
      <Popover placement="right">
        <PopoverTrigger>
          <button
            type="button"
            className="flex gap-4 w-full rounded-md border border-line p-4 items-center justify-center bg-background"
          >
            <GitHubIcon /> <p className="text-sm">Continue with GitHub</p>
          </button>
        </PopoverTrigger>
        <PopoverContent>
          <div className="px-1 py-2">
            <div className="text-small font-bold">Future Content</div>
            <div className="text-tiny">Coming soon!</div>
          </div>
        </PopoverContent>
      </Popover>
    </form>
  );
};

export default SignInWithGitHub;
