import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProject(data.data);
      });
  }, [id]);

  if (!project) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="text-white p-10">
      <h1 className="text-3xl text-blue-400 mb-6">{project.title}</h1>
      <img src={project.image} alt={project.title} className="mb-6 rounded-xl" />
      <p>{project.description}</p>
    </div>
  );
}

export default ProjectDetails;