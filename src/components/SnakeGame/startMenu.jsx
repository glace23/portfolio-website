import React, { useState } from "react";
import styles from "../../css/menu.module.css";

const StartMenu = ({ onRouteChange, showSettings, toggleSettings }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.menu}>
        <div className={styles.text}>
          <h2>Start Game</h2>
          <p>Press the Button to Start The Game!</p>
        </div>
        {/* Collapsible settings toggle */}
        <button className={styles.grayButton} onClick={toggleSettings}>
          {showSettings === true ? "Hide Settings" : "Show Settings"}
        </button>
        <button className={styles.greenButton} onClick={onRouteChange}>
          Start
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
