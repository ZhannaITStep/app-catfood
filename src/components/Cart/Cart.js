import { useContext, useState } from "react";
import ReactDOM from "react-dom";
import { CartContext } from "../../context/cart-context";
import { CartItem } from "./CartItem";
import { SubmitOrder } from "./SubmitOrder";
import styles from "./Cart.module.css";
import { Modal } from "../UI/Modal";

export const Cart = (props) => {
  const [isSubmitOrderAvailable, setIsSubmitOrderAvailable] = useState(false);
  const [isDataSubmitting, setIsDataSubmitting] = useState(false);
  const [wasDataSendingSuccessful, setWasDataSendingSuccessful] =
    useState(false);

  const cartContext = useContext(CartContext);

  const totalAmount = `$${Math.abs(cartContext.totalAmount).toFixed(2)}`;
  const hasItems = cartContext.items.length > 0;

  const removeCartItemHandler = (id) => cartContext.removeItem(id);
  const addCartItemHandler = (item) =>
    cartContext.addItem({ ...item, amount: 1 });
  const orderHandler = () => setIsSubmitOrderAvailable(true);

  const submitOrderHandler = async (userData) => {
    setIsDataSubmitting(true);
    await fetch(
      "https://react-course-http-8220d-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedMeals: cartContext.items,
        }),
      }
    );
    setIsDataSubmitting(false);
    setWasDataSendingSuccessful(true);
    cartContext.clearCart();
  };

  const cartItems = cartContext.items.map((item) => (
    <CartItem
      key={item.id}
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={() => addCartItemHandler(item)}
      onRemove={() => removeCartItemHandler(item.id)}
    />
  ));

  const modalButtons = (
    <div className={styles.actions}>
      <button className={styles["button--alt"]} onClick={props.onHideCart}>
        Закрыть
      </button>
      {hasItems && (
        <button className={styles.button} onClick={orderHandler}>
          Заказать
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <>
      <ul className={styles["cart-items"]}>{cartItems}</ul>
      <div className={styles.total}>
        <span>Итого</span>
        <span>{totalAmount}</span>
      </div>
      {isSubmitOrderAvailable ? (
        <SubmitOrder
          onSubmit={submitOrderHandler}
          onCancel={props.onHideCart}
        />
      ) : (
        modalButtons
      )}
    </>
  );

  const cartModal = (
    <Modal onHideCart={props.onHideCart}>
      {!isDataSubmitting && !wasDataSendingSuccessful && cartModalContent}
      {isDataSubmitting && <p>Отправка данных заказа...</p>}
      {wasDataSendingSuccessful && (
        <>
          <p>Ваш заказ успешно отправлен!</p>
          <div className={styles.actions}>
            <button
              className={styles["button--alt"]}
              onClick={props.onHideCart}
            >
              Закрыть
            </button>
          </div>
        </>
      )}
    </Modal>
  );

  return ReactDOM.createPortal(
    cartModal,
    document.getElementById("modal-root")
  );
};
