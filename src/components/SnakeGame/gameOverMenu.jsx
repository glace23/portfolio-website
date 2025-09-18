import React from "react";
import style from "../../css/gameOver.css";
import { GAME_PAUSED } from "./constants.jsx";

const GameOverMenu = ({ resetGame, route }) => {
  return (
    <div className="pause-overlay">
      <div className="pause-menu">
        <h2>Game Over</h2>
        <button onClick={resetGame}>Restart</button>
      </div>
    </div>
  );
};

export default GameOverMenu;
