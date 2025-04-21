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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/manage-products" element={<ManageProduct />} />
            <Route path="/products/:categoryId" element={<ProductCategoryPage />} />
            
            {/* Optional: Separate routes for add/edit if you need direct access */}
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/edit-product/:productId" element={<EditProduct />} />
            
            {/* Fallback route */}
            <Route path="*" element={<div>404 Page Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;