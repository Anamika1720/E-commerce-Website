import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity: 1 }),
      });
      alert(`Product ${productId} added to cart successfully.`);
    } catch (error) {
      alert("Failed to add to cart" + error);
    }
  };

  return (
    <div>
      <h2>Products</h2>

      <div className="container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h3>ID:{product.id}</h3>
            <h3>Name:{product.name}</h3>
            <p>Price:₹{product.price}</p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
