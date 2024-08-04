import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";

export const Layout = ({ onShowCart }) => {
  return (
    <>
      <Header onShowCart={onShowCart} />
      <Outlet />
      <Footer />
    </>
  );
};
