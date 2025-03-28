import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import ManageProduct from "./pages/ManageProduct";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-6">
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/manage-products" element={<ManageProduct />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
