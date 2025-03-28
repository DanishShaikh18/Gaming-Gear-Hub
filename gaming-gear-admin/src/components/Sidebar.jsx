import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LayoutDashboard, Plus, List } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex">
      {/* Sidebar (Desktop) */}
      <div
        className={`bg-gray-900 text-white w-64 min-h-screen p-5 space-y-6 transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        } fixed md:relative`}
      >
        {/* Logo */}
        <h2 className="text-2xl font-bold text-center text-red-500">Admin Panel</h2>
        
        {/* Navigation Links */}
        <nav className="mt-10">
          <ul className="space-y-4">
            <li>
              <Link to="/dashboard" className="flex items-center p-3 rounded-lg hover:bg-red-600 transition">
                <LayoutDashboard className="w-5 h-5 mr-3" /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/add-product" className="flex items-center p-3 rounded-lg hover:bg-red-600 transition">
                <Plus className="w-5 h-5 mr-3" /> Add Product
              </Link>
            </li>
            <li>
              <Link to="/manage-products" className="flex items-center p-3 rounded-lg hover:bg-red-600 transition">
                <List className="w-5 h-5 mr-3" /> Manage Products
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Sidebar Toggle Button */}
      <button
        className="absolute top-4 left-4 text-gray-900 md:hidden z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default Sidebar;
