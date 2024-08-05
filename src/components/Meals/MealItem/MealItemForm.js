import { useRef, useState } from "react";
import { Input } from "../../UI/Input";
import styles from "./MealItemForm.module.css";

export const MealItemForm = ({ id, onAddToCart }) => {
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

    onAddToCart(Number(inputAmount));
    setIsAmountValid(true); // Сброс валидности после успешного добавления
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
