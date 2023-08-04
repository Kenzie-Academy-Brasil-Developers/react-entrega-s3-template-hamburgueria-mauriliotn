import React from "react";
import styles from "./style.module.scss";

export const LoadingList = () => {
  return (
    <div className="container">
      <ul className={styles.loadingList}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </ul>
    </div>
  );
};
