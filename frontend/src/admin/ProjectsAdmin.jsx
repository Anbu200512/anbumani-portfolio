import { useState, useEffect } from "react";

function ProjectsAdmin() {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (data.success) {
        setProjects(data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    github: "",
    live: "",
    category: "personal", // ADD THIS
    featured: false,
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("adminToken");

      const data = new FormData();
      data.append("title", formData.title);
      data.append("description", formData.description);
      data.append("techStack", formData.techStack);
      data.append("github", formData.github);
      data.append("live", formData.live);
      data.append("category", formData.category); // ADD THIS
      data.append("featured", formData.featured);
      if (image) data.append("image", image);

      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/api/projects/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/projects`;

      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();

      if (result.success) {
        alert(editingId ? "Project Updated ✅" : "Project Added 🚀");

        setFormData({
          title: "",
          description: "",
          techStack: "",
          github: "",
          live: "",
          category: "personal", // reset to default
          featured: false,
        });
        setImage(null);
        setEditingId(null);

        fetchProjects(); // refresh list
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Delete this project?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await res.json();

      if (data.success) {
        setProjects(projects.filter((p) => p._id !== id));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-400 mb-6">Add New Project</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded border border-slate-700"
          required
        />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          className="w-full p-3 bg-slate-800 rounded border border-slate-700"
          required
        />

        <input
          type="text"
          name="techStack"
          placeholder="Tech Stack (comma separated)"
          value={formData.techStack}
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded border border-slate-700"
        />

        <input
          type="text"
          name="github"
          placeholder="GitHub URL"
          value={formData.github}
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded border border-slate-700"
        />

        <input
          type="text"
          name="live"
          placeholder="Live URL"
          value={formData.live}
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded border border-slate-700"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="w-full p-3 bg-slate-800 rounded border border-slate-700"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full p-3 bg-slate-800 rounded border border-slate-700"
        >
          <option value="personal">Personal Project</option>
          <option value="freelance">Freelance Project</option>
        </select>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          <span>Featured Project</span>
        </label>

        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
        >
          {editingId ? "Update Project" : "Add Project"}
        </button>
      </form>

      <hr className="my-10 border-slate-800" />

      <h2 className="text-xl font-bold text-blue-400 mb-6">All Projects</h2>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex justify-between items-center"
          >
            <div>
              <p className="text-white font-semibold">{project.title}</p>
              <p className="text-sm text-gray-400">
                {project.featured ? "⭐ Featured" : "Normal"}
              </p>
            </div>

            <button
              onClick={() => handleDelete(project._id)}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded text-sm"
            >
              Delete
            </button>

            <button
              onClick={() => {
                setEditingId(project._id);
                setFormData({
                  title: project.title,
                  description: project.description,
                  techStack: project.techStack.join(", "),
                  github: project.github || "",
                  live: project.live || "",
                  featured: project.featured,
                });
              }}
              className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 rounded text-sm mr-3"
            >
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsAdmin;
