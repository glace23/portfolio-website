import React from "react";
import styles from "../../css/menu.module.css";

const SwitchToggle = ({ id, label, checked, onChange, disabled }) => {
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
          id={id}
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
