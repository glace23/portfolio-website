import { useEffect, useState } from "react";
import styles from "../../css/menu.module.css";
import SwitchToggle from "./switchToggle.jsx";
import { useSettingsMenu } from "./hooks/useSettingsMenu.jsx";
import { GAME_PAUSED, GAME_IN_PROCESS } from "../SnakeGame/constants.jsx";

const SettingsMenu = ({
  handleLightModeToggle,
  lightMode,
  handleHardModeToggle,
  hardMode,
  powerUpMode,
  handlePowerUpModeToggle,
  gridLinesMode,
  handleGridLinesMode,
  route,
  onMouseMove,
  onKeyDown,
  showSettings,
}) => {
  const [isLightModeOn, setIsLightModeOn] = useState(lightMode);
  const [isHardModeOn, setIsHardModeOn] = useState(hardMode);
  const [isPowerUpModeOn, setIsPowerUpModeOn] = useState(powerUpMode);
  const [isGridLinesModeOn, setIsGridLinesModeOn] = useState(gridLinesMode);
  const { isVisible, fadeClass } = useSettingsMenu(showSettings);
  const disabled =
    route === GAME_PAUSED || route === GAME_IN_PROCESS ? true : false;

  useEffect(() => {
    setIsGridLinesModeOn(gridLinesMode);
  }, [gridLinesMode]);

  const handleLightModeChange = (e) => {
    const newValue = e.target.checked;
    setIsLightModeOn(newValue); // update local state
    handleLightModeToggle(newValue); // send value to parent
  };

  const handleHardModeChange = (e) => {
    const newValue = e.target.checked;
    setIsHardModeOn(newValue); // update local state
    handleHardModeToggle(newValue); // send value to parent

    // set grid lines to false
    setIsGridLinesModeOn(false); // update local state
    handleGridLinesMode(false); // send value to parent
  };

  const handlePowerUpModeChange = (e) => {
    const newValue = e.target.checked;
    setIsPowerUpModeOn(newValue); // update local state
    handlePowerUpModeToggle(newValue); // send value to parent
  };

  const handleGridLinesModeChange = (e) => {
    const newValue = e.target.checked;
    setIsGridLinesModeOn(newValue); // update local state
    handleGridLinesMode(newValue); // send value to parent
  };

  if (!isVisible) return null;

  return (
    <div
      className={[styles.settingsMenu, styles[fadeClass]].join(" ")}
      onMouseMove={onMouseMove}
      onKeyDown={onKeyDown}
    >
      <h3>Settings</h3>
      <p>GENERAL SETTINGS</p>
      <SwitchToggle
        label="Light Mode"
        checked={isLightModeOn}
        onChange={handleLightModeChange}
        disabled={false}
      />
      <SwitchToggle
        id="gridModeToggle"
        label="Grid Mode"
        checked={isGridLinesModeOn}
        onChange={handleGridLinesModeChange}
        disabled={isHardModeOn}
      />
      <br></br>
      <p>IN-GAME SETTINGS</p>
      <SwitchToggle
        label="Hard Mode"
        checked={isHardModeOn}
        onChange={handleHardModeChange}
        disabled={disabled}
      />
      <SwitchToggle
        label="Power Ups"
        checked={isPowerUpModeOn}
        onChange={handlePowerUpModeChange}
        disabled={disabled}
      />
    </div>
  );
};

export default SettingsMenu;
