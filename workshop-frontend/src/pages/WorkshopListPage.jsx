import { useState, useEffect } from "react";
import api from "../services/api";
import { showError } from "../utils/notifications";
import WorkshopCard from "../components/Cards/WorkshopCard";

export default function WorkshopListPage() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  // Fetch workshops from the API
  const fetchWorkshops = async () => {
    try {
      const response = await api.get("/api/workshops/");
      if (response.data.success) {
        setWorkshops(response.data.workshops); // extract workshops
      }
    } catch (error) {
      showError("Failed to load workshops");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading workshops...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Workshops</h1>
      {workshops.length === 0 ? (
        <p className="text-gray-500">No workshops found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => (
            <WorkshopCard key={workshop.id} workshop={workshop} />
          ))}
        </div>
      )}
    </div>
  );
}
