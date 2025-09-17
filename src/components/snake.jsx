//Snake.js
import React from "react";
import "../css/snake.css";

const Snake = (props) => {
  return (
    <div>
      {props.snakeDots.map((dot, i) => {
        const style = {
          left: `${dot[0]}%`,
          top: `${dot[1]}%`,
        };
        const className =
          i === props.snakeDots.length - 1
            ? "snake head"
            : //: "snake " + props.color;
              "snake greenyellow";
        return <div className={className} key={i} style={style} />;
      })}
    </div>
  );
};
export default Snake;
