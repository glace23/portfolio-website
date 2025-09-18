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
            Your Score is {score}
            <br />
            Your High Score for this Session is {highScore}
            <br />
            {allTimeHighScore - score > 0 &&
              `You are ${
                allTimeHighScore - score
              } Snack(s) away from the All Time High Score!`}
            {allTimeHighScore - score == 0 &&
              `You tied the All Time High Score!`}
            {allTimeHighScore - score < 0 &&
              `You beat the All Time High Score by ${
                score - allTimeHighScore
              } Snack(s)!`}
          </p>
        </div>
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
