import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (data.success) {
        const sorted = data.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setMessages(sorted);
        setFiltered(sorted);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const result = messages.filter(
      (msg) =>
        msg.name.toLowerCase().includes(search.toLowerCase()) ||
        msg.email.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(result);
  }, [search, messages]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this message?")) return;

    try {
      const token = localStorage.getItem("adminToken");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();

      if (data.success) {
        setMessages((prev) => prev.filter((msg) => msg._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="relative max-w-7xl mx-auto py-24 px-6">

      {/* Glow Background */}
      <div className="absolute left-[-200px] top-20 w-[500px] h-[500px] bg-blue-500/10 blur-[150px] rounded-full -z-10"></div>

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-blue-400 mb-10"
      >
        Contact Messages
      </motion.h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-10 px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-400 transition"
      />

      {loading ? (
        <p className="text-gray-400">Loading messages...</p>
      ) : filtered.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-10 text-center text-gray-400">
          No messages found.
        </div>
      ) : (
        <div className="grid gap-6">
          {filtered.map((msg, index) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl cursor-pointer transition"
              onClick={() => setSelectedMessage(msg)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {msg.name}
                  </h2>
                  <p className="text-sm text-blue-400">{msg.email}</p>
                </div>

                <span className="text-xs text-gray-500">
                  {new Date(msg.createdAt).toLocaleString()}
                </span>
              </div>

              <p className="text-gray-400 mt-4">
                {msg.message.length > 120
                  ? msg.message.slice(0, 120) + "..."
                  : msg.message}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(msg._id);
                }}
                className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-sm rounded-lg transition"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal View */}
      <AnimatePresence>
        {selectedMessage && (
          <motion.div
            className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMessage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-blue-400 mb-2">
                {selectedMessage.name}
              </h2>
              <p className="text-sm text-gray-400 mb-4">
                {selectedMessage.email}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {selectedMessage.message}
              </p>

              <button
                onClick={() => setSelectedMessage(null)}
                className="mt-6 px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

export default Messages;