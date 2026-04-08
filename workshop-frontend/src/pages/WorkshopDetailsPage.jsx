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
      const response = await api.get(`/api/workshop/${id}/`);
      if (response.data.success) {
        setWorkshop(response.data.workshop); // Extract workshops
      }
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
    <div className="max-w-3xl mx-auto py-8 px-4">
      <button
        onClick={() => navigate("/workshops")}
        className="text-amber-500 hover:underline mb-6"
      >
        ← Back to Workshops
      </button>

      <div className="bg-gray-800 rounded-lg p-8 text-white">
        <h1 className="text-3xl font-bold text-amber-500 mb-4">
          {workshop.title}
        </h1>

        <div className="border-b border-gray-700 pb-4 mb-6">
          <p className="mb-2">📅 Date: {workshop.date}</p>
          <p className="mb-2">
            👤 Instructor: {workshop.instructor || "Not assigned"}
          </p>
          <p className="mb-2">
            Status: {workshop.status === 0 ? "Pending" : "Confirmed"}
          </p>
        </div>

        {workshop.comments && workshop.comments.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-amber-500 mb-4">Comments</h3>
            <div className="space-y-4">
              {workshop.comments.map((comment) => (
                <div key={comment.id} className="bg-gray-700 p-4 rounded">
                  <p className="text-sm text-amber-500">{comment.author}</p>
                  <p className="mt-2">{comment.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {comment.created_date}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
