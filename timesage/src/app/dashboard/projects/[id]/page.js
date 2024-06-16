// NextJS
import Link from "next/link";
// Components
import EntriesTable from "@/components/entriesTable";
// Backend logic
import {
  getProject,
  getProjectEntries,
  getTotalEntries,
} from "@/logic/crudLogic";
// Icons
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CodeIcon from "@mui/icons-material/Code";
import EventIcon from "@mui/icons-material/Event";
import ErrorIcon from "@mui/icons-material/Error";
// UI
import UpdateProjectUI from "@/components/updateProjectUI";
import DeleteProjectUI from "@/components/deleteProjectUI";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const Page = async (searchParams) => {
  // Project Information
  const id = searchParams.params.id;
  const project = await getProject(id);
  // Pagination settings
  const page = searchParams.searchParams.page || 1;
  const perPage = searchParams.searchParams.perPage || 10;
  // Total entries
  const total = await getTotalEntries(id);
  // Paginated data
  const data = await getProjectEntries({
    id: id,
    page: page,
    perPage: perPage,
  });

  const icons = {
    work: <WorkIcon sx={{ fontSize: "50px" }} />,
    school: <SchoolIcon sx={{ fontSize: "50px" }} />,
    libraryBooks: <LibraryBooksIcon sx={{ fontSize: "50px" }} />,
    code: <CodeIcon sx={{ fontSize: "50px" }} />,
    event: <EventIcon sx={{ fontSize: "50px" }} />,
  };
  return (
    <>
      {project && (
        <div className="px-10 py-6 flex flex-col gap-10">
          {/* Header */}
          <div className="flex flex-col gap-4">
            <Link href="/dashboard/projects" className="flex gap-1">
              <KeyboardBackspaceIcon />
              <p>back</p>
            </Link>
            <div className="flex w-full justify-between">
              <div className="flex gap-4 items-center justify-center">
                {icons[project.icon]}
                <h1 className="font-medium text-xl">{project.name}</h1>
              </div>
              <div className="flex gap-2">
                <UpdateProjectUI
                  name={project.name}
                  desc={project.desc}
                  icon={project.icon}
                  id={project.id}
                />
                <DeleteProjectUI id={id} />
              </div>
            </div>
          </div>

          {/* Table */}
          {data.length > 0 ? (
            <div className="flex flex-col">
              <EntriesTable data={data} total={total} />
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4 items-center justify-center py-20">
              <ErrorIcon sx={{ width: 80, height: 80 }} />
              <p className="text-sm">
                Nothing yet! Add some entries to view them here
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Page;
