import React from "react";
import s from "../css/SnakeGame.module.css";

const Food = (props) => {
  const offset = (props.cellSize - props.foodSize) / 2; // 0.125%

  const style = {
    left: `${props.dot[0] + offset}%`,
    top: `${props.dot[1] + offset}%`,
  };
  return <div className={s.food} style={style} />;
};

export default Food;
