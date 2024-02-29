// Components
import EntriesTable from "@/components/entriesTable";
// Backend logic
import { getProject } from "@/logic/crudLogic";
/* import { projectEntriesLogic } from "@/logic/entriesLogic"; */
// Icons
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import CodeIcon from "@mui/icons-material/Code";
import EventIcon from "@mui/icons-material/Event";
// UI
/* import UpdateProjectUI from "@/components/updateProjectUI"; */
import DeleteProjectUI from "@/components/deleteProjectUI";

const Page = async (searchParams) => {
  const id = searchParams.params.id;
  console.log(id)
  const project = await getProject(id);
/*   const resEntries = await projectEntriesLogic(id);
  const data = resEntries?.items; */
  console.log(project);
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
          <div className="flex w-full justify-between">
            <div className="flex gap-4 items-center justify-center">
              {icons[project.icon]}
              <h1 className="font-medium text-xl">
                {project.name}
              </h1>
            </div>
            <div className="flex gap-2">
{/*               <UpdateProjectUI
                name={project?.data.getProject?.name}
                desc={project?.data.getProject?.desc}
                icon={project?.data.getProject?.icon}
                id={project?.data.getProject?.id}
              /> */}
              <DeleteProjectUI id={id} />
            </div>
          </div>
          {/* <EntriesTable data={data} type={'projects'} /> */}
        </div>
      )}
    </>
  );
};

export default Page;
