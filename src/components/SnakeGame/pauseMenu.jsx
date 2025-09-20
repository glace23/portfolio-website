import React from "react";
import styles from "../../css/menu.module.css";
import { GAME_PAUSED } from "./constants.jsx";

const PauseMenu = ({
  onRouteChange,
  route,
  restartGame,
  resetGame,
  showSettings,
  toggleSettings,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.menu}>
        <div className={styles.text}>
          <h2>Game Paused</h2>
          <p>
            Press "P" to resume
            <br></br>
            Press "R" to restart
            <br></br>
            Or Click on the Buttons!
          </p>
        </div>
        <button className={styles.grayButton} onClick={toggleSettings}>
          {showSettings ? "Hide Settings" : "Show Settings"}
        </button>
        <button className={styles.purpleButton} onClick={onRouteChange}>
          Resume
        </button>
        <button className={styles.yellowButton} onClick={restartGame}>
          Restart
        </button>
        <button className={styles.redButton} onClick={() => resetGame()}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default PauseMenu;
