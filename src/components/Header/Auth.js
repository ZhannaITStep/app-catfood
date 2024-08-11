import React, { useState } from "react";
import ReactDOM from "react-dom"; // Импортируем ReactDOM для использования портала
import { auth } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import "./Auth.css";

const Auth = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Успешно вошли в систему!");
        onClose(); // Закрываем модальное окно после входа
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("Успешно зарегистрированы!");
        onClose(); // Закрываем модальное окно после регистрации
      }
    } catch (error) {
      console.error(error);
      alert("Ошибка: " + error.message);
    }
  };

  // Создаём портал для модального окна
  return ReactDOM.createPortal(
    <div className="auth-modal" onClick={onClose}>
      <div className="auth-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="auth-title">{isLoginMode ? "Вход" : "Регистрация"}</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-button">
            {isLoginMode ? "Войти" : "Создать аккаунт"}
          </button>
        </form>
        <button onClick={() => setIsLoginMode((prev) => !prev)}>
          Переключиться на {isLoginMode ? "Регистрацию" : "Вход"}
        </button>
      </div>
    </div>,
    document.getElementById("modal-root") // Указываем, где рендерить портал
  );
};

export default Auth;
