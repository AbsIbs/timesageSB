import React from "react";
// Components
import ReportCard from "@/components/reportCard";
import DashboardPeriod from "@/components/dashboardPeriod";
import ReportActivity from "@/components/reportActivity";

const Reports = () => {
  return (
    <div className="px-10 py-6 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">Reports</h1>
        <h2 className="font-light">
          Visualize your productivity with detailed reports
        </h2>
      </div>
      {/* Content container */}
      <div className="flex flex-row gap-4">
        {/* Left side */}
        <div className="flex flex-col flex-1 gap-2">
          <DashboardPeriod />
          {/* BANS */}
          <div className="flex flex-row gap-4">
            <ReportCard
              icon="time"
              header="Productivity"
              BAN={12.5}
              BANlabel={"hrs"}
              subheader={"20% increase from last month"}
              color={"primary"}
              target={"20 hours"}
            />
            <ReportCard
              icon="time"
              header="Productivity"
              BAN={12.5}
              BANlabel={"hrs"}
              subheader={"20% increase from last month"}
              color={"danger"}
              target={"20 hours"}
            />
            <ReportCard
              icon="time"
              header="Productivity"
              BAN={12.5}
              BANlabel={"hrs"}
              subheader={"20% increase from last month"}
              color={"secondary"}
              target={"20 hours"}
            />
          </div>
        </div>
        {/* Right side */}
        <div className="flex flex-col gap-4">
          {/* Activity  */}
          <ReportActivity />
        </div>
      </div>
    </div>
  );
};

export default Reports;