import {
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
  FaPhone,
} from "react-icons/fa";

function Footer({ resumeUrl }) {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* About */}
        <div>
          <h3 className="text-xl font-semibold text-blue-400 mb-4">
            Anbumani
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Full Stack MERN Developer & ECE Engineer passionate about building
            scalable web applications and delivering real-world freelance
            solutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Quick Links
          </h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="/" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="/about" className="hover:text-blue-400 transition">About</a></li>
            <li><a href="/projects" className="hover:text-blue-400 transition">Projects</a></li>
            <li><a href="/freelance" className="hover:text-blue-400 transition">Freelance</a></li>
            <li><a href="/contact" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </div>

        {/* Social + Resume */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">
            Connect With Me
          </h4>

          <div className="flex gap-4 text-xl text-gray-400 mb-6">
            <a href="#" className="hover:text-blue-400 transition"><FaLinkedin /></a>
            <a href="#" className="hover:text-blue-400 transition"><FaGithub /></a>
            <a href="#" className="hover:text-pink-400 transition"><FaInstagram /></a>
            <a href="mailto:yourmail@gmail.com" className="hover:text-red-400 transition"><FaEnvelope /></a>
            <a href="https://wa.me/91XXXXXXXXXX" className="hover:text-green-400 transition"><FaWhatsapp /></a>
            <a href="tel:+91XXXXXXXXXX" className="hover:text-yellow-400 transition"><FaPhone /></a>
          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-800 text-center py-4 text-gray-500 text-sm">
        © {new Date().getFullYear()} Anbumani. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;