import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  
  const categories = [
    { name: "Mice", path: "/products/mice" },
    { name: "Keyboards", path: "/products/keyboards" },
    { name: "Monitors", path: "/products/monitors" },
    { name: "Headsets", path: "/products/headsets" },
  ];

  return (
    <nav className="bg-gray-900 border-b border-purple-500/20 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center gap-4">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group transition-all duration-200"
        >
          <span className="text-3xl font-bold text-purple-500 font-['Rajdhani'] tracking-tighter group-hover:scale-105">
            GAMING-GEAR HUB
          </span>
        </Link>

        {/* Category Links - Fixed Hover Effect */}
        <div className="hidden md:flex gap-8">
          {categories.map((cat) => (
            <div key={cat.path} className="group relative">
              <Link
                to={cat.path}
                className={`block px-1 text-lg font-['Rajdhani'] ${
                  location.pathname.includes(cat.path)
                    ? "text-purple-400 font-semibold"
                    : "text-gray-300"
                } group-hover:scale-105 transition-transform`}
              >
                {cat.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </div>
          ))}
        </div>

        {/* Budget Builder CTA */}
        {/* <div className="ml-auto">
          <Link
            to="/builder"
            className="px-5 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-md text-white font-['Rajdhani'] font-bold tracking-wide hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300"
          >
            BUDGET BUILDER
          </Link>
        </div> */}
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden px-4 pb-3">
        <select 
          className="w-full bg-gray-800 text-white p-2 rounded font-['Rajdhani']"
          onChange={(e) => window.location = e.target.value}
        >
          <option value="/">Navigate</option>
          {categories.map((cat) => (
            <option key={cat.path} value={cat.path}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </nav>
  );
};

export default Navbar;