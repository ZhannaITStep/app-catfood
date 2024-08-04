import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../store/cart-context";
import { CartIcon } from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

export const HeaderCartButton = ({ onClick }) => {
  const [isButtonAnimated, setIsButtonAnimated] = useState(false);
  const { items } = useContext(CartContext);

  // Подсчёт количества товаров в корзине
  const cartItemsNumber = items.reduce((total, item) => total + item.amount, 0);

  // Определение класса кнопки с учётом анимации
  const buttonClasses = `${styles.button} ${
    isButtonAnimated ? styles.bump : ""
  }`;

  useEffect(() => {
    if (items.length === 0) return;

    setIsButtonAnimated(true);
    const timer = setTimeout(() => setIsButtonAnimated(false), 300);

    return () => clearTimeout(timer);
  }, [items]);

  return (
    <button className={buttonClasses} onClick={onClick}>
      <span className={styles.icon}>
        <CartIcon />
      </span>
      <span>Корзина</span>
      <span className={styles.badge}>{cartItemsNumber}</span>
    </button>
  );
};
