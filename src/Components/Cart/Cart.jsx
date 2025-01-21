import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import "./Cart.Styles.css";

const Cart = () => {
  const [cart, setCart] = useState({});
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmProductId, setConfirmProductId] = useState(null);
  const [isClearingCart, setIsClearingCart] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/cart");
        setCart(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/cart/${productId}`);
      setCart((prevCart) => {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      });
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const increaseQuantity = async (productId) => {
    const item = cart[productId];
    try {
      await axios.put(`http://localhost:3000/cart/${productId}`, {
        quantity: item.quantity + 1,
      });
      setCart((prevCart) => ({
        ...prevCart,
        [productId]: { ...item, quantity: item.quantity + 1 },
      }));
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQuantity = async (productId) => {
    const item = cart[productId];
    if (item.quantity === 1) {
      setConfirmProductId(productId);
      setConfirmOpen(true);
    } else {
      try {
        await axios.put(`http://localhost:3000/cart/${productId}`, {
          quantity: item.quantity - 1,
        });
        setCart((prevCart) => ({
          ...prevCart,
          [productId]: { ...item, quantity: item.quantity - 1 },
        }));
      } catch (error) {
        console.error("Error decreasing quantity:", error);
      }
    }
  };

  const clearCart = async () => {
    try {
      const response = await axios.delete("http://localhost:3000/cart");
      if (response.status === 200) {
        setCart({});
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleConfirmClose = (confirmed) => {
    setConfirmOpen(false);
    if (confirmed) {
      if (isClearingCart) {
        clearCart();
      } else if (confirmProductId !== null) {
        removeFromCart(confirmProductId);
      }
    }
    setIsClearingCart(false);
  };

  const handleClearCartConfirmation = () => {
    setIsClearingCart(true);
    setConfirmOpen(true);
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (Object.keys(cart).length === 0) {
    return (
      <div>
        <h1>Shopping Cart</h1>
        <h2>Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      <button onClick={handleClearCartConfirmation} color="error">
        Clear Cart
      </button>
      <div className="container">
        {Object.values(cart).map((item) => (
          <div key={item.id} className="card">
            <h3>ID: {item.id}</h3>
            <h3>Name: {item.name}</h3>
            <p>Quantity: {item.quantity}</p>
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
              <button
                onClick={() => {
                  setConfirmProductId(item.id);
                  setConfirmOpen(true);
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={confirmOpen} onClose={() => handleConfirmClose(false)}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          Are you sure you want to
          {isClearingCart ? " Clear the entire cart" : " Remove this product"}?
        </DialogContent>
        <DialogActions>
          <button onClick={() => handleConfirmClose(false)}>Cancel</button>
          <button onClick={() => handleConfirmClose(true)}>Confirm</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Cart;
