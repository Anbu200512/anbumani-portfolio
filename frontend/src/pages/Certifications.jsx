import { useEffect, useState } from "react";

function Certifications() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/certificates`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCertificates(data.data);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-24 px-6 text-white">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Certifications
      </h2>

      {loading ? (
        <p className="text-center text-gray-400">Loading certificates...</p>
      ) : certificates.length === 0 ? (
        <p className="text-center text-gray-400">No certificates added yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div
              key={cert._id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-semibold text-blue-400 mb-2">
                {cert.title}
              </h3>

              <p className="text-sm text-gray-400 mb-2">
                {cert.issuer}
              </p>

              {cert.category && (
                <p className="text-xs text-gray-500 mb-4">
                  {cert.category}
                </p>
              )}

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
      )}
    </div>
  );
}

export default Certifications;