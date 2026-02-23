import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const toggleExpand = (id) => { setExpandedId(expandedId === id ? null : id); };

useEffect(() => {
  fetch(
    `${import.meta.env.VITE_API_URL}/api/projects?page=${currentPage}&limit=6`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {

        // 🔥 FILTER HERE
        const personalProjects = data.data.filter(
          (project) => project.category?.toLowerCase() !== "freelance"
        );

        setProjects(personalProjects);
        setTotalPages(data.totalPages);
      }
    })
    .catch((err) => console.log("Error:", err));
}, [currentPage]);

  return (
    <div className="relative max-w-6xl mx-auto py-20 md:py-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute left-[-80px] md:left-[-200px] top-10 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/10 blur-[60px] md:blur-[150px] rounded-full -z-10"></div>

      {/* Title */}
      <motion.h2
        initial={isMobile ? false : { opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        My Projects
      </motion.h2>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, index) => {
          const isExpanded = expandedId === project._id;

          return (
            <motion.div
              key={project._id}
              initial={isMobile ? false : { opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={isMobile ? {} : { y: -8 }}
              className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl transition-all duration-500"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-48 md:h-60 object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition"></div>
              </div>

              {/* Content */}
              <div className="p-5 md:p-6 space-y-4">
                <h3 className="text-lg md:text-xl font-semibold text-blue-400">
                  {project.title}
                </h3>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack?.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-slate-800 px-3 py-1 rounded-full text-blue-400 border border-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <AnimatePresence initial={false}>
                  <motion.p
                    key={isExpanded ? "expanded" : "collapsed"}
                    initial={isMobile ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-gray-300 text-sm leading-relaxed"
                  >
                    {isExpanded
                      ? project.description
                      : project.description.slice(0, 120) + "..."}
                  </motion.p>
                </AnimatePresence>

                <button
                  onClick={() => toggleExpand(project._id)}
                  className="text-blue-400 text-sm hover:underline"
                >
                  {isExpanded ? "Show Less ↑" : "View More ↓"}
                </button>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  {project.github && (
                    <motion.a
                      whileHover={isMobile ? {} : { scale: 1.05 }}
                      whileTap={isMobile ? {} : { scale: 0.95 }}
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition"
                    >
                      GitHub
                    </motion.a>
                  )}

                  {project.live && (
                    <motion.a
                      whileHover={isMobile ? {} : { scale: 1.05 }}
                      whileTap={isMobile ? {} : { scale: 0.95 }}
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm transition shadow-md shadow-blue-500/30"
                    >
                      Live
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-2 md:gap-3 mt-12 md:mt-16 flex-wrap">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-3 md:px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded disabled:opacity-40 transition text-sm"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 md:px-4 py-2 rounded transition text-sm ${
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
          className="px-3 md:px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded disabled:opacity-40 transition text-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Projects;
