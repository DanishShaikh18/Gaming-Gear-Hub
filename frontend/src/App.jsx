import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductPage from "./pages/ProductPage"; 
import Footer from "./components/Footer";

const keyboards = [
  { id: "1", name: "Mechanical Keyboard", price: "₹5,999", image: "/images/keyboard.jpg" },
  { id: "2", name: "RGB Gaming Keyboard", price: "₹4,499", image: "/images/keyboard2.jpg" },
];

const mice = [
  { id: "3", name: "Gaming Mouse", price: "₹2,999", image: "/images/mouse.jpg" },
  { id: "4", name: "Wireless Mouse", price: "₹1,999", image: "/images/mouse2.jpg" },
];

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/keyboards" element={<CategoryPage title="Gaming Keyboards" products={keyboards} />} />
            <Route path="/mice" element={<CategoryPage title="Gaming Mice" products={mice} />} />
            <Route path="/product/:id" element={<ProductPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
