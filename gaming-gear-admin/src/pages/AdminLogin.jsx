import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = usernameRef.current.value.trim();
    const password = passwordRef.current.value.trim();

    if (username === "admin" && password === "admin") {
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="flex flex-col gap-3">
          <input
            ref={usernameRef}
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-gray-300 rounded"
            onFocus={() => setError("")}
            required
          />
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-300 rounded"
            onFocus={() => setError("")}
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded hover:bg-red-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
