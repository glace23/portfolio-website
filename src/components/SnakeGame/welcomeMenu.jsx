import React, { useState } from "react";
import styles from "../../css/menu.module.css";

const WelcomeMenu = ({ onStart }) => {
  return (
    <div className={[styles.overlay, styles.welcome].join(" ")}>
      <div className={styles.menu}>
        <h2>Welcome to Snake Game!</h2>
        <p>Press Start to begin playing.</p>
        <button onClick={onStart}>Let's Go</button>
      </div>
    </div>
  );
};

export default WelcomeMenu;
