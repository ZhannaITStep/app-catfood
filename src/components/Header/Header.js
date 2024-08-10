import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import catsImage from "../../assets/cats.jpg";
import iconCatFood from "../../assets/icon-cat-food.png";
import styles from "./Header.module.css";
import { HeaderCartButton } from "./HeaderCartButton";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Auth from "./Auth";

export const Header = ({ onShowCart }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const handleLogoClick = (e) => {
    e.preventDefault();
    navigate("/");
    window.scrollTo({
      top: document.body.offsetHeight,
      left: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false); // Сброс флага авторизации при выходе
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
        <div className={styles.headerActions}>
          <HeaderCartButton onClick={onShowCart} />
          {isLoggedIn ? (
            <button className={styles.authButton} onClick={handleLogout}>
              Выйти
            </button>
          ) : (
            <button
              className={styles.authButton}
              onClick={() => setShowAuth(true)}
            >
              Войти/Зарегистрироваться
            </button>
          )}
        </div>
      </header>
      <div className={styles["main-image"]}>
        <img src={catsImage} alt="Cats" />
      </div>

      {showAuth && (
        <div className={styles["authModal"]}>
          <Auth onClose={() => setShowAuth(false)} />
        </div>
      )}
    </>
  );
};
