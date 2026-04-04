import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { showError } from "../utils/notifications";

export default function WorkshopDetailsPage() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWorkshop();
  }, [id]);

  const fetchWorkshop = async () => {
    try {
      const response = await api.get(`/workshops/${id}/`);
      setWorkshop(response.data);
    } catch (error) {
      showError("Failed to load workshop details");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (!workshop) {
    return (
      <div className="text-center py-8 text-red-500">Workshop not found.</div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
      <button
        onClick={() => navigate("/workshops")}
        className="text-blue-600 hover:underline mb-4 block"
      >
        ← Back to Workshops
      </button>
      <h1 className="text-3xl font-bold text-blue-600 mb-4">
        {workshop.title}
      </h1>
      <p className="text-gray-600 mb-6">{workshop.description}</p>
      <div className="border-t pt-4">
        <p className="text-gray-500 mb-2">📅 Date: {workshop.date}</p>
        <p className="text-gray-500 mb-2">
          👤 Instructor: {workshop.instructor}
        </p>
        <p className="text-gray-500 mb-2">📍 Location: {workshop.location}</p>
      </div>
    </div>
  );
}
