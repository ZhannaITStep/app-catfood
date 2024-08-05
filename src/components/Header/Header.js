import React from "react";
import { Link, useNavigate } from "react-router-dom";
import catsImage from "../../assets/cats.jpg";
import iconCatFood from "../../assets/icon-cat-food.png";
import styles from "./Header.module.css";
import { HeaderCartButton } from "./HeaderCartButton";

export const Header = ({ onShowCart }) => {
  const navigate = useNavigate();

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate("/");
    window.scrollTo({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header className={styles.header}>
        <Link to="/" onClick={handleLogoClick}>
          <img
            src={iconCatFood}
            alt="Icon Description"
            className={styles.icon}
          />
        </Link>
        <HeaderCartButton onClick={onShowCart} />
      </header>
      <div className={styles["main-image"]}>
        <img src={catsImage} alt="Cats" />
      </div>
    </>
  );
};
