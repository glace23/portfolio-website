//Snake.js
import React from "react";
import "../../css/snake.css";
import { GAME_OVER } from "../SnakeGame/constants.jsx";

const Snake = ({ snakeDots, color, route }) => {
  return (
    <div>
      {snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        const className =
          i === snakeDots.length - 1
            ? "snake head" + (route === GAME_OVER ? " dead" : "")
            : //: "snake " + color;
              "snake greenyellow";
        return <div className={className} key={i} style={style} />;
      })}
    </div>
  );
};
export default Snake;
