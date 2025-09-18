//Snake.js
import React from "react";
import styles from "../../css/snake.module.css";
import { GAME_OVER } from "../SnakeGame/constants.jsx";

const Snake = ({ snakeDots, color, route }) => {
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
              ].join(" ") //"snake head" + (route === GAME_OVER ? " dead" : "")`
            : //: "snake " + color;
              [styles.snake, styles.greenyellow].join(" ");
        return <div className={className} key={i} style={coord} />;
      })}
    </div>
  );
};
export default Snake;
