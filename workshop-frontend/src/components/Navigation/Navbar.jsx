import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { showSuccess } from "../../utils/notifications";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    showSuccess("Logged out successfully!");
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-[rgb(59,68,75)] text-white px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">
          FOSSEE Workshops
        </Link>

        {/* Hamburger menu */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        <div className="hidden md:flex gap-4 items-center">
          {isAuthenticated ? (
            <>
              <Link to="/workshops" className="hover:underline">
                Workshops
              </Link>
              <Link to="/statistics/public" className="hover:underline">
                Statistics
              </Link>
              <Link to="/profile" className="hover:underline">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/statistics/public" className="hover:underline">
                Workshop Statistics
              </Link>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
      {/* Full-screen overlay menu - mobile only */}
      <div
        className={`fixed inset-0 bg-black/50 md:hidden transition-all duration-300 ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        {/* Menu content inside - centered */}
        <div className="bg-[rgb(59,68,75)] text-white pt-24 px-8 space-y-2">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-xl font-bold py-4 hover:text-gray-300 border-b border-gray-600 mb-2"
          >
            Home
          </Link>
          {isAuthenticated ? (
            <>
              <Link
                to="/workshops"
                onClick={() => setMenuOpen(false)}
                className="block text-xl py-4 px-2 hover:text-gray-300 hover:bg-gray-700/30 rounded transition-colors"
              >
                Workshops
              </Link>
              <Link
                to="/statistics/public"
                onClick={() => setMenuOpen(false)}
                className="block text-xl py-4 px-2 hover:text-gray-300 hover:bg-gray-700/30 rounded transition-colors"
              >
                Statistics
              </Link>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block text-xl py-4 px-2 hover:text-gray-300 hover:bg-gray-700/30 rounded transition-colors"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block text-xl py-4 px-2 hover:text-gray-300 hover:bg-gray-700/30 rounded transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/statistics/public"
                onClick={() => setMenuOpen(false)}
                className="block text-xl py-4 px-2 hover:text-gray-300 hover:bg-gray-700/30 rounded transition-colors"
              >
                Workshop Statistics
              </Link>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-xl py-4 px-2 hover:text-gray-300 hover:bg-gray-700/30 rounded transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block text-xl py-4 px-2 hover:text-gray-300 hover:bg-gray-700/30 rounded transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
