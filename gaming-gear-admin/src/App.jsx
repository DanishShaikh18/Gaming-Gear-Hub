import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar"; 
import Dashboard from "./pages/Dashboard";
import ManageProduct from "./pages/ManageProduct";
import ProductCategoryPage from "./pages/ProductCategoryPage";
import AddProduct from "./components/AddProductForm";
import EditProduct from "./components/EditProductForm";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage-products" element={<ManageProduct />} />
            <Route path="/products/:categoryId" element={<ProductCategoryPage />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:productId" element={<EditProduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
