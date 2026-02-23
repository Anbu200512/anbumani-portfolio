import { useEffect, useState } from "react";

const API = `${import.meta.env.VITE_API_URL}/api/experience`;

function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    role: "",
    company: "",
    location: "",
    type: "Internship",
    startDate: "",
    endDate: "",
    description: "",
  });

  // 🔄 Fetch Data
  const fetchData = async () => {
    const res = await fetch(API);
    const data = await res.json();
    if (data.success) {
      setExperiences(data.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ➕ Add or ✏ Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId ? `${API}/${editingId}` : API;

    await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    resetForm();
    fetchData();
  };

  // ✏ Edit
  const handleEdit = (exp) => {
    setEditingId(exp._id);
    setForm({
      role: exp.role,
      company: exp.company,
      location: exp.location || "",
      type: exp.type,
      startDate: exp.startDate,
      endDate: exp.endDate || "",
      description: exp.description,
    });
  };

  // ❌ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience?")) return;

    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchData();
  };

  const resetForm = () => {
    setEditingId(null);
    setForm({
      role: "",
      company: "",
      location: "",
      type: "Internship",
      startDate: "",
      endDate: "",
      description: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-400">
        Admin – Experience
      </h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4 mb-12"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Role"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="p-3 bg-slate-800 rounded"
            required
          />

          <input
            type="text"
            placeholder="Company"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            className="p-3 bg-slate-800 rounded"
            required
          />

          <input
            type="text"
            placeholder="Location"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="p-3 bg-slate-800 rounded"
          />

          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="p-3 bg-slate-800 rounded"
          >
            <option>Internship</option>
            <option>Freelance</option>
            <option>Full-time</option>
          </select>

          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="p-3 bg-slate-800 rounded"
            required
          />

          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="p-3 bg-slate-800 rounded"
          />
        </div>

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full p-3 bg-slate-800 rounded"
          rows="4"
          required
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded"
          >
            {editingId ? "Update Experience" : "Add Experience"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-2 bg-slate-700 hover:bg-slate-600 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="space-y-6">
        {experiences.map((exp) => (
          <div
            key={exp._id}
            className="bg-slate-900 p-6 rounded-xl border border-slate-800"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-blue-400">
                  {exp.role}
                </h3>
                <p className="text-gray-400">
                  {exp.company} • {exp.location}
                </p>
                <p className="text-gray-500 text-sm">
                  {exp.startDate} – {exp.endDate || "Present"}
                </p>
              </div>

              <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                {exp.type}
              </span>
            </div>

            <p className="text-gray-300 mt-4 text-sm">
              {exp.description}
            </p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEdit(exp)}
                className="text-yellow-400 hover:underline text-sm"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(exp._id)}
                className="text-red-400 hover:underline text-sm"
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

export default AdminExperience;