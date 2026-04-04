import { useState, useEffect } from "react";
import api from "../services/api";
import { showError } from "../utils/notifications";

export default function StatisticsPage() {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await api.get("/statistics/");
      setStatistics(response.data);
    } catch (error) {
      showError("Failed to load statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading statistics...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Statistics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-4xl font-bold text-blue-600">
            {statistics?.total_workshops || 0}
          </h2>
          <p className="text-gray-500 mt-2">Total Workshops</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-4xl font-bold text-green-600">
            {statistics?.total_participants || 0}
          </h2>
          <p className="text-gray-500 mt-2">Total Participants</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <h2 className="text-4xl font-bold text-purple-600">
            {statistics?.total_instructors || 0}
          </h2>
          <p className="text-gray-500 mt-2">Total Instructors</p>
        </div>
      </div>
    </div>
  );
}
