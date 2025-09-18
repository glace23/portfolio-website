import React from "react";
import styles from "../../css/menu.module.css";

const StartMenu = ({ onRouteChange }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.menu}>
        <div className={styles.text}>
          <h2>Start Game</h2>
          <p>Press the Button to Start The Game!</p>
        </div>
        <button className={styles.greenButton} onClick={onRouteChange}>
          Start
        </button>
      </div>
    </div>
  );
};

export default StartMenu;
