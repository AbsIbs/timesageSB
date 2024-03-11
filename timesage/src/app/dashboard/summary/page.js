import React from "react";
// Components
import SummaryCard from "@/components/summaryCard";
import DashboardPeriod from "@/components/dashboardPeriod";
import SummaryActivity from "@/components/summaryActivity";

const Summary = () => {
  return (
    <div className="px-10 py-6 flex flex-col gap-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">Summary</h1>
        <h2 className="font-light">
          Visualize your productivity with a detailed summary
        </h2>
      </div>
      {/* Content container */}
      <div className="flex flex-col gap-2">
        {/* Period */}
        <DashboardPeriod />
        {/* Cards and graphs container */}
        <div className="flex flex-row gap-4">
          {/* Left side */}
          <div className="flex flex-col flex-1 gap-2">
            {/* BANS */}
            <div className="flex flex-row gap-4">
              <SummaryCard
                icon="time"
                header="Productivity"
                BAN={12.5}
                BANlabel={"hrs"}
                subheader={"20% increase from last month"}
                color={"primary"}
                target={"20 hours"}
              />
              <SummaryCard
                icon="time"
                header="Productivity"
                BAN={12.5}
                BANlabel={"hrs"}
                subheader={"20% increase from last month"}
                color={"danger"}
                target={"20 hours"}
              />
              <SummaryCard
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
            <SummaryActivity />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
