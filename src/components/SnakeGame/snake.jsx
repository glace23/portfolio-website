//Snake.js
import React from "react";
import "../../css/snake.css";

const Snake = ({ snakeDots, color }) => {
  return (
    <div>
      {snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        const className =
          i === snakeDots.length - 1
            ? "snake head"
            : //: "snake " + color;
              "snake greenyellow";
        return <div className={className} key={i} style={style} />;
      })}
    </div>
  );
};
export default Snake;
