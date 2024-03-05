"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const ActivityChart = (props) => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 20
        },
      },
    },
  };

  const data = {
    labels: ["Project 1", "Project 2", "Project 3", "Project 4"],
    datasets: [
      {
        label: "% of hrs",
        data: [12, 19, 3, 5],
        backgroundColor: ["#547EFE", "#F99419", "#26D0FF", "#F2F2F2"],
        borderWidth: 0,
        cutout: "90%",
      },
    ],
  };
  return <Doughnut data={data} options={options} />;
};

export default ActivityChart;
