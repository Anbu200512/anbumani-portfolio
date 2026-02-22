import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profile from "../assets/profile.png";
import { useEffect, useState } from "react";

function About() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (

    <div className="text-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center px-6 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-10"></div>

        {/* Glow Blobs */}
        <motion.div
          animate={isMobile ? false : { scale: [1, 1.2, 1] }}
          transition={isMobile ? {} : { duration: 14, repeat: Infinity }}
          className="absolute -left-20 md:-left-40 top-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/20 blur-[60px] md:blur-[150px] rounded-full -z-20"
        />

        <motion.div
          animate={isMobile ? false : { scale: [1.2, 1, 1.2] }}
          transition={isMobile ? {} : { duration: 18, repeat: Infinity }}
          className="absolute right-[-80px] md:right-[-200px] bottom-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-500/20 blur-[60px] md:blur-[150px] rounded-full -z-20"
        />

        <motion.div
          initial={isMobile ? false : "hidden"}
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } },
          }}
          className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center"
        >
          {/* LEFT CONTENT */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
          >
            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-3xl sm:text-4xl md:text-4xl font-bold mb-6 md:mb-8 leading-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
            >
              From Engineering Circuits to Scalable Software Systems
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-gray-300 text-base md:text-lg leading-relaxed mb-6"
            >
              My journey began in Electronics and Communication Engineering,
              where I developed strong analytical thinking and system-level
              problem-solving skills.
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-gray-400 text-base md:text-lg leading-relaxed mb-6"
            >
              During my academic years, I discovered a deep interest in building
              digital solutions. What started as curiosity gradually evolved
              into a focused path toward full-stack development.
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-gray-400 text-base md:text-lg leading-relaxed"
            >
              Today, I build secure and scalable MERN stack applications with
              strong backend architecture, authentication systems, and
              real-world deployment practices.
            </motion.p>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 },
              }}
              className="mt-8 md:mt-10 text-white font-semibold text-base md:text-lg"
            >
              I don’t just write code — I build structured systems that solve
              real problems.
            </motion.p>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 60 },
              show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
            }}
            className="flex justify-center mt-10 md:mt-0"
          >
            <motion.div
              animate={isMobile ? false : { y: [0, -15, 0] }}
              transition={isMobile ? {} : { duration: 5, repeat: Infinity }}
              whileHover={isMobile ? {} : { rotate: 3, scale: 1.05 }}
              className="relative"
            >
              <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-blue-500/10 blur-2xl md:blur-3xl rounded-3xl"></div>

              <div className="relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-400 via-purple-500 to-blue-400">
                <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={profile}
                    alt="Anbumani"
                    loading="lazy"
                    className="w-64 sm:w-80 md:w-96 aspect-[4/5] object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* WHAT I FOCUS ON */}
      <section className="relative py-20 md:py-32 px-6 overflow-hidden">
        {/* Background Glow */}
        <motion.div
          animate={isMobile ? false : { scale: [1, 1.2, 1] }}
          transition={isMobile ? {} : { duration: 16, repeat: Infinity }}
          className="absolute left-[-80px] md:left-[-200px] top-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/10 blur-[60px] md:blur-[140px] rounded-full -z-10"
        />

        <motion.div
          initial={isMobile ? false : "hidden"}
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="max-w-6xl mx-auto"
        >
          {/* Section Title */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="text-3xl sm:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            What I Focus On
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
            className="text-gray-400 text-center mb-12 md:mb-20 max-w-2xl mx-auto text-sm md:text-base"
          >
            I focus on building structured, secure and production-ready systems
            — not just writing code, but designing complete solutions.
          </motion.p>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
            {[
              {
                title: "Backend Architecture",
                desc: "Designing structured REST APIs, clean database models, and scalable server-side logic.",
              },
              {
                title: "Secure Authentication",
                desc: "Implementing JWT-based authentication, role-based access control, and secure session handling.",
              },
              {
                title: "Full-Stack MERN",
                desc: "Building responsive React frontends integrated with Node.js and MongoDB backends.",
              },
              {
                title: "Deployment & Production",
                desc: "Deploying applications with proper environment configuration and real-world readiness.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                }}
                whileHover={isMobile ? {} : { y: -10 }}
                className="group relative bg-slate-950 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl transition-all duration-500"
              >
                <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-500/40 transition duration-500 pointer-events-none"></div>

                <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 md:py-32 px-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Ready to Build Impactful Solutions
        </h2>

        <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          I am actively seeking opportunities where I can contribute, grow, and
          build scalable applications with real impact.
        </p>

        <Link
          to="/contact"
          className="inline-block px-8 sm:px-10 py-3 sm:py-4 bg-blue-500 hover:bg-blue-600 rounded-xl shadow-lg shadow-blue-500/40 transition w-full sm:w-auto"
        >
          Let’s Connect
        </Link>
      </section>

    </div>
  );
}

export default About;
