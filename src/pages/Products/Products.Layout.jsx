import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getProductList } from "./Products.Service";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const results = await getProductList();
      setProducts(results);
      setLoading(false);
    })();
  }, []);

  const addToCart = async ({ id, name }) => {
    const result = await addToCart({
      productId: id,
      quantity: 1,
    });
    if (result) {
      toast.success(`${name} added to your cart.`);
    } else {
      toast.error(`Failed to add to cart`);
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
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductList;
