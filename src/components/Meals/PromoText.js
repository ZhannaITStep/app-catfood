import styles from "./PromoText.module.css";

export const PromoText = () => {
  return (
    <section className={styles["promo-text"]}>
      <h2>BAGIRA</h2>
      <h2>Интернет-магазин еды для Ваших кошечек и котиков</h2>
      <p>Не только полезно, но и вкусно!</p>
    </section>
  );
};
