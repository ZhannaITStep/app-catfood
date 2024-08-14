import { useRef, useState } from "react";
import styles from "./SubmitOrder.module.css";

const isInputValid = (inputValue) => inputValue.trim() !== "";

export const SubmitOrder = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    city: true,
    address: true,
  });

  const nameInputRef = useRef();
  const cityInputRef = useRef();
  const addressInputRef = useRef();

  const confirmOrderHandler = (event) => {
    event.preventDefault();

    const enteredValues = {
      name: nameInputRef.current.value,
      city: cityInputRef.current.value,
      address: addressInputRef.current.value,
    };

    const newFormValidity = {
      name: isInputValid(enteredValues.name),
      city: isInputValid(enteredValues.city),
      address: isInputValid(enteredValues.address),
    };

    setFormValidity(newFormValidity);

    const isFormValid = Object.values(newFormValidity).every(
      (isValid) => isValid
    );

    if (!isFormValid) {
      return;
    }

    props.onSubmit(enteredValues);
  };

  const getInputClasses = (field) =>
    `${styles.control} ${formValidity[field] ? "" : styles.invalid}`;

  return (
    <form className={styles.form} onSubmit={confirmOrderHandler}>
      <div className={getInputClasses("name")}>
        <label htmlFor="name">Имя</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formValidity.name && <p>Пожалуйста введите имя</p>}
      </div>
      <div className={getInputClasses("city")}>
        <label htmlFor="city">Город</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formValidity.city && <p>Пожалуйста введите название города</p>}
      </div>
      <div className={getInputClasses("address")}>
        <label htmlFor="address">Адрес</label>
        <input type="text" id="address" ref={addressInputRef} />
        {!formValidity.address && <p>Пожалуйста введите адрес</p>}
      </div>
      <div className={styles.actions}>
        <button className={styles.submit}>Подтвердить Заказ</button>
        <button type="button" onClick={props.onCancel}>
          Отменить
        </button>
      </div>
    </form>
  );
};
