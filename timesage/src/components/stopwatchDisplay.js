"use client";
// TimerDisplay.js
import { useContext, useEffect } from "react";
import { StopwatchContext } from "./stopwatchContext";
import { StopwatchModalContext } from "./stopwatchModalContext";
import Snackbar from "@mui/material/Snackbar";
// Icons
import ReplayIcon from "@mui/icons-material/Replay";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import AddIcon from "@mui/icons-material/Add";

const StopwatchDisplay = () => {
  const { time, isRunning, startAndStop, reset } = useContext(StopwatchContext);
  const { setShowModal } = useContext(StopwatchModalContext);

  // Hours calculation
  const hours = Math.floor(time / 3600000); // Fixed this line to use 3600000 instead of 360000

  // Minutes calculation
  const minutes = Math.floor((time % 3600000) / 60000);

  // Seconds calculation
  const seconds = ((time % 60000) / 1000).toFixed(0);

  const submitHandler = () => {
    setShowModal(true);
  };

  return (
    <Snackbar
      open={true}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <div
        className="flex flex-col gap-4 bg-card p-4 rounded-md"
        style={{ width: 200 }}
      >
        {/* Top section */}
        <div className="flex text-4xl">
          {/* Hours */}
          <div className="flex flex-col items-center flex-1">
            <p>{hours.toString().padStart(2, "0")}</p>
            <p className="text-xs">hr</p>
          </div>
          :{/* Minutes */}
          <div className="flex flex-col items-center flex-1">
            <p>{minutes.toString().padStart(2, "0")}</p>
            <p className="text-xs">min</p>
          </div>
          :{/* Seconds */}
          <div className="flex flex-col items-center flex-1">
            <p>{seconds.toString().padStart(2, "0")}</p>
            <p className="text-xs">sec</p>
          </div>
        </div>
        {/* Button section */}
        <div className="flex gap-4 items-center justify-center">
          <button
            className="flex items-center justify-center border border-line rounded-full p-2"
            onClick={reset}
          >
            <ReplayIcon />
          </button>
          <button
            onClick={startAndStop}
            className={`flex rounded-full ${
              isRunning ? "bg-red-900" : "bg-green-900"
            } p-4 items-center justify-center`}
          >
            {isRunning ? (
              <StopIcon style={{ color: "white" }} />
            ) : (
              <PlayArrowIcon style={{ color: "white" }} />
            )}
          </button>
          {!isRunning && seconds > 0 ? (
            <button
              onClick={submitHandler}
              className="p-2 flex justify-center items-center bg-blue-900 rounded-full"
            >
              <AddIcon style={{ color: "white" }} />
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Snackbar>
  );
};

export default StopwatchDisplay;
