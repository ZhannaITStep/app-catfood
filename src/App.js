import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Cart } from "./components/Cart/Cart";
import { Meals } from "./components/Meals/Meals";
import { CartContextProvider } from "./store/CartContextProvider";
import { About } from "./components/About/About";
import { Terms } from "./components/Terms/Terms";
import { Privacy } from "./components/Privacy/Privacy";
import { Layout } from "./components/Layout/Layout";

export function App() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const toggleCartVisibility = () => {
    setCartIsVisible((prevState) => !prevState);
  };

  return (
    <CartContextProvider>
      <Router>
        {cartIsVisible && <Cart onHideCart={toggleCartVisibility} />}
        <main>
          <Routes>
            <Route
              path="/"
              element={<Layout onShowCart={toggleCartVisibility} />}
            >
              <Route index element={<Meals />} />
              <Route path="/about" element={<About />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </CartContextProvider>
  );
}
