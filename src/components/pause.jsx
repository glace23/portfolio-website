import React from "react";
import style from "../css/menu.module.css";

const Pause = ({ onRouteChange }) => {
  return (
    <div className={style.paused_modal_container}>
      <div>
        <input
          onClick={onRouteChange}
          className="continue"
          type="button"
          value="continue game"
        />
      </div>
    </div>
  );
};

export default Pause;
