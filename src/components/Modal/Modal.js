import React from "react";
import styles from "./Modal.module.css";
import ReactDOM from "react-dom";

const Backdrop = ({ onHideCart }) => {
  return <div className={styles.backdrop} onClick={onHideCart}></div>;
};

export const Modal = ({ onHideCart, children }) => {
  const portalElement = document.getElementById("overlays");

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onHideCart={onHideCart} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <div className={styles.modal}>
          <div className={styles.content}>{children}</div>
        </div>,
        portalElement
      )}
    </>
  );
};
