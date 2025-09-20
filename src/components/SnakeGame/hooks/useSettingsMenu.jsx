import { useState, useEffect } from "react";

export const useSettingsMenu = (showSettings) => {
  const [isVisible, setIsVisible] = useState(showSettings);
  const [fadeClass, setFadeClass] = useState(
    showSettings === true ? "fadeIn" : "fadeOut"
  );

  useEffect(() => {
    if (showSettings) {
      setIsVisible(true);
      setFadeClass("fadeIn");
    } else {
      setFadeClass("fadeOut");
      const timer = setTimeout(() => setIsVisible(false), 300); // match CSS transition
      return () => clearTimeout(timer);
    }
  }, [showSettings]);

  return { isVisible, fadeClass };
};
