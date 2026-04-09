import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const { user } = useAuth();

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold text-blue-600 mb-4">
        Welcome, {user?.username}!
      </h1>
      <p className="text-gray-600 text-lg mb-8">
        Manage and explore workshops from one place.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Link
          to="/workshops"
          className="bg-indigo-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <h2 className="text-2xl font-bold mb-2">Workshops</h2>
          <p className="text-blue-100">Browse and manage workshops</p>
        </Link>
        <Link
          to="/statistics/public"
          className="bg-teal-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors"
        >
          <h2 className="text-2xl font-bold mb-2">Statistics</h2>
          <p className="text-green-100">View workshop statistics</p>
        </Link>
      </div>
    </div>
  );
}
