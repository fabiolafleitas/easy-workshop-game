import React from "react";

import styles from "./Bar.module.css";

export default function Bar(props) {
    const {image, alt, quantity, color} = props.config;
    const {fillLevel} = props;

    const colorClass = `${color}Fill`;
    const validQuantity = quantity < 1 ? 1 : quantity;
    const validFillLevel = fillLevel > quantity ? quantity : fillLevel;
    return (
        <article className={styles.container}>
            <img
                className={styles.imgBar}
                src={`./assets/${image}.svg`}
                alt={alt}
            ></img>
            <div className={styles.bar}>
              { [...Array(validQuantity).keys()].map(level => (
                <div
                  key={level}
                  aria-label={`level-${level}`}
                  className={`${level <= validFillLevel - 1 ? styles[colorClass] : styles.empty}`}>
                </div>
              ))
              }
            </div>
        </article>
    );
}
