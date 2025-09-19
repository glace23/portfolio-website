//Snake.js
import React from "react";
import styles from "../../css/snake.module.css";
import { GAME_OVER } from "../SnakeGame/constants.jsx";

const Snake = ({ snakeDots, color, route, lightMode }) => {
  return (
    <div>
      {snakeDots.map((dot, i) => {
        const coord = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        const className =
          i === snakeDots.length - 1
            ? [
                styles.snake,
                styles.head,
                route === GAME_OVER ? styles.dead : "",
                lightMode === true ? styles.light : "",
              ].join(" ") //"snake head" + (route === GAME_OVER ? " dead" : "")`
            : //: "snake " + color;
              [
                styles.snake,
                styles.greenyellow,
                lightMode === true ? styles.light : "",
              ].join(" ");
        return <div className={className} key={i} style={coord} />;
      })}
    </div>
  );
};
export default Snake;
