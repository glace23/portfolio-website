import styles from "../../css/item.module.css";
import {
  GRID_SIZE,
  CELL_SIZE,
  INCREASE_SPEED_POWER_UP,
  DECREASE_SPEED_POWER_UP,
  GAIN_SCORE_POWER_UP,
} from "./constants.jsx";

export const getRandomPowerUp = (snakeDots, powerUps) => {
  const maxCells = GRID_SIZE / CELL_SIZE;
  let x, y;
  let isOnSnake = true;
  let isSamePos = powerUps.length === 0 ? false : true;

  while (isOnSnake || isSamePos) {
    x = Math.floor(Math.random() * maxCells) * CELL_SIZE;
    y = Math.floor(Math.random() * maxCells) * CELL_SIZE;
    for (let i = 0; i < snakeDots.length; i++) {
      if (snakeDots[i][0] === x && snakeDots[i][1] === y) {
        isOnSnake = true;
        break;
      } else {
        isOnSnake = false;
      }
    }
    for (let j = 0; j < powerUps.length; j++) {
      if (powerUps[j].position[0] === x && powerUps[j].position[1] === y) {
        isSamePos = true;
        break;
      } else {
        isSamePos = false;
      }
    }
  }
  return [x, y];
};

export const PowerUp = ({
  dot,
  cellSize,
  powerUpType,
  powerUpSize,
  lightMode,
}) => {
  const offset = (cellSize - powerUpSize) / 2; // 0.125%
  const powerUpColors = {
    [INCREASE_SPEED_POWER_UP]: styles.green,
    [DECREASE_SPEED_POWER_UP]: styles.yellow,
    [GAIN_SCORE_POWER_UP]: styles.blue,
  };

  const color = powerUpColors[powerUpType];

  const coord = {
    left: `${dot[0] + offset}%`,
    top: `${dot[1] + offset}%`,
  };
  return (
    <div
      className={[
        styles.powerUp,
        color,
        lightMode === true ? styles.light : "",
      ].join(" ")}
      style={coord}
    />
  );
};
