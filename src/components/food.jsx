import React from "react";
import s from "../css/SnakeGame.module.css";

const Food = (props) => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`,
  };
  return <div className={s.food} style={style} />;
};

export default Food;
