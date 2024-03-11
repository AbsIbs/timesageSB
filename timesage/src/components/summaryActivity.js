// NextJS
import Link from "next/link";
// Components
import ActivityChart from "./activityChart";

const SummaryActivity = () => {
  return (
    <div className="flex flex-col bg-card rounded-md p-6 gap-8">
      {/* Header */}
      <div className="flex flex-row justify-between">
        <p className="text-xl">Activity</p>
        <Link
          href={"/dashboard/summary"}
          className="flex rounded-full p-2 border border-line"
        >
          <p className="text-[12px] px-2">View all</p>
        </Link>
      </div>
      {/* Activity Chart */}
      <ActivityChart label={"My label"} subtitle={'subtitle'} />
      <hr className="border-line"/>
    </div>
  );
};

export default SummaryActivity;
