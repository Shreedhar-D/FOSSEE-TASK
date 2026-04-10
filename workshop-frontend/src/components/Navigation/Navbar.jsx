import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { showSuccess } from "../../utils/notifications";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const profileDropdownRef = useRef(null);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="text-white hover:text-gray-300 transition">
            Home
          </Link>
          <Link
            to="/statistics/public"
            className="text-white hover:text-gray-300 transition"
          >
            Workshop Statistics
          </Link>
          {isAuthenticated && (
            <>
              <Link
                to="/statistics/public"
                className="text-white hover:text-gray-300 transition"
              >
                Team Statistics
              </Link>
              <Link
                to="/workshops"
                className="text-white hover:text-gray-300 transition"
              >
                Workshop Status
              </Link>
              <Link
                to="/workshop/propose"
                className="text-white hover:text-gray-300 transition"
              >
                Workshop Types
              </Link>
            </>
          )}

          {/* Profile Dropdown */}
          <div className="relative" ref={profileDropdownRef}>
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="flex items-center gap-2 bg-white rounded-full w-10 h-10 justify-center hover:bg-gray-200 transition"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            </button>

            {profileDropdownOpen && isAuthenticated && (
              <div className="absolute right-0 mt-2 w-48 bg-[rgb(45,50,55)] rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="block px-4 py-2 text-white hover:bg-gray-600 transition"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setProfileDropdownOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 text-white hover:bg-gray-600 transition"
                >
                  Logout
                </button>
              </div>
            )}

            {profileDropdownOpen && !isAuthenticated && (
              <div className="absolute right-0 mt-2 w-48 bg-[rgb(45,50,55)] rounded-lg shadow-lg py-2 z-50">
                <Link
                  to="/login"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="block px-4 py-2 text-white hover:bg-gray-600 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="block px-4 py-2 text-white hover:bg-gray-600 transition"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Full-screen overlay menu - mobile only */}
      <div
        className={`fixed inset-0 bg-black/50 md:hidden transition-all duration-300 ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMenuOpen(false)}
      >
        {/* Menu dropdown - only as tall as needed */}
        <div
          className="bg-[rgb(59,68,75)] text-white pt-6 px-4 w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block text-lg font-semibold py-2 hover:text-gray-300"
          >
            Home
          </Link>

          <Link
            to="/statistics/public"
            onClick={() => setMenuOpen(false)}
            className="block text-base py-2 hover:text-gray-300 transition-colors"
          >
            Workshop Statistics
          </Link>

          {isAuthenticated && (
            <>
              <Link
                to="/statistics/public"
                onClick={() => setMenuOpen(false)}
                className="block text-base py-2 hover:text-gray-300 transition-colors"
              >
                Team Statistics
              </Link>
              <Link
                to="/workshops"
                onClick={() => setMenuOpen(false)}
                className="block text-base py-2 hover:text-gray-300 transition-colors"
              >
                Workshop Status
              </Link>
              <Link
                to="/workshop/propose"
                onClick={() => setMenuOpen(false)}
                className="block text-base py-2 hover:text-gray-300 transition-colors"
              >
                Workshop Types
              </Link>
            </>
          )}

          {/* Profile Section */}
          <div className="border-t border-gray-500 pt-3 mt-3 pb-3">
            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 py-1 px-0 hover:text-gray-300 transition-colors"
                >
                  <svg
                    className="w-7 h-7 bg-white rounded-full p-1 text-gray-600 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full text-left text-base py-2 px-0 hover:text-gray-300 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base py-2 px-0 hover:text-gray-300 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block text-base py-2 px-0 hover:text-gray-300 transition-colors"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
