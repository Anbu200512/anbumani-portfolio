import { useState, useEffect } from "react";

function AdminExperience() {
  const [form, setForm] = useState({
    role: "",
    company: "",
    type: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [experiences, setExperiences] = useState([]);

  const API = `${import.meta.env.VITE_API_URL}/api/experience`;

  const fetchData = async () => {
    const res = await fetch(API);
    const data = await res.json();
    if (data.success) setExperiences(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setForm({
      role: "",
      company: "",
      type: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    fetchData();
  };

  const handleDelete = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchData();
  };

  return (
    <div className="space-y-8">

      <h2 className="text-2xl font-bold text-blue-400">
        Manage Experience
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full p-3 bg-slate-900 border border-slate-800 rounded"
        />

        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="w-full p-3 bg-slate-900 border border-slate-800 rounded"
        />

        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full p-3 bg-slate-900 border border-slate-800 rounded"
        />

        <button className="px-6 py-3 bg-blue-500 rounded">
          Add Experience
        </button>
      </form>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp._id}
            className="bg-slate-900 p-4 rounded border border-slate-800"
          >
            <h3 className="text-blue-400 font-semibold">
              {exp.role} – {exp.company}
            </h3>

            <button
              onClick={() => handleDelete(exp._id)}
              className="text-red-400 text-sm mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

    </div>
  );
}

export default AdminExperience;