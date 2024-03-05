"use client";
import { useEffect } from "react";
/* MUI X */
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";

const ActivityChart = (props) => {
  const data = [
    { value: 5, label: "Project A" },
    { value: 10, label: "Project B" },
    { value: 15, label: "Project C" },
    { value: 20, label: "Project D" },
  ];

  const size = {
    width: 400,
    height: 200,
  };

  const StyledText = styled("text")(() => ({
    textAnchor: "middle",
    dominantBaseline: "central",
  }));

  const PieCenterLabel = ({ title, subtitle }) => {
    const { width, height, left, top } = useDrawingArea();

    // Calculate Y positions for title and subtitle based on chart height
    const titleY = top + height / 2 - 10; // Adjust -10 for spacing
    const subtitleY = top + height / 2 + 10; // Adjust +10 for spacing

    return (
      <g>
        <StyledText
          x={left + width / 2}
          y={titleY}
          fontSize="24px"
          className="dark:fill-white"
        >
          {title}
        </StyledText>
        <StyledText
          x={left + width / 2}
          y={subtitleY}
          fontSize="12px"
          className="dark:fill-white font-light"
        >
          {subtitle}
        </StyledText>
      </g>
    );
  };

  return (
    <PieChart
      series={[{ data, innerRadius: 85 }]}
      {...size}
      sx={{
        "& .css-1mhcdve-MuiPieArc-root": { stroke: "none" },
      }}
    >
      <PieCenterLabel title={props.label} subtitle={props.subtitle} />
    </PieChart>
  );
};

export default ActivityChart;
