import React from "react";
import styles from "../../css/scoreboard.module.css";

const ScoreBoard = ({ score, highScore, allTimeHighScore }) => {
  const formattedAllTimeHigh = allTimeHighScore || 0;

  return (
    <div className={styles.scoreboardContainer}>
      <div className={styles.scoreItem}>
        <span>Score:</span> <strong>{score}</strong>
      </div>
      <div className={styles.scoreItem}>
        <span>High Score:</span> <strong>{highScore}</strong>
      </div>
      <div className={styles.scoreItem}>
        <span>All Time:</span> <strong>{formattedAllTimeHigh}</strong>
      </div>
    </div>
  );
};

export default ScoreBoard;
