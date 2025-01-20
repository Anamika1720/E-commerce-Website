import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./Components/Cart/Cart";
import ProductList from "./Components/Products/ProductList";
import Navigation from "./Components/Navigation/Navigation";
import HomePage from "./Components/Home/Home";

function App() {
  return (
    <Router>
      <div>
        <h1>E-commerce Website</h1>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
