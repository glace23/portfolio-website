import React from "react";
import s from "../../css/SnakeGame.module.css";
import { GRID_SIZE, CELL_SIZE } from "./constants.jsx";

export const getRandomFood = () => {
  const maxCells = GRID_SIZE / CELL_SIZE;
  const x = Math.floor(Math.random() * maxCells) * CELL_SIZE;
  const y = Math.floor(Math.random() * maxCells) * CELL_SIZE;
  return [x, y];
};

export const Food = ({ dot, cellSize, foodSize }) => {
  const offset = (cellSize - foodSize) / 2; // 0.125%

  const style = {
    left: `${dot[0] + offset}%`,
    top: `${dot[1] + offset}%`,
  };
  return <div className={s.food} style={style} />;
};
