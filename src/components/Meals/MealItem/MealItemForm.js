import { useRef, useState, useContext } from "react";
import { Input } from "../../Input/Input";
import styles from "./MealItemForm.module.css";
import { AuthContext } from "../../../context/auth-context";

export const MealItemForm = ({ id, onAddToCart }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const [isAmountValid, setIsAmountValid] = useState(true);
  const amountInputRef = useRef();

  const validateAmount = (amount) => {
    return amount.trim().length > 0 && amount >= 1 && amount <= 10;
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const inputAmount = amountInputRef.current.value;
    if (!validateAmount(inputAmount)) {
      setIsAmountValid(false);
      return;
    }

    if (!isLoggedIn) {
      alert("Требуется авторизация для добавления товаров в корзину");
      return;
    }

    onAddToCart(Number(inputAmount));
    setIsAmountValid(true);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Количество"
        input={{
          id,
          type: "number",
          min: "1",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Добавить</button>
      {!isAmountValid && <p>Пожалуйста, введите количество от 1 до 10</p>}
    </form>
  );
};
