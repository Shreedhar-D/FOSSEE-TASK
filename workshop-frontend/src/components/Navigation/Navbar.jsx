import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { showSuccess } from "../../utils/notifications";

export default function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    showSuccess("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-[rgb(59,68,75)] text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        FOSSEE Workshops
      </Link>
      <div className="flex gap-4 items-center">
        {isAuthenticated ? (
          <>
            <Link to="/workshops" className="hover:underline">
              Workshops
            </Link>
            <Link to="/statistics/public" className="hover:underline">
              Statistics
            </Link>
            <Link to="/profile" className="hover:underline">
              👤 {user?.username}
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
  );
}
