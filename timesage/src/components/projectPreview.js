// NextJS
import Link from "next/link";
// Components
import DeleteProjectUI from "./deleteProjectUI";
// Icons
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CodeIcon from "@mui/icons-material/Code";
import EventIcon from "@mui/icons-material/Event";

const ProjectPreview = (props) => {
  const icons = {
    work: <WorkIcon sx={{ fontSize: "45px" }} />,
    school: <SchoolIcon sx={{ fontSize: "45px" }} />,
    libraryBooks: <LibraryBooksIcon sx={{ fontSize: "45px" }} />,
    code: <CodeIcon sx={{ fontSize: "45px" }} />,
    event: <EventIcon sx={{ fontSize: "45px" }} />,
  };

  const maxTextLength = 30;
  const truncate = (text) => {
    if (text.length > maxTextLength) {
      return text.substring(0, maxTextLength) + "...";
    }
    return text;
  };

  // Format the date according to the desired format
  // Parse the ISO 8601 string
  const date = new Date(props.created_at);

  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="bg-surface p-6 flex flex-col rounded border-line border gap-6 w-[400px]">
        <div className="flex gap-4">
          <div className="border border-line p-6 rounded-full flex items-center justify-center">
            {icons[props.icon]}
          </div>
          <div className="flex flex-col gap-0.5 justify-center">
            <p className="text-xs">{formattedDate}</p>
            <p className="text-lg font-medium">{truncate(props.name)}</p>
          </div>
        </div>
        {/* <p>{props.desc}</p> */}
        <div className="flex gap-2">
          <Link
            href={`/dashboard/projects/${props.id}`}
            className="flex flex-1 py-2 px-4 items-center justify-center bg-on-surface rounded-md text-surface font-semibold"
          >
            View
          </Link>
          <DeleteProjectUI id={props.id} />
        </div>
      </div>
    </>
  );
};

export default ProjectPreview;
