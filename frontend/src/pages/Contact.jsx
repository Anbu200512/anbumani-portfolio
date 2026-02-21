import { motion } from "framer-motion";
import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  };

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
        Let’s Connect
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-16 items-start">

        {/* Left Side Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-semibold text-blue-400 mb-6">
            Get in Touch
          </h3>

          <p className="text-gray-400 mb-8 leading-relaxed">
            I’m open to full-time opportunities, freelance collaborations,
            and meaningful tech discussions. Feel free to reach out.
          </p>

          <div className="space-y-4 text-gray-300">
            <p>📧 anbuv0012@gmail.com</p>
            <p>📱 +91 6374114513</p>
            <p>📍 Villupuram, Tamilnadu, India</p>
          </div>
        </motion.div>

        {/* Right Side Form */}
        <motion.form
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl space-y-6"
        >

          {/* Name */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-400 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Your Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-400 transition"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-sm mb-2 text-gray-400">
              Message
            </label>
            <textarea
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-blue-400 transition"
            ></textarea>
          </div>

          {/* Button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-xl transition shadow-lg shadow-blue-500/30 font-medium"
          >
            {loading ? "Sending..." : "Send Message"}
          </motion.button>

          {success && (
            <p className="text-green-400 text-sm text-center">
              Message sent successfully 🚀
            </p>
          )}

        </motion.form>

      </div>
    </section>
  );
}

export default Contact;