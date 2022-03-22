// Custom hook for switching states of Appointment components
import { useState } from "react";

export default function useVisualMode(initialMode) {
  // Current mode of the component
  const [mode, setMode] = useState(initialMode);
  // Array of mode history
  const [history, setHistory] = useState([initialMode]);

  // Switch to a new mode from current mode
  const transition = function(newMode, replace = false) {
    setMode(newMode);
    // Optional replace parameter set to true then replace the current mode in history
    if (!replace) {
      setHistory(prev => [...prev, newMode]);
    } else {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    }
  }

  // Go back to the previous mode in history
  const back = function() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => [...prev.slice(0, -1)]);
    }
  }

  // Return the value of current mode and methods to switch to new mode and go back to previous mode
  return { mode, transition, back };
}