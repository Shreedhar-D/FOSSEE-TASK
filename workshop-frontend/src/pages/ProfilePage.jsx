import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { showSuccess, showError } from "../utils/notifications";
import LoadingSpinner from "../components/Common/LoadingSpinner";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await logout();
      showSuccess("Logged out successfully");
      navigate("/login");
    } catch (error) {
      showError("Failed to logout");
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  const getRoleColor = () => {
    return user?.is_instructor
      ? "bg-amber-100 text-amber-800"
      : "bg-cyan-100 text-cyan-800";
  };

  const getRoleLabel = () => {
    return user?.is_instructor ? "Instructor" : "Coordinator";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-cyan-600 mb-2">
            My Profile
          </h1>
          <p className="text-gray-600">
            View and manage your account information
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-6">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              {/* Avatar */}
              <div className="bg-white text-cyan-600 rounded-full h-20 w-20 flex items-center justify-center text-3xl font-bold shadow-md">
                {user?.username?.charAt(0).toUpperCase()}
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {user?.first_name || user?.username}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor()} w-fit`}
                  >
                    {getRoleLabel()}
                  </span>
                </div>
                <p className="text-cyan-50 mt-2">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Username */}
              <div className="border-b-2 border-gray-200 pb-4">
                <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  Username
                </label>
                <p className="text-lg font-medium text-gray-900">
                  {user?.username}
                </p>
              </div>

              {/* Email */}
              <div className="border-b-2 border-gray-200 pb-4">
                <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  Email
                </label>
                <p className="text-lg font-medium text-gray-900">
                  {user?.email}
                </p>
              </div>

              {/* First Name */}
              {user?.first_name && (
                <div className="border-b-2 border-gray-200 pb-4">
                  <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    First Name
                  </label>
                  <p className="text-lg font-medium text-gray-900">
                    {user?.first_name}
                  </p>
                </div>
              )}

              {/* Last Name */}
              {user?.last_name && (
                <div className="border-b-2 border-gray-200 pb-4">
                  <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Last Name
                  </label>
                  <p className="text-lg font-medium text-gray-900">
                    {user?.last_name}
                  </p>
                </div>
              )}

              {/* User ID */}
              <div className="border-b-2 border-gray-200 pb-4">
                <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  User ID
                </label>
                <p className="text-lg font-medium text-gray-900">#{user?.id}</p>
              </div>

              {/* Role */}
              <div className="border-b-2 border-gray-200 pb-4">
                <label className="block text-sm font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                  Account Type
                </label>
                <p className="text-lg font-medium">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getRoleColor()}`}
                  >
                    {getRoleLabel()}
                  </span>
                </p>
              </div>
            </div>

            

            {/* Action Buttons */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-cyan-600 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Change Password */}
                <Link
                  to="/password-change"
                  className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium text-center block"
                >
                  🔐 Change Password
                </Link>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  disabled={isLoading}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium disabled:opacity-50"
                >
                  {isLoading ? "Logging out..." : "🚪 Logout"}
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
