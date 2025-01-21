import React from "react";
import { Link } from "react-router-dom";
import "./Navigation.Styles.css";

const Navigation = () => {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/cart">Cart</Link>
    </nav>
  );
};

export default Navigation;
