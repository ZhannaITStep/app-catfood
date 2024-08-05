import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase";

// Функция для регистрации
export const register = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Регистрация успешна:", userCredential.user);
  } catch (error) {
    console.error("Ошибка регистрации:", error.message);
  }
};

// Функция для входа
export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("Вход успешен:", userCredential.user);
  } catch (error) {
    console.error("Ошибка входа:", error.message);
  }
};
