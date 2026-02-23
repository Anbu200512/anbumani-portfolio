import { useEffect, useState } from "react";

function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/experience`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setExperiences(data.data);
        }
      })
      .catch((err) => console.error("Experience fetch error:", err));
  }, []);

  return (
    <div className="max-w-5xl mx-auto py-24 px-6 text-white">

      {/* Heading */}
      <h2 className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Experience
      </h2>

      <div className="relative border-l-2 border-blue-500/40 pl-8 space-y-16">

        {experiences.map((exp) => (
          <div key={exp._id} className="relative">

            {/* Dot */}
            <span className="absolute -left-[11px] top-2 w-5 h-5 bg-blue-500 rounded-full border-4 border-slate-950"></span>

            {/* Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-lg">

              <h3 className="text-xl font-semibold text-blue-400">
                {exp.role}
              </h3>

              <p className="text-gray-400 mt-1 text-sm">
                {exp.company} {exp.type && `• ${exp.type}`}
              </p>

              <p className="text-gray-500 text-sm mt-1">
                {exp.startDate} - {exp.endDate || "Present"}
              </p>

              <p className="text-gray-300 mt-4 text-sm leading-relaxed">
                {exp.description}
              </p>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

export default Experience;