import { useState } from "react";

export default function useVisualMode(initialMode) {
  const [mode, setMode] = useState(initialMode);
  const [history, setHistory] = useState([initialMode]);

  const transition = function(newMode, replace = false) {
    setMode(newMode);
    if (!replace) {
      setHistory(prev => [...prev, newMode]);
    } else {
      setHistory(prev => [...prev.slice(0, -1), newMode]);
    }
  }

  const back = function() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => [...prev.slice(0, -1)]);
    }
  }

  return { mode, transition, back };
}