import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      setIsLoggedIn(true);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      {!isLoggedIn ? (
        <div className="bg-white p-6 rounded-lg shadow-md w-80">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 mb-3 border border-gray-300 rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mb-3 border border-gray-300 rounded"
              required
            />
            <button type="submit" className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition">
              Login
            </button>
          </form>
        </div>
      ) : (
        <h2 className="text-3xl font-bold mt-6">You are in Admin Page</h2>
      )}
    </div>
  );
};

export default AdminPage;
