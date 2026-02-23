import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/experience`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setExperiences(data.data);
      });
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-24 px-6 text-white">
      <h2 className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Experience
      </h2>

      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 w-[2px] h-full bg-blue-500/30"></div>

        {experiences.map((exp, index) => {
          const isLeft = index % 2 === 0;
          const isExpanded = expandedId === exp._id;

          return (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`relative mb-16 flex ${
                isLeft ? "md:justify-start" : "md:justify-end"
              }`}
            >
              <div className="w-full md:w-5/12 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">

                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-xl font-semibold text-blue-400">
                    {exp.role}
                  </h3>

                  <span className="text-xs px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full">
                    {exp.type}
                  </span>
                </div>

                <p className="text-gray-400 text-sm">
                  {exp.company}
                </p>

                <p className="text-gray-500 text-sm mb-4">
                  {exp.startDate} – {exp.endDate || "Present"}
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {isExpanded
                    ? exp.description
                    : exp.description.slice(0, 120) + "..."}
                </p>

                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : exp._id)
                  }
                  className="text-blue-400 text-sm mt-3 hover:underline"
                >
                  {isExpanded ? "View Less ↑" : "View More ↓"}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default Experience;