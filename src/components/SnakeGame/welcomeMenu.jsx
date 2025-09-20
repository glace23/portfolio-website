import React, { useState } from "react";
import styles from "../../css/menu.module.css";

const WelcomeMenu = ({ onStart }) => {
  return (
    <div className={[styles.overlay, styles.welcomeOverlay].join(" ")}>
      <div className={[styles.menu, styles.welcomeMenu].join(" ")}>
        <div className={styles.text}>
          <h2>🐍 Welcome to the Snake Game!</h2>
          <p>
            📦 This React-based Snake Game features classic snake mechanics,
            multiple gameplay modes, power-ups, a scoreboard, and a responsive
            UI.
          </p>

          <ul>
            <li>
              🎮 <strong>Core Gameplay:</strong> Snake moves continuously, grows
              when eating food, and ends if it collides or goes out-of-bounds.
              Controls: Arrow keys / WASD, pause, restart, and reset.
            </li>
            <li>
              🍎 <strong>Food & Power-Ups:</strong> Random food increases score
              and length. Power-ups: 🟢 increase speed, 🟣 decrease speed, 🔵
              extra points, with time-limited effects.
            </li>
            <li>
              🛠️ <strong>Game Modes:</strong> Normal, Hard (faster, no grid),
              Power-Up mode, and toggleable Grid Lines mode.
            </li>
            <li>
              🖥️ <strong>UI & Visuals:</strong> Responsive game board,
              light/dark mode, scoreboard, and game legend explaining icons.
            </li>
            <li>
              🔧 <strong>Technical Highlights:</strong> Built with React Hooks,
              centralized state management, and CSS Modules for theming and
              responsive design.
            </li>
          </ul>

          <p>
            🎯 Enjoy the game, challenge yourself, and see how real-time React
            game loops and clean UI/UX come together!
          </p>
        </div>
        <button className={styles.grayButton} onClick={onStart}>
          Let's Go
        </button>
      </div>
    </div>
  );
};

export default WelcomeMenu;
