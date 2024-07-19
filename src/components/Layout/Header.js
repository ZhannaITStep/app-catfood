import React from "react";
import catsImage from "../../assets/cats.jpg";
import iconCatFood from "../../assets/icon-cat-food.png";
import styles from "./Header.module.css";
import { HeaderCartButton } from "./HeaderCartButton";

export const Header = (props) => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <img src={iconCatFood} alt="Icon Description" className={styles.icon} />
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={catsImage} alt="Cats" />
      </div>
    </React.Fragment>
  );
};
