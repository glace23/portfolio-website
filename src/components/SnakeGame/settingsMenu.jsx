import React, { useState } from "react";
import styles from "../../css/menu.module.css";
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

  return (
    <div
      className={[
        styles.settingsMenu,
        showSettings === false ? styles.fadeOut : "",
        showSettings === true ? styles.fadeIn : "",
      ].join(" ")}
      onMouseMove={onMouseMove}
      onKeyDown={onKeyDown}
    >
      <h3>Settings</h3>
      {(route === GAME_MENU || route === GAME_OVER) && <p>FULL SETTINGS</p>}
      {(route === GAME_PAUSED || route === GAME_IN_PROCESS) && (
        <p>PARTIAL SETTINGS</p>
      )}
      <div className={styles.switchContainer}>
        <label className={styles.switch}>
          <span className={styles.labelText}>Light Mode</span>
          <input
            type="checkbox"
            checked={isLightModeOn}
            onChange={handleLightModeChange}
          />
          <span className={[styles.slider, styles.round].join(" ")}></span>
          <span className={styles.labelText}>
            {isLightModeOn ? "On" : "Off"}
          </span>
        </label>
      </div>
      {(route === GAME_MENU || route === GAME_OVER) && (
        <div className={styles.switchContainer}>
          <label className={styles.switch}>
            <span className={styles.labelText}>Hard Mode</span>
            <input
              type="checkbox"
              checked={isHardModeOn}
              onChange={handleHardModeChange}
            />
            <span className={[styles.slider, styles.round].join(" ")}></span>
            <span className={styles.labelText}>
              {isHardModeOn ? "On" : "Off"}
            </span>
          </label>
        </div>
      )}
    </div>
  );
};

export default SettingsMenu;
