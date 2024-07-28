import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Cart } from "./components/Cart/Cart";
import { Header } from "./components/Layout/Header";
import { Meals } from "./components/Meals/Meals";
import { Footer } from "./components/Layout/Footer/Footer";
import { CartContextProvider } from "./store/CartContextProvider";
import { About } from "./components/About/About";
import { Terms } from "./components/Terms/Terms";
import { Privacy } from "./components/Privacy/Privacy";

export function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const showCartHandler = () => {
    setCartIsVisible(true);
  };

  const hideCartHandler = () => {
    setCartIsVisible(false);
  };

  return (
    <CartContextProvider>
      <Router>
        {cartIsVisible && <Cart onHideCart={hideCartHandler} />}
        <Header onShowCart={showCartHandler} />
        <main>
          <Routes>
            {" "}
            <Route path="/" element={<Meals />} />{" "}
            <Route path="/about" element={<About />} />{" "}
            <Route path="/terms" element={<Terms />} />{" "}
            <Route path="/privacy" element={<Privacy />} />{" "}
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartContextProvider>
  );
}
