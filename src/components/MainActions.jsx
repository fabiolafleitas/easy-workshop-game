import React from "react";

import styles from "./MainActions.module.css"

export default function MainActions(props) {

  const handleSwordClick = () => {
    props.onSwordClick();
  }

  return (
    <div className={styles.mainActionContainer}>
      <button type="button" className={styles.button} onClick={handleSwordClick}>
        <img src="./assets/sword-img.png" alt="Sword"></img>
        Use sword!
      </button>
    </div>
  );
}