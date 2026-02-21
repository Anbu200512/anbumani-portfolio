import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function Freelance() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/projects?category=freelance&limit=10`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProjects(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="relative max-w-6xl mx-auto py-28 px-6 overflow-hidden">

      {/* Background Glow */}
      <div className="absolute left-[-200px] top-20 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full -z-10"></div>
      <div className="absolute right-[-200px] bottom-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] rounded-full -z-10"></div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Freelance Experience
      </motion.h2>

      {projects.length === 0 && (
        <p className="text-center text-gray-500">
          No freelance projects added yet.
        </p>
      )}

      <div className="space-y-28">
        {projects.map((project, index) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className={`grid md:grid-cols-2 gap-14 items-center ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-3xl"></div>

              <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[350px] object-cover transition duration-700 group-hover:scale-110"
                />
              </div>
            </motion.div>

            {/* Content */}
            <div>

              <p className="text-sm text-purple-400 mb-3">
                Real Client Project
              </p>

              <h3 className="text-3xl font-semibold text-blue-400 mb-6">
                {project.title}
              </h3>

              <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-3 mb-8">
                {project.techStack?.map((tech, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="text-sm bg-slate-800 px-4 py-2 rounded-full text-blue-400 border border-slate-700 hover:border-blue-500 transition"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-5 flex-wrap">
                {project.live && (
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition shadow-lg shadow-blue-500/30"
                  >
                    View Live
                  </motion.a>
                )}
              </div>

            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}

export default Freelance;