import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.about}>
          <h2>О нас</h2>
          <p>
            Мы - ваш лучший источник качественного корма для кошек. Мы заботимся
            о здоровье и благополучии ваших питомцев.
          </p>
        </div>

        <div className={styles.links}>
          <h2>Информация</h2>
          <ul>
            <li>
              <Link to="/about">О компании</Link>
            </li>
            <li>
              <Link to="/terms">Условия обслуживания</Link>
            </li>
            <li>
              <Link to="/privacy">Конфиденциальность</Link>
            </li>
          </ul>
        </div>

        <div className={styles.contact}>
          <h2>Контакты</h2>
          <p>Email: support@catfoodshop.com</p>
          <p>Телефон: +1 (555) 123-4567</p>
        </div>

        <div className={styles.socials}>
          <h2>Следите за нами</h2>
          <ul>
            <li>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          &copy; {new Date().getFullYear()} Cat Food Shop. Все права защищены.
        </p>
      </div>
    </footer>
  );
};
