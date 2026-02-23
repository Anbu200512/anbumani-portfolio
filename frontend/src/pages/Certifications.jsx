import { useEffect, useState } from "react";

function Certifications() {
  const [certificates, setCertificates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const API = `${import.meta.env.VITE_API_URL}/api/certificates`;

  useEffect(() => {
    setLoading(true);

    fetch(`${API}?page=${currentPage}&limit=6`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCertificates(data.data);
          setTotalPages(data.totalPages);
        }
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  return (
    <div className="max-w-6xl mx-auto py-24 px-6 text-white">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Certifications
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert) => (
              <div
                key={cert._id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg"
              >
                <h3 className="text-lg font-semibold text-blue-400 mb-2">
                  {cert.title}
                </h3>

                <p className="text-sm text-gray-400 mb-2">{cert.issuer}</p>

                {cert.issueDate && (
                  <p className="text-xs text-gray-500 mb-4">
                    Issued: {cert.issueDate}
                  </p>
                )}

                {cert.credentialLink && (
                  <a
                    href={cert.credentialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:underline"
                  >
                    View Credential →
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-3 mt-16 flex-wrap">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded disabled:opacity-40 transition"
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded transition ${
                  currentPage === index + 1
                    ? "bg-blue-500 shadow-md shadow-blue-500/30"
                    : "bg-slate-800 hover:bg-slate-700"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded disabled:opacity-40 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Certifications;
