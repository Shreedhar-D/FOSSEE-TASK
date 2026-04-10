export default function StatisticsPage() {
  const statsUrl = "http://localhost:8000/statistics/public";

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-[rgb(23,162,184)]">
        Workshop Statistics
      </h1>
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8 space-y-4">
        <p className="text-gray-700 leading-7">
          The full statistics dashboard is available in the existing workshop
          portal view, including filters, charts, and download options.
        </p>
        <a
          href={statsUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center rounded-lg bg-[rgb(23,162,184)] px-5 py-3 text-white font-semibold hover:opacity-90 transition"
        >
          Open Public Statistics
        </a>
      </div>
    </div>
  );
}
