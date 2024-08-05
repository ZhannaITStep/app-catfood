import { useContext, useEffect, useState, useMemo } from "react";
import { CartContext } from "../../store/cart-context";
import { CartIcon } from "../Cart/CartIcon";
import styles from "./HeaderCartButton.module.css";

export const HeaderCartButton = ({ onClick }) => {
  const [isButtonAnimated, setIsButtonAnimated] = useState(false);
  const { items } = useContext(CartContext);

  // Используем useMemo для оптимизации подсчета количества товаров в корзине.
  const cartItemsNumber = useMemo(
    () => items.reduce((total, item) => total + item.amount, 0),
    [items]
  );

  // Определяем классы для кнопки с учетом анимации.
  const buttonClasses = `${styles.button} ${
    isButtonAnimated ? styles.bump : ""
  }`;

  useEffect(() => {
    // Если корзина пуста, анимация не требуется
    if (items.length === 0) return;

    // Включаем анимацию кнопки
    setIsButtonAnimated(true);
    const timer = setTimeout(() => setIsButtonAnimated(false), 300);

    // Очищаем таймер при размонтировании компонента или изменении items
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
