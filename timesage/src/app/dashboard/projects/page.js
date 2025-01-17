// Logic
import { getProjects } from "@/logic/crudLogic";
//Components
import CreateProjectForm from "@/components/createProjectForm";
import ProjectPreview from "@/components/projectPreview";
// NextJS
import Link from "next/link";
// Icons
import AddIcon from "@mui/icons-material/Add";

// Rrun this at the start to get user information
const Projects = async ({ searchParams }) => {
  // Search params
  const showCreateProject = searchParams.createProject;
  const data = await getProjects();

  return (
    <div className="px-10 py-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">Projects ({data?.length}/5)</h1>
        <h2 className="font-light">Create and manage specific projects</h2>
        <div className="py-8 flex flex-col gap-4">
          <Link
            className="h-40 rounded bg-card flex items-center justify-center w-40"
            href={`?createProject=true`}
          >
            <AddIcon sx={{ fontSize: "50px" }} />
          </Link>
          <div
            style={{
              display: "grid",
              gridGap: "2rem",
              gridTemplateColumns: "repeat(auto-fill, 400px)",
            }}
          >
            {data &&
              data.map((item, index) => (
                <div key={item.id}>
                  <ProjectPreview
                    id={item.id}
                    name={item.name}
                    icon={item.icon}
                    desc={item.desc}
                    created_at={item.created_at}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Create Project Modal */}
      {showCreateProject && <CreateProjectForm />}
    </div>
  );
};

export default Projects;
