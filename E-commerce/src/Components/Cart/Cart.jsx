import React, { useEffect, useState } from "react";
import "./Cart.Styles.css";

const Cart = () => {
  const [cart, setCart] = useState({});

  useEffect(() => {
    const fetchCart = async () => {
      const response = await fetch("http://localhost:3000/cart");
      const data = await response.json();
      setCart(data);
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    if (window.confirm("Do you want to delete card")) {
      await fetch(`http://localhost:3000/cart/${productId}`, {
        method: "DELETE",
      });
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      });
    }
  };

  const increaseQuantity = async (productId) => {
    const item = cart[productId];
    await fetch(`http://localhost:3000/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    });
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: { ...item, quantity: item.quantity + 1 },
    }));
  };

  const decreaseQuantity = async (productId) => {
    const item = cart[productId];
    await fetch(`http://localhost:3000/cart/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity - 1 }),
    });
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: { ...item, quantity: item.quantity - 1 },
    }));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div className="container">
        {Object.values(cart).map((item) => (
          <div key={item.id} className="card">
            <h3>ID:{item.id}</h3>
            <h3>Name:{item.name}</h3>
            <p>Quantity:{item.quantity}</p>
            <div className="button-container">
              <button
                onClick={() => increaseQuantity(item.id)}
                disabled={item.quantity === 5}
              >
                +
              </button>
              <button
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity === 0}
              >
                -
              </button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
