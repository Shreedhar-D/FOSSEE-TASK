import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function WorkshopCard({ workshop }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-2 text-blue-600">{workshop.title}</h2>
      <p className="text-gray-600 mb-4 line-clamp-2">{workshop.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">📅 {workshop.date}</p>
        <Link
          to={`/workshop/${workshop.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

WorkshopCard.propTypes = {
  workshop: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
  }),
};
