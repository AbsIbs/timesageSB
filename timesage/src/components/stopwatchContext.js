"use client";
// StopwatchContext.js
import React, { createContext, useState, useEffect } from "react";

const StopwatchContext = createContext();

const StopwatchProvider = ({ children }) => {
  // state to store time
  const [time, setTime] = useState(0);
  // state to store start time
  const [startTime, setStartTime] = useState(null);
  // state to check stopwatch running or not
  const [isRunning, setIsRunning] = useState(false);

  // Method to start and stop timer
  const startAndStop = () => {
    if (!isRunning) {
      setStartTime(Date.now() - time); // Set start time based on current time and elapsed time
    }
    setIsRunning(!isRunning);
  };

  // Method to reset timer back to 0
  const reset = () => {
    setTime(0);
    setStartTime(null);
  };

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (isRunning) {
        const message =
          "You have a running timer. Are you sure you want to leave?";
        event.returnValue = message; // Standard for most browsers
        return message; // For some older browsers
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isRunning]);

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (60 * 60 * 1000));
    const minutes = Math.floor((milliseconds % 3600000) / 60000);
    const seconds = ((milliseconds % 60000) / 1000).toFixed(0);
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  useEffect(() => {
    let interval = null;
    // Update tab title
    const updateTabTitle = () => {
      document.title = `${formatTime(time)}`; // Adjust the title format as needed
    };

    if (isRunning) {
      interval = setInterval(() => {
        setTime(Date.now() - startTime);
        updateTabTitle(); // Calculate elapsed time based on start time
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime, time]);

  return (
    <StopwatchContext.Provider value={{ time, isRunning, startAndStop, reset }}>
      {children}
    </StopwatchContext.Provider>
  );
};

export { StopwatchContext, StopwatchProvider };
