// NextJS
import Link from "next/link";
// Graphql Logic
import { getEntries } from "@/logic/crudLogic";
// Components
import Loading from "./loading";
import EntriesTable from "@/components/entriesTable";
import ManualLogEntry from "@/components/manualLogEntry";
// Icons
import AddIcon from "@mui/icons-material/Add";
import ErrorIcon from "@mui/icons-material/Error";

const Entries = async ({ searchParams }) => {
  const page = searchParams.page || 0;
  const perPage = searchParams.perPage || 5;
  // Get data
  const data = await getEntries();
  console.log(data)
  // Show manual entry
  const showManualEntry = searchParams.manualAddEntry;

  return (
    <>
      <div className="flex flex-col gap-8 px-10 py-6 flex-1">
        <div className="flex justify-between items-center">
          <div className="flex-col gap-1">
            <h1 className="text-3xl">Entries</h1>
            <h2 className="font-light">Review your most recent entries</h2>
          </div>
          <Link
            href={`?manualAddEntry=true`}
            className="flex py-2 px-4 bg-surface border border-line rounded-md gap-2"
          >
            <AddIcon />
            <p>Manual log</p>
          </Link>
        </div>
        {/* Table */}
        {data.length > 0 ? (
          <EntriesTable data={data} />
        ) : (
          <div className="w-full flex flex-col gap-4 items-center justify-center py-20">
            <ErrorIcon sx={{ width: 80, height: 80 }} />
            <p className="text-sm">Nothing yet! Add some entries to view them here</p>
          </div>
        )}
      </div>
      {/* Show the manual entry modal */}
      {showManualEntry && <ManualLogEntry />}
    </>
  );
};

export default Entries;
