import { useState } from "react";

function ResumeAdmin() {
  const [file, setFile] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume", file);

    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/resume`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (data.success) {
      alert("Resume uploaded successfully!");
    } else {
      alert(data.message);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-400 mb-6">
        Upload Resume
      </h1>

      <form onSubmit={handleUpload} className="space-y-6">
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />

        <button
          type="submit"
          className="px-6 py-3 bg-blue-500 rounded-lg"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default ResumeAdmin;