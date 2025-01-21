import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/products");
        setProducts(response.data);
      } catch (error) {
        toast.error(`Failed to fetch products: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId, productName) => {
    try {
      await axios.post("http://localhost:3000/cart", {
        productId,
        quantity: 1,
      });
      toast.success(`${productName} added to cart successfully.`);
    } catch (error) {
      toast.error(`Failed to add to cart: ${error}`);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Products</h2>
      <div className="container">
        {products.map((product) => (
          <div key={product.id} className="card">
            <h3>ID: {product.id}</h3>
            <h3>Name: {product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <button onClick={() => addToCart(product.id, product.name)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
