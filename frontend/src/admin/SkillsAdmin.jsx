import { useEffect, useState } from "react";

function SkillsAdmin() {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "frontend",
  });

  // ✅ Correct token key (make sure login uses same key)
const token = localStorage.getItem("adminToken");
  const API = `${import.meta.env.VITE_API_URL}/api/skills`;

  // 🔄 Fetch Skills (Protected)
  const fetchSkills = async () => {
    try {
      const res = await fetch(API, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        alert("Session expired. Please login again.");
        return;
      }

      const data = await res.json();
      if (data.success) {
        setSkills(data.data);
      }
    } catch (error) {
      console.error("Fetch Skills Error:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchSkills();
    }
  }, []);

  // ➕ Add Skill
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (res.status === 401) {
        alert("Unauthorized. Please login again.");
        return;
      }

      const data = await res.json();

      if (data.success) {
        setFormData({ name: "", category: "frontend" });
        fetchSkills();
      } else {
        alert("Failed to add skill");
      }
    } catch (error) {
      console.error("Add Skill Error:", error);
    }
  };

  // ❌ Delete Skill
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this skill?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`${API}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        alert("Unauthorized. Please login again.");
        return;
      }

      const data = await res.json();

      if (data.success) {
        fetchSkills();
      }
    } catch (error) {
      console.error("Delete Skill Error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-400 mb-6">
        Manage Skills
      </h1>

      {/* Add Skill Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4"
      >
        <input
          type="text"
          placeholder="Skill Name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full p-3 bg-slate-800 rounded border border-slate-700"
          required
        />

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full p-3 bg-slate-800 rounded border border-slate-700"
        >
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="Programming Languages">Programming Languages</option>
          <option value="Core Concepts">Core Concepts</option>
          <option value="tools">Tools</option>
        </select>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
        >
          Add Skill
        </button>
      </form>

      {/* Skill List */}
      <div className="mt-10 space-y-4">
        {skills.map((skill) => (
          <div
            key={skill._id}
            className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <p className="text-white font-semibold">
                {skill.name}
              </p>
              <p className="text-sm text-gray-400 capitalize">
                {skill.category}
              </p>
            </div>

            <button
              onClick={() => handleDelete(skill._id)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsAdmin;