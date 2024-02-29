"use client";
import { useState } from "react";
// UI
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const TimeSelector = () => {
  const [type, setType] = useState("stopwatch");
  const changeHandler = (event, value) => {
    setType(value);
  };
  const CustomerTab = (props) => {
    return <>{props.type == type && <div>{props.body}</div>}</>;
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={type}
          onChange={changeHandler}
          aria-label="timer-stopwatch switcher"
          TabIndicatorProps={{ style: { backgroundColor: `var(--primary)` } }}
          
        >
          <Tab
            label="Stopwatch"
            value={"stopwatch"}
            className="text-xs"
            disableRipple
          />
          <Tab
            label="Timer"
            value={"timer"}
            className="text-xs"
            disableRipple
          />
        </Tabs>
      </Box>
      <CustomerTab type={"stopwatch"} body={"this is stopwatch"} />
      <CustomerTab type={"timer"} body={"this is timer"} />
    </Box>
  );
};

export default TimeSelector;
