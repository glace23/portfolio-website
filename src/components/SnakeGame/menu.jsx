import React from "react";
import style from "../../css/menu.module.css";

const Menu = ({ onRouteChange }) => {
  return (
    <div className={style.wrapper}>
      <div>
        <input
          onClick={onRouteChange}
          className="start"
          type="button"
          value="start game"
        />
      </div>
    </div>
  );
};

export default Menu;
