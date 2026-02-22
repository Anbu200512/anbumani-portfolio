import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import profile from "../assets/profile.png";
import freelance from "../assets/pavishna.png";
import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";

function Home() {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [skills, setSkills] = useState([]);

  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeName, setResumeName] = useState("");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/resume`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setResumeUrl(data.data.fileUrl);
          setResumeName(data.data.fileName);
        }
      });
  }, []);

  // Fetch Featured Projects
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/projects?featured=true`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const filtered = data.data.filter(
            (project) => project.category !== "freelance",
          );
          setFeaturedProjects(filtered);
        }
      })
      .catch((err) => console.error("Projects fetch error:", err));
  }, []);

  // Fetch Skills
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/skills`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSkills(data.data);
        }
      })
      .catch((err) => console.error("Skills fetch error:", err));
  }, []);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <motion.div
      initial={isMobile ? false : { opacity: 0 }}
      animate={isMobile ? false : { opacity: 1 }}
      exit={isMobile ? false : { opacity: 0 }}
      transition={isMobile ? { duration: 0 } : { duration: 0.4 }}
      className="text-white"
    >
      {/* HERO */}

      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center px-6 overflow-hidden">

      {/* Grid Background */}
      <div className="absolute inset-0 -z-30 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:40px_40px] opacity-20"></div>

      {/* Gradient Blobs */}
      <motion.div
        animate={isMobile ? false : { scale: [1, 1.3, 1] }}
        transition={isMobile ? {} : { duration: 12, repeat: Infinity }}
        className="absolute w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-500/20 blur-[30px] md:blur-[120px] rounded-full"
      />

      <motion.div
        animate={isMobile ? false : { scale: [1.2, 1, 1.2] }}
        transition={isMobile ? {} : { duration: 15, repeat: Infinity }}
        className="absolute right-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-purple-500/20 blur-[80px] md:blur-[150px] rounded-full -z-20"
      />

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* LEFT SIDE */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, y: 40 }}
          animate={isMobile ? false : { opacity: 1, y: 0 }}
          transition={isMobile ? {} : { duration: 0.8 }}
        >
          <p className="text-blue-400 font-medium mb-4">Hi, I'm</p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Anbumani
            </span>
          </h1>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-200 mb-6">
            <Typewriter
              words={[
                "Full-Stack MERN Developer",
                "Backend-Focused Engineer",
                "Building Scalable Applications",
              ]}
              loop={!isMobile}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1200}
            />
          </h2>

          <p className="text-gray-300 text-base sm:text-lg max-w-xl mb-8 leading-relaxed">
            I build secure, scalable, production-ready web applications
            combining robust backend architecture with modern responsive UI.
          </p>

          {/* Social Icons */}
          <div className="flex flex-wrap gap-6 mb-8">
            {[
              { icon: <FaGithub />, link: "https://github.com/Anbu200512" },
              { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/anbumani-v" },
              { icon: <FaInstagram />, link: "https://www.instagram.com/its_.anbu" },
              { icon: <FaEnvelope />, link: "mailto:anbuv0012@gmail.com" },
              { icon: <FaWhatsapp />, link: "https://wa.me/6374114513" },
              { icon: <FaPhone />, link: "tel:+6374114513" },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={isMobile ? {} : { scale: 1.2 }}
                whileTap={isMobile ? {} : { scale: 0.95 }}
                className="text-gray-400 hover:text-white text-2xl transition duration-300"
              >
                {item.icon}
              </motion.a>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.div
              whileHover={isMobile ? {} : { scale: 1.08 }}
              whileTap={isMobile ? {} : { scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/projects"
                className="w-full sm:w-auto block text-center px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg shadow-lg shadow-blue-500/30"
              >
                View Projects
              </Link>
            </motion.div>

            <motion.div
              whileHover={isMobile ? {} : { scale: 1.08 }}
              whileTap={isMobile ? {} : { scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/contact"
                className="w-full sm:w-auto block text-center px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg"
              >
                Hire Me
              </Link>
            </motion.div>

            {resumeUrl && (
              <motion.div
                whileHover={isMobile ? {} : { scale: 1.08 }}
                className="w-full sm:w-auto"
              >
                <a
                  href={`${import.meta.env.VITE_API_URL}/api/resume/download`}
                  className="w-full sm:w-auto block text-center px-6 py-3 border border-slate-700 hover:border-blue-500 rounded-lg"
                >
                  Download Resume
                </a>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* RIGHT SIDE PROFILE */}
        <motion.div
          initial={isMobile ? false : { opacity: 0, x: 60 }}
          animate={isMobile ? false : { opacity: 1, x: 0 }}
          transition={isMobile ? {} : { duration: 0.8 }}
          className="relative flex justify-center mt-10 md:mt-0"
        >
          <motion.div
            animate={isMobile ? false : { y: [0, -15, 0] }}
            transition={isMobile ? {} : { duration: 4, repeat: Infinity }}
            className="relative"
          >
            <div className="absolute w-72 md:w-96 h-72 md:h-96 bg-blue-500/10 blur-2xl md:blur-3xl rounded-3xl"></div>

            <motion.div
              whileHover={isMobile ? {} : { rotate: 3, scale: 1.05 }}
              className="relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-400 via-purple-500 to-blue-400"
            >
              <div className="bg-slate-950 rounded-3xl overflow-hidden shadow-2xl">
                <div className="w-64 sm:w-72 md:w-80 lg:w-96 aspect-[4/5]">
                  <img
                    src={profile}
                    alt="Anbumani"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </section>

      {/* ABOUT PREVIEW */}
     <section className="relative py-20 md:py-32 px-6 text-center overflow-hidden">

  {/* Background Glow */}
  <div className="absolute inset-0 -z-20 bg-slate-900/40"></div>

  <motion.div
    animate={isMobile ? false : { scale: [1, 1.2, 1] }}
    transition={isMobile ? {} : { duration: 12, repeat: Infinity }}
    className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-500/10 blur-[60px] md:blur-[120px] rounded-full -z-10"
  />

  <motion.div
    initial={isMobile ? false : "hidden"}
    whileInView={isMobile ? false : "show"}
    viewport={{ once: true }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.2 } },
    }}
    className="max-w-5xl mx-auto"
  >

    {/* Heading */}
    <motion.h2
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      }}
      className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 md:mb-12 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
    >
      About Me
    </motion.h2>

    {/* Main Content Card */}
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      }}
      whileHover={isMobile ? {} : { scale: 1.02 }}
      className="relative p-[2px] rounded-3xl bg-gradient-to-br from-blue-400 via-purple-500 to-blue-400"
    >
      <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 md:p-14">
        <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
          I’m a{" "}
          <span className="text-blue-400 font-semibold">
            final-year Electronics and Communication Engineering student
          </span>{" "}
          with a strong passion for{" "}
          <span className="text-purple-400 font-semibold">
            full-stack web development
          </span>.
        </p>

        <p className="text-gray-400 text-base sm:text-lg mt-6 leading-relaxed">
          Over the past year, I’ve built real-world projects including a
          production-ready freelance web application featuring secure JWT
          authentication, admin dashboard, and dynamic CMS.
        </p>

        <p className="text-gray-400 text-base sm:text-lg mt-6 leading-relaxed">
          I focus on writing clean, scalable backend systems and designing
          intuitive user experiences that feel modern and efficient.
        </p>
      </div>
    </motion.div>

    {/* Stats */}
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mt-12 md:mt-16"
    >
      {[
        { number: "10+", label: "Projects Built" },
        { number: "1+", label: "Year Experience" },
        { number: "100%", label: "Client Satisfaction" },
        { number: "MERN", label: "Specialization" },
      ].map((stat, i) => (
        <motion.div
          key={i}
          whileHover={isMobile ? {} : { y: -10, scale: 1.05 }}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-5 md:p-6 shadow-lg"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-blue-400">
            {stat.number}
          </h3>
          <p className="text-gray-400 mt-2 text-sm">{stat.label}</p>
        </motion.div>
      ))}
    </motion.div>

  </motion.div>
</section>
      <section className="relative py-20 md:py-32 px-6 bg-slate-900/40 border-y border-slate-800 overflow-hidden">

  {/* Background Glow */}
  <motion.div
    animate={isMobile ? false : { scale: [1, 1.2, 1] }}
    transition={isMobile ? {} : { duration: 14, repeat: Infinity }}
    className="absolute -left-20 md:-left-40 top-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/10 blur-[60px] md:blur-[120px] rounded-full -z-10"
  />

  <motion.div
    initial={isMobile ? false : "hidden"}
    whileInView={isMobile ? false : "show"}
    viewport={{ once: true }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.2 } },
    }}
    className="max-w-6xl mx-auto"
  >

    {/* Heading */}
    <motion.h2
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      }}
      className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-20 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
    >
      Freelance Experience
    </motion.h2>

    <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">

      {/* LEFT IMAGE */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: -60 },
          show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
        }}
        whileHover={isMobile ? {} : { scale: 1.03, rotate: 1 }}
        className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl"
      >
        <motion.img
          src={freelance}
          alt="Pavishna Pannai Service"
          loading="lazy"
          className="w-full h-64 md:h-72 object-cover"
          whileHover={isMobile ? {} : { scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />

        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition duration-700"></div>
      </motion.div>

      {/* RIGHT CONTENT */}
      <motion.div
        variants={{
          hidden: { opacity: 0, x: 60 },
          show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
        }}
      >
        <h3 className="text-2xl md:text-3xl font-semibold text-blue-400 mb-6">
          Pavishna Pannai Service
        </h3>

        <p className="text-gray-300 leading-relaxed mb-6 text-base md:text-lg">
          Designed, developed and deployed a production-ready full-stack
          MERN application with secure JWT authentication, admin dashboard
          and dynamic CMS tailored for business growth.
        </p>

        {/* Testimonial */}
        <motion.div
          whileHover={isMobile ? {} : { scale: 1.02 }}
          className="bg-slate-900 p-5 md:p-6 rounded-2xl border-l-4 border-blue-400 mb-8 shadow-lg"
        >
          <p className="text-gray-300 italic text-base md:text-lg">
            "Delivered a professional and reliable website that
            significantly improved our customer interaction and business
            presence."
          </p>
        </motion.div>

        {/* Button */}
        <motion.a
          href="https://your-live-link.com"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={isMobile ? {} : { scale: 1.08 }}
          whileTap={isMobile ? {} : { scale: 0.95 }}
          className="block sm:inline-block text-center px-8 md:px-10 py-3 md:py-4 bg-blue-500 hover:bg-blue-600 rounded-xl shadow-lg shadow-blue-500/40 transition"
        >
          View Live Website
        </motion.a>
      </motion.div>

    </div>
  </motion.div>
</section>
      {/* FEATURED PROJECTS */}
<section className="relative py-20 md:py-28 px-6 overflow-hidden">

  {/* Background Glow */}
  <motion.div
    animate={isMobile ? false : { scale: [1, 1.2, 1] }}
    transition={isMobile ? {} : { duration: 14, repeat: Infinity }}
    className="absolute -left-20 md:-left-40 top-20 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-500/10 blur-[60px] md:blur-[120px] rounded-full -z-10"
  />

  <motion.div
    initial={isMobile ? false : "hidden"}
    whileInView={isMobile ? false : "show"}
    viewport={{ once: true }}
    variants={{
      hidden: {},
      show: { transition: { staggerChildren: 0.2 } },
    }}
    className="max-w-6xl mx-auto"
  >
    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 md:mb-16 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
      Featured Projects
    </h2>

    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {featuredProjects.map((project) => (
        <motion.div
          key={project._id}
          variants={{
            hidden: { opacity: 0, y: 60 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
          }}
          whileHover={isMobile ? {} : { y: -12 }}
          className="group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl transition-all duration-500"
        >

          {/* Image */}
          <div className="relative overflow-hidden">
            <motion.img
              src={project.image || "/fallback.png"}
              alt={project.title}
              loading="lazy"
              className="w-full h-48 md:h-52 object-cover"
              whileHover={isMobile ? {} : { scale: 1.08 }}
              transition={{ duration: 0.5 }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none"></div>
          </div>

          {/* Content */}
          <div className="p-5 md:p-6">
            <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-3">
              {project.title}
            </h3>

            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {project.description?.slice(0, 90)}...
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack?.slice(0, 3).map((tech, i) => (
                <span
                  key={i}
                  className="text-xs bg-slate-800 border border-slate-700 px-3 py-1 rounded-full text-blue-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons Row */}
            <div className="flex flex-wrap items-center justify-between gap-3">

              <Link
                to={`/projects/${project._id}`}
                className="text-sm text-blue-400 hover:text-blue-300 transition"
              >
                View Details →
              </Link>

              <div className="flex gap-3">
                {project.github && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={isMobile ? {} : { scale: 1.1 }}
                    whileTap={isMobile ? {} : { scale: 0.95 }}
                    className="px-3 py-1 text-xs bg-slate-800 border border-slate-700 rounded-lg hover:border-blue-500 transition"
                  >
                    GitHub
                  </motion.a>
                )}

                {project.live && (
                  <motion.a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={isMobile ? {} : { scale: 1.1 }}
                    whileTap={isMobile ? {} : { scale: 0.95 }}
                    className="px-3 py-1 text-xs bg-blue-500 hover:bg-blue-600 rounded-lg transition"
                  >
                    Live
                  </motion.a>
                )}
              </div>

            </div>
          </div>

          <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-500/40 transition duration-500 pointer-events-none"></div>
        </motion.div>
      ))}
    </div>

    <div className="text-center mt-12 md:mt-14">
      <Link
        to="/projects"
        className="px-6 md:px-8 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition shadow-lg shadow-blue-500/30"
      >
        View All Projects
      </Link>
    </div>

  </motion.div>
</section>

      {/* SKILLS PREVIEW */}
      <section className="relative py-32 px-6 bg-slate-900/30 border-y border-slate-800 overflow-hidden">
        {/* Background Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 18, repeat: Infinity }}
          className="absolute left-[-200px] top-20 w-[600px] h-[600px] bg-purple-500/10 blur-[140px] rounded-full -z-10"
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.15 } },
          }}
          className="max-w-6xl mx-auto"
        >
          {/* Heading */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="text-4xl font-bold text-center mb-20 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Technical Skills
          </motion.h2>

          {/* Categories Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {Array.isArray(skills) &&
              [
                "Frontend",
                "Backend",
                "Programming Languages",
                "Core Concepts",
                "Tools",
              ]
                .filter((category) =>
                  skills.some(
                    (skill) =>
                      skill.category?.toLowerCase() === category.toLowerCase(),
                  ),
                )
                .map((category) => (
                  <motion.div
                    key={category}
                    variants={{
                      hidden: { opacity: 0, y: 60 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
                    }}
                    whileHover={{ y: -8 }}
                    className="group relative bg-slate-950 border border-slate-800 rounded-3xl p-8 shadow-xl transition-all duration-500"
                  >
                    {/* Glow Border */}
                    <div className="absolute inset-0 rounded-3xl border border-transparent group-hover:border-blue-500/40 transition duration-500 pointer-events-none"></div>

                    <h3 className="text-xl font-semibold text-blue-400 mb-6">
                      {category}
                    </h3>

                    <div className="flex flex-wrap gap-3">
                      {skills
                        .filter(
                          (skill) =>
                            skill.category?.toLowerCase() ===
                            category.toLowerCase(),
                        )
                        .map((skill) => (
                          <motion.span
                            key={skill._id}
                            whileHover={{ scale: 1.1 }}
                            className="text-sm bg-slate-800 border border-slate-700 px-4 py-2 rounded-full text-gray-300 hover:text-blue-400 hover:border-blue-500 transition"
                          >
                            {skill.name}
                          </motion.span>
                        ))}
                    </div>
                  </motion.div>
                ))}
          </div>
        </motion.div>
      </section>

      <section className="relative py-36 px-6 overflow-hidden">
        {/* Background Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute right-[-200px] top-20 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] rounded-full -z-10"
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } },
          }}
          className="max-w-6xl mx-auto"
        >
          {/* Heading */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="text-4xl font-bold text-center mb-24 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Academic & Technical Journey
          </motion.h2>

          <div className="relative grid md:grid-cols-2 gap-16">
            {/* Vertical Accent Line (Desktop) */}
            <div className="hidden md:block absolute left-1/2 top-0 h-full w-[2px] bg-gradient-to-b from-blue-400 to-purple-500 opacity-30"></div>

            {/* Education Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -60 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
              }}
              whileHover={{ y: -10 }}
              className="relative bg-slate-950 border border-slate-800 rounded-3xl p-10 shadow-xl transition-all duration-500"
            >
              <div className="absolute -left-3 top-10 w-6 h-6 bg-blue-500 rounded-full hidden md:block"></div>

              <h3 className="text-2xl font-semibold text-blue-400 mb-4">
                Bachelor of Engineering (B.E.)
              </h3>

              <p className="text-gray-300 mb-2">
                Electronics and Communication Engineering
              </p>

              <p className="text-gray-400 mb-6">
                Hindusthan College of Engineering and Technology • 2022 – 2026
              </p>

              <p className="text-gray-300 leading-relaxed">
                Built strong analytical thinking, system-level understanding,
                and problem-solving foundations through engineering coursework.
              </p>
            </motion.div>

            {/* Software Journey Card */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 60 },
                show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
              }}
              whileHover={{ y: -10 }}
              className="relative bg-slate-950 border border-slate-800 rounded-3xl p-10 shadow-xl transition-all duration-500"
            >
              <div className="absolute -left-3 top-10 w-6 h-6 bg-purple-500 rounded-full hidden md:block"></div>

              <h3 className="text-2xl font-semibold text-purple-400 mb-6">
                Software Development Journey
              </h3>

              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400">✔</span>
                  Self-learned Full-Stack MERN Development
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-blue-400">✔</span>
                  Built and deployed real-world freelance application
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-blue-400">✔</span>
                  Practicing Data Structures & Algorithms
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-blue-400">✔</span>
                  Implemented secure JWT authentication systems
                </li>

                <li className="flex items-start gap-3">
                  <span className="text-blue-400">✔</span>
                  Designed dynamic CMS & admin dashboards
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative py-40 px-6 text-center overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 -z-30 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:50px_50px] opacity-10"></div>

        {/* Animated Glow Blobs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 12, repeat: Infinity }}
          className="absolute left-[-200px] top-10 w-[600px] h-[600px] bg-blue-500/20 blur-[160px] rounded-full -z-20"
        />

        <motion.div
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute right-[-200px] bottom-10 w-[600px] h-[600px] bg-purple-500/20 blur-[160px] rounded-full -z-20"
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.2 } },
          }}
          className="max-w-3xl mx-auto"
        >
          {/* Heading */}
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
          >
            Let’s Build Something Great Together
          </motion.h2>

          {/* Description */}
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="text-gray-300 text-lg leading-relaxed mb-12"
          >
            I’m currently seeking full-time opportunities as a Full-Stack
            Developer. If you're looking for someone passionate about building
            scalable, secure and production-ready applications — let’s connect.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              show: { opacity: 1, y: 0, transition: { duration: 0.8 } },
            }}
            className="flex justify-center gap-6 flex-wrap"
          >
            {/* Primary Button */}
            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/contact"
                className="relative px-10 py-4 bg-blue-500 hover:bg-blue-600 rounded-xl shadow-lg shadow-blue-500/40 transition font-medium"
              >
                Get In Touch
              </Link>
            </motion.div>

            {/* Resume Button */}
            {resumeUrl && (
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                  href={`${import.meta.env.VITE_API_URL}/api/resume/download`}
                  className="px-10 py-4 border border-slate-700 hover:border-blue-500 rounded-xl transition font-medium"
                >
                  Download Resume
                </a>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  );
}

export default Home;
