import styles from "../../css/gameLegend.module.css";
import React from "react";

export default function GameLegend({ lightMode }) {
  return (
    <div className={styles.legendWrapper}>
      <div
        className={`${styles.legendItem} ${styles.food} ${
          lightMode === true && styles.light
        }`}
      >
        <div className={styles.shape}></div>
        <span>Food (Red Circle)</span>
      </div>
      <div
        className={`${styles.legendItem} ${styles.powerUp} ${styles.green} ${
          lightMode === true && styles.light
        }`}
      >
        <div className={styles.shape}></div>
        <span>Increase Speed (Green Hexagon)</span>
      </div>
      <div
        className={`${styles.legendItem} ${styles.powerUp} ${styles.blue} ${
          lightMode === true && styles.light
        }`}
      >
        <div className={styles.shape}></div>
        <span>Gain Score (Blue Hexagon)</span>
      </div>
      <div
        className={`${styles.legendItem} ${styles.powerUp} ${styles.purple} ${
          lightMode === true && styles.light
        }`}
      >
        <div className={styles.shape}></div>
        <span>Special Power (Purple Hexagon)</span>
      </div>
    </div>
  );
}
