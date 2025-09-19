import React from "react";
import styles from "../../css/menu.module.css";
import {
  GAME_PAUSED,
  SNAKE_OUT_OF_BOUNDS,
  SNAKE_COLLISION,
} from "./constants.jsx";

const GameOverMenu = ({
  resetGame,
  restartGame,
  route,
  gameEndReason,
  score,
  highScore,
  allTimeHighScore,
  showSettings,
  toggleSettings,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.menu}>
        <div className={styles.text}>
          <h2>Game Over</h2>
          {gameEndReason === SNAKE_OUT_OF_BOUNDS && (
            <p>~Stop Hitting The Wall~</p>
          )}
          {gameEndReason === SNAKE_COLLISION && <p>~Stop Hitting Yourself~</p>}
          <p>
            Your Score is{" "}
            <em>
              <b>{score}</b>
            </em>
            <br />
            Your High Score for this Session is{" "}
            <em>
              <b>{highScore}</b>
            </em>
            <br />
            {allTimeHighScore - score > 0 && (
              <>
                You are{" "}
                <em>
                  <b>{allTimeHighScore - score}</b>
                </em>{" "}
                Snack(s) away from the All Time High Score!
              </>
            )}
            {allTimeHighScore - score == 0 &&
              `You tied the All Time High Score!`}
            {allTimeHighScore - score < 0 && (
              <>
                You beat the All Time High Score by{" "}
                <em>
                  <b>{score - allTimeHighScore}</b>
                </em>{" "}
                Snack(s)!
              </>
            )}
          </p>
        </div>
        <button className={styles.grayButton} onClick={toggleSettings}>
          {showSettings ? "Hide Settings" : "Show Settings"}
        </button>
        <button className={styles.yellowButton} onClick={() => restartGame()}>
          Restart
        </button>
        <button className={styles.redButton} onClick={() => resetGame()}>
          Exit
        </button>
      </div>
    </div>
  );
};

export default GameOverMenu;
