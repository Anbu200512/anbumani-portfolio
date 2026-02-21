import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Dashboard() {
  const [messageCount, setMessageCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [freelanceCount, setFreelanceCount] = useState(0);
  const [recentMessages, setRecentMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        const [messageRes, projectRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${import.meta.env.VITE_API_URL}/api/projects`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        const messageData = await messageRes.json();
        const projectData = await projectRes.json();

        if (messageData.success) {
          setMessageCount(messageData.data.length);

          // Get latest 5 messages
          const sorted = [...messageData.data]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5);

          setRecentMessages(sorted);
        }

        if (projectData.success) {
          setProjectCount(projectData.data.length);

          const freelance = projectData.data.filter(
            (p) => p.category === "freelance"
          );

          setFreelanceCount(freelance.length);
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    fetchDashboard();
  }, []);

  const Card = ({ title, value, color }) => (
    <motion.div
      whileHover={{ y: -6 }}
      className="relative bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl transition-all duration-300"
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${color}`}></div>
      <h2 className="text-sm text-gray-400 mb-4 uppercase tracking-wide">
        {title}
      </h2>
      <p className="text-4xl font-bold text-white">
        {loading ? "..." : value}
      </p>
    </motion.div>
  );

  return (
    <section className="relative max-w-6xl mx-auto py-24 px-6 overflow-hidden">

      {/* Glow Background */}
      <div className="absolute left-[-200px] top-20 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full -z-10"></div>

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-blue-400 mb-16"
      >
        Admin Dashboard
      </motion.h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        <Card title="Total Messages" value={messageCount} color="bg-blue-500" />
        <Card title="Total Projects" value={projectCount} color="bg-purple-500" />
        <Card title="Freelance Works" value={freelanceCount} color="bg-green-500" />
      </div>

      {/* Recent Messages Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-white">
            Recent Messages
          </h2>

          <Link
            to="/admin/messages"
            className="text-blue-400 text-sm hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl divide-y divide-slate-800">
          {loading ? (
            <p className="p-6 text-gray-400">Loading...</p>
          ) : recentMessages.length === 0 ? (
            <p className="p-6 text-gray-400">No messages yet.</p>
          ) : (
            recentMessages.map((msg) => (
              <motion.div
                key={msg._id}
                whileHover={{ backgroundColor: "rgba(30,41,59,0.5)" }}
                className="p-6 transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-blue-400 font-semibold">
                    {msg.name}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className="text-sm text-gray-400 mb-2">
                  {msg.email}
                </p>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {msg.message.length > 120
                    ? msg.message.slice(0, 120) + "..."
                    : msg.message}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

    </section>
  );
}

export default Dashboard;