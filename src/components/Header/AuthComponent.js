import React, { useState } from "react";
import { register, login } from "./auth";

export const AuthComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    register(email, password);
  };

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <button onClick={handleRegister}>Зарегистрироваться</button>
      <button onClick={handleLogin}>Войти</button>
    </div>
  );
};
