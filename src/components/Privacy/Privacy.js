import React from "react";
import styles from "./Privacy.module.css";

export const Privacy = () => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={styles.privacy}>
      <h1 onClick={handleScrollToTop} style={{ cursor: "pointer" }}>
        Политика конфиденциальности
      </h1>
      <p>
        Мы ценим вашу конфиденциальность и стремимся защищать ваши личные
        данные. Пожалуйста, ознакомьтесь с нашей политикой конфиденциальности
        ниже.
      </p>

      <h2>1. Сбор информации</h2>
      <p>
        Мы собираем информацию о вас, когда вы регистрируетесь на нашем сайте,
        делаете заказ или взаимодействуете с нами другим образом. Эта информация
        может включать ваше имя, адрес электронной почты, адрес доставки и
        платежную информацию.
      </p>

      <h2>2. Использование информации</h2>
      <p>
        Мы используем собранную информацию для обработки ваших заказов,
        улучшения нашего сервиса и связи с вами по вопросам, связанным с вашим
        заказом или нашей продукцией.
      </p>

      <h2>3. Защита информации</h2>
      <p>
        Мы принимаем разумные меры для защиты вашей личной информации от
        несанкционированного доступа, использования или раскрытия. Однако
        помните, что ни один метод передачи данных через Интернет или метод
        электронного хранения не является на 100% безопасным.
      </p>

      <h2>4. Раскрытие информации третьим лицам</h2>
      <p>
        Мы не продаем и не передаем вашу личную информацию третьим лицам без
        вашего согласия, за исключением случаев, когда это необходимо для
        выполнения вашего заказа (например, передача информации курьерской
        службе).
      </p>

      <h2>5. Изменения в политике конфиденциальности</h2>
      <p>
        Мы оставляем за собой право вносить изменения в нашу политику
        конфиденциальности. Все изменения будут опубликованы на этой странице, и
        мы рекомендуем периодически проверять ее на наличие обновлений.
      </p>

      <h2>6. Контактная информация</h2>
      <p>
        Если у вас есть вопросы или комментарии по поводу нашей политики
        конфиденциальности, пожалуйста, свяжитесь с нами по адресу:
        support@catfoodshop.com.
      </p>

      <h2>7. Заключительные положения</h2>
      <p>
        Используя наш сайт, вы соглашаетесь с нашей политикой
        конфиденциальности. Мы благодарим вас за доверие и уверяем, что ваша
        информация будет в безопасности.
      </p>
    </div>
  );
};
