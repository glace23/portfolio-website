import { useState } from "react";
import styles from "../../css/menu.module.css";
import SwitchToggle from "./switchToggle.jsx";
import { useSettingsMenu } from "./hooks/useSettingsMenu.jsx";
import {
  GAME_MENU,
  GAME_OVER,
  GAME_PAUSED,
  GAME_IN_PROCESS,
} from "../SnakeGame/constants.jsx";

const SettingsMenu = ({
  handleLightModeToggle,
  lightMode,
  handleHardModeToggle,
  hardMode,
  route,
  onMouseMove,
  onKeyDown,
  showSettings,
}) => {
  const [isLightModeOn, setIsLightModeOn] = useState(lightMode);
  const [isHardModeOn, setIsHardModeOn] = useState(lightMode);
  const { isVisible, fadeClass } = useSettingsMenu(showSettings);

  const handleLightModeChange = (e) => {
    const newValue = e.target.checked;
    setIsLightModeOn(newValue); // update local state
    handleLightModeToggle(newValue); // send value to parent
  };

  const handleHardModeChange = (e) => {
    const newValue = e.target.checked;
    setIsHardModeOn(newValue); // update local state
    handleHardModeToggle(newValue); // send value to parent
  };

  if (!isVisible) return null;

  return (
    <div
      className={[styles.settingsMenu, styles[fadeClass]].join(" ")}
      onMouseMove={onMouseMove}
      onKeyDown={onKeyDown}
    >
      <h3>Settings</h3>
      {(route === GAME_MENU || route === GAME_OVER) && <p>FULL SETTINGS</p>}
      {(route === GAME_PAUSED || route === GAME_IN_PROCESS) && (
        <p>PARTIAL SETTINGS</p>
      )}
      <SwitchToggle
        label="Light Mode"
        checked={isLightModeOn}
        onChange={handleLightModeChange}
      />
      {(route === GAME_MENU || route === GAME_OVER) && (
        <SwitchToggle
          label="Hard Mode"
          checked={isHardModeOn}
          onChange={handleHardModeChange}
        />
      )}
    </div>
  );
};

export default SettingsMenu;
