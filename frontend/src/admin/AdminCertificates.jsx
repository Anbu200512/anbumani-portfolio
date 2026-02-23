import { useEffect, useState } from "react";

function AdminCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    issuer: "",
    category: "",
    issueDate: "",
    credentialLink: "",
  });

  const [editingId, setEditingId] = useState(null);

  const API = `${import.meta.env.VITE_API_URL}/api/certificates`;

  // Fetch Certificates
  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCertificates(data.data);
        }
      });
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit (Add / Update)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/${editingId}` : API;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      alert(editingId ? "Updated!" : "Added!");
      setFormData({
        title: "",
        issuer: "",
        category: "",
        issueDate: "",
        credentialLink: "",
      });
      setEditingId(null);
      window.location.reload();
    }
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this certificate?")) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    window.location.reload();
  };

  // Edit
  const handleEdit = (cert) => {
    setFormData(cert);
    setEditingId(cert._id);
  };

  return (
    <div className="max-w-4xl mx-auto py-20 px-6 text-white">
      <h2 className="text-3xl font-bold mb-10 text-center">
        Manage Certificates
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-16">
        <input
          name="title"
          placeholder="Certificate Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full p-3 bg-slate-900 rounded border border-slate-700"
        />

        <input
          name="issuer"
          placeholder="Issuer (IBM, Coursera...)"
          value={formData.issuer}
          onChange={handleChange}
          required
          className="w-full p-3 bg-slate-900 rounded border border-slate-700"
        />

        <input
          name="category"
          placeholder="Category (Programming, Web...)"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 bg-slate-900 rounded border border-slate-700"
        />

        <input
          name="issueDate"
          placeholder="Issue Date"
          value={formData.issueDate}
          onChange={handleChange}
          className="w-full p-3 bg-slate-900 rounded border border-slate-700"
        />

        <input
          name="credentialLink"
          placeholder="Credential Link"
          value={formData.credentialLink}
          onChange={handleChange}
          className="w-full p-3 bg-slate-900 rounded border border-slate-700"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 py-3 rounded"
        >
          {editingId ? "Update Certificate" : "Add Certificate"}
        </button>
      </form>

      {/* List */}
      <div className="space-y-6">
        {certificates.map((cert) => (
          <div
            key={cert._id}
            className="bg-slate-900 p-5 rounded border border-slate-800 flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{cert.title}</h3>
              <p className="text-sm text-gray-400">
                {cert.issuer} • {cert.category}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => handleEdit(cert)}
                className="text-yellow-400"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(cert._id)}
                className="text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminCertificates;