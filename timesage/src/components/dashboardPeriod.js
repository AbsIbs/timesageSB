"use client";
import { Tabs, Tab } from "@nextui-org/react";

const DashboardPeriod = () => {
  return (
    <Tabs variant="bordered" radius="sm" size="sm" >
      <Tab key="daily" title="Daily" />
      <Tab key="weekly" title="Weekly" />
      <Tab key="monthly" title="Monthly" />
    </Tabs>
  );
};

export default DashboardPeriod;
