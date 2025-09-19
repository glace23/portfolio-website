import React from "react";
import styles from "../../css/menu.module.css";

const SwitchToggle = ({ label, checked, onChange, disabled }) => {
  return (
    <div className={styles.switchContainer}>
      <label className={styles.switch}>
        <span
          className={[styles.labelText, disabled ? styles.disabled : ""].join(
            " "
          )}
        >
          {label}
        </span>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
        />
        <span
          className={[
            styles.slider,
            styles.round,
            disabled ? styles.disabled : "",
          ].join(" ")}
        ></span>
        <span
          className={[styles.labelText, disabled ? styles.disabled : ""].join(
            " "
          )}
        >
          {checked ? "On" : "Off"}
        </span>
      </label>
    </div>
  );
};

export default SwitchToggle;
