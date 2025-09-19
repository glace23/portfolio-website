import React from "react";
import styles from "../../css/menu.module.css";

const SwitchToggle = ({ label, checked, onChange }) => {
  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch}>
        <span className={styles.labelText}>{label}</span>
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className={[styles.slider, styles.round].join(" ")}></span>
        <span className={styles.labelText}>{checked ? "On" : "Off"}</span>
      </label>
    </div>
  );
};

export default SwitchToggle;
