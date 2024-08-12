import styles from "./MealItem.module.css";
import { MealItemForm } from "./MealItemForm";
import { useContext } from "react";
import { CartContext } from "../../../context/cart-context";

export const MealItem = ({ id, name, description, flavor, brand, price }) => {
  const cartContext = useContext(CartContext);

  // Форматируем цену, если она есть
  const formattedPrice = price ? `$${price.toFixed(2)}` : "";

  // Обработчик добавления товара в корзину
  const addToCartHandler = (amount) => {
    cartContext.addItem({ id, name, amount, price });
  };

  return (
    <li className={styles.meal}>
      <div>
        <h3>{name}</h3>
        <div className={styles.description}>{description}</div>
        <div className={styles.flavor}>Вкус - {flavor}</div>
        <div className={styles.brand}>Бренд - {brand}</div>
        <div className={styles.price}>{formattedPrice}</div>
      </div>
      <div>
        <MealItemForm onAddToCart={addToCartHandler} id={id} />
      </div>
    </li>
  );
};
