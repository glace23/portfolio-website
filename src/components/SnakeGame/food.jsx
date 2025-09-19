import React from "react";
import styles from "../../css/food.module.css";
import { GRID_SIZE, CELL_SIZE } from "./constants.jsx";

export const getRandomFood = (snakeDots) => {
  const maxCells = GRID_SIZE / CELL_SIZE;
  let x, y;
  let isOnSnake = true;

  while (isOnSnake) {
    x = Math.floor(Math.random() * maxCells) * CELL_SIZE;
    y = Math.floor(Math.random() * maxCells) * CELL_SIZE;
    isOnSnake = snakeDots.some((dot) => dot[0] === x && dot[1] === y);
  }
  return [x, y];
};

export const Food = ({ dot, cellSize, foodSize, lightMode }) => {
  const offset = (cellSize - foodSize) / 2; // 0.125%

  const coord = {
    left: `${dot[0] + offset}%`,
    top: `${dot[1] + offset}%`,
  };
  return (
    <div
      className={[styles.food, lightMode === true ? styles.light : ""].join(
        " "
      )}
      style={coord}
    />
  );
};
