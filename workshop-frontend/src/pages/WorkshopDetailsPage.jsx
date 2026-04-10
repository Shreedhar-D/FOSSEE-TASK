import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { showError } from "../utils/notifications";
import LoadingSpinner from "../components/Common/LoadingSpinner";

export default function WorkshopDetailsPage() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWorkshop = async () => {
      try {
        const response = await api.get(`/api/workshop/${id}/`);
        if (response.data.success) {
          setWorkshop(response.data.workshop);
        }
      } catch (error) {
        showError("Failed to load workshop details");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshop();
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!workshop) {
    return (
      <div className="text-center py-8 text-red-500">Workshop not found.</div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-6 md:py-8 px-4 md:px-6">
      <button
        onClick={() => navigate("/workshops")}
        className="text-[rgb(23,162,184)] hover:underline mb-6 text-sm md:text-base py-2 -ml-2 pl-2"
      >
        ← Back to Workshops
      </button>

      <div className="bg-white rounded-lg p-5 md:p-8 shadow-md">
        <h1 className="text-2xl md:text-3xl font-bold text-[rgb(23,162,184)] mb-5 text-gray-800">
          {workshop.title}
        </h1>

        <div className="border-b border-gray-300 pb-5 mb-6 grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="mb-3 text-gray-700 text-sm md:text-base">
              📅 Date: {workshop.date}
            </p>
            <p className="mb-3 text-gray-700 text-sm md:text-base">
              👤 Instructor: {workshop.instructor || "Not assigned"}
            </p>
          </div>
          <div>
            <p className="mb-3 text-gray-700 text-sm md:text-base">
              Status: {workshop.status === 0 ? "Pending" : "Confirmed"}
            </p>
          </div>
        </div>

        {workshop.comments && workshop.comments.length > 0 && (
          <div>
            <h3 className="text-lg md:text-xl font-bold text-[rgb(23,162,184)] mb-5">
              Comments
            </h3>
            <div className="space-y-4">
              {workshop.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-100 p-4 md:p-5 rounded-lg border border-gray-300"
                >
                  <p className="text-sm font-semibold text-[rgb(23,162,184)]">
                    {comment.author}
                  </p>
                  <p className="mt-2 text-gray-700 text-sm md:text-base">
                    {comment.comment}
                  </p>
                  <p className="text-xs text-gray-500 mt-3">
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
