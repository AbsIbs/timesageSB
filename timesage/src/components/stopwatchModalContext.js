"use client";
// StopwatchModalContext.js
import { createContext, useState } from "react";

const StopwatchModalContext = createContext();

const StopwatchModalProvider = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <StopwatchModalContext.Provider value={{ showModal, setShowModal }}>
      {children}
    </StopwatchModalContext.Provider>
  );
};

export { StopwatchModalContext, StopwatchModalProvider };