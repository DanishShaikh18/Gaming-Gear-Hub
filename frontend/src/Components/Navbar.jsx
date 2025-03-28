import { Search, Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-accent text-black text-center text-sm font-semibold py-2">
        ⚡ Flash Sale: Get up to 50% off on gaming accessories! Limited time only! ⚡
      </div>
      
      {/* Navbar */}
      <header className="w-full bg-white shadow-md z-50">
        <nav className="flex items-center justify-between max-w-7xl mx-auto p-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide">
            Gaming<span className="text-red-600">Gear</span>Hub
          </Link>
          
          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-6 text-lg font-medium">
            <li><Link to="/keyboards" className="hover:text-red-600 transition">Keyboards</Link></li>
            <li><Link to="/mice" className="hover:text-red-600 transition">Mice</Link></li>
            <li><Link to="/headsets" className="hover:text-red-600 transition">Headsets</Link></li>
            <li><Link to="/monitors" className="hover:text-red-600 transition">Monitors</Link></li>
          </ul>
          
          {/* Search, Admin Login, and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Search className="w-6 h-6 cursor-pointer hover:text-red-600 transition" />
            <button className="md:hidden">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
