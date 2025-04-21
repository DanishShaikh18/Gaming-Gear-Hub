import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package, List } from "lucide-react";
import Sidebar from "../components/Sidebar";
const Dashboard = () => {
  const [categoryCount, setCategoryCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/categories/count")
      .then((res) => res.json())
      .then((data) => {
        setCategoryCount(data.count || 0);
      })
      .catch((err) => {
        console.error("Error fetching category count:", err);
      });

      fetch("http://localhost:5000/api/products/count")
  .then((res) => res.json())
  .then((data) => {
    setProductCount(data.count || 0);
  })
  .catch((err) => console.error("Product count error:", err));


  }, []);

  

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="p-6 w-full">
        <h2 className="text-2xl font-bold mb-4">Welcome to Admin Dashboard</h2>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
            <Package className="w-6 h-6 text-red-500 mr-3" />
            <div>
              <p className="text-lg font-semibold">{productCount}</p>
              <p className="text-sm text-gray-600">Total Products</p>
            </div>
          </div>
          <div className="bg-white shadow-md rounded-lg p-4 flex items-center">
            <List className="w-6 h-6 text-red-500 mr-3" />
            <div>
              <p className="text-lg font-semibold">{categoryCount}</p>
              <p className="text-sm text-gray-600">Total Categories</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6">
          <h3 className="text-lg font-bold mb-2">Quick Actions</h3>
          <Link
            to="/manage-products"
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition inline-block"
          >
            Manage Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
