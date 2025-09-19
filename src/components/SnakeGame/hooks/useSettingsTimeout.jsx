import { useRef, useEffect, useState } from "react";
import { SETTINGS_MENU_TIMEOUT, initialState } from "../constants.jsx";

export function useSettingsTimeout() {
  const [showSettings, setShowSettings] = useState(initialState.showSettings);
  const timeoutRef = useRef(null);

  const resetTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(
      () => setShowSettings(false),
      SETTINGS_MENU_TIMEOUT
    );
  };

  const toggleSettings = () => setShowSettings((prev) => !prev);

  useEffect(() => {
    if (showSettings) resetTimer();
    return () => clearTimeout(timeoutRef.current);
  }, [showSettings]);

  return {
    showSettings,
    toggleSettings,
    bindSettingsEvents: {
      onMouseMove: resetTimer,
      onKeyDown: resetTimer,
    },
  };
}
