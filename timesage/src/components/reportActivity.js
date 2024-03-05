// NextJS
import Link from "next/link";
// Components
import ActivityChart from "./activityChart";

const ReportActivity = () => {
  return (
    <div className="flex flex-col bg-card rounded-md p-6 gap-8">
      {/* Header */}
      <div className="flex flex-row justify-between">
        <p className="text-2xl">Activity</p>
        <Link
          href={"/dashboard/reports"}
          className="flex rounded-full p-2 border border-line"
        >
          <p className="text-sm px-2">View all</p>
        </Link>
      </div>
      {/* Activity Chart */}
      <ActivityChart label={"My label"} subtitle={'subtitle'} />
    </div>
  );
};

export default ReportActivity;
