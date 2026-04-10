import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Layout from "../components/Navigation/Layout";

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // Add error state
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors
    setLoading(true);
    try {
      await login(formData);
      navigate("/");
    } catch (error) {
      setError("Invalid username or password"); // Set error in state
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center flex-1 bg-gray-100">
        <div className="bg-white p-4 md:p-8 rounded-lg shadow-md w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-[rgb(23,162,184)]">
            Login
          </h2>

          {/* Error message display */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 min-h-12 focus:outline-none focus:border-blue-500 text-base"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3 min-h-12 focus:outline-none focus:border-blue-500 text-base"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 min-h-12 rounded-lg hover:bg-blue-600 disabled:opacity-50 font-medium text-base"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          <p className="text-center mt-4 text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[rgb(23,162,184)] hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
}
