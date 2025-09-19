import React, { useState } from "react";
import styles from "../../css/menu.module.css";

const WelcomeMenu = ({ onStart }) => {
  return (
    <div className={[styles.overlay, styles.welcomeOverlay].join(" ")}>
      <div className={[styles.menu, styles.welcomeMenu].join(" ")}>
        <div className={styles.text}>
          <h2>Welcome to the Snake Game!</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            dictum mi eget leo feugiat aliquet. Cras consectetur lacus ligula,
            efficitur porta nisi egestas non. Ut quam ipsum, ornare eu tortor
            eleifend, fermentum condimentum mauris. Proin sed ante vitae leo
            vestibulum consequat ut et quam. Orci varius natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus. Aenean in
            congue risus. Sed egestas laoreet tincidunt. Ut odio felis,
            convallis non magna nec, iaculis vestibulum odio. Curabitur nibh
            est, cursus ut euismod rutrum, porttitor eu felis. Sed in ante non
            leo porta sagittis a at dolor. Nulla in est scelerisque lectus
            condimentum malesuada. Nam luctus hendrerit consequat. Pellentesque
            sit amet lacinia nisi. Morbi dui nisi, tristique sit amet eros nec,
            rhoncus efficitur lacus. Donec non metus arcu. Sed fringilla risus
            nec consectetur molestie. Mauris id orci ornare, mattis tellus nec,
            ornare nunc. Aenean sollicitudin ac ligula id feugiat. Nullam
            condimentum vel ipsum in tristique. Morbi sagittis tempus odio,
            maximus egestas metus pharetra vitae. Vivamus mollis ante eget augue
            maximus, et condimentum massa volutpat.
          </p>
        </div>
        <button className={styles.grayButton} onClick={onStart}>
          Let's Go
        </button>
      </div>
    </div>
  );
};

export default WelcomeMenu;
