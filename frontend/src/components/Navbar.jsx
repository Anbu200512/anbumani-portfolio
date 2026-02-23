import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = (path) =>
    `block py-2 transition ${
      location.pathname === path
        ? "text-blue-400"
        : "text-gray-300 hover:text-blue-400"
    }`;

  return (
    <nav
      className={`fixed w-full z-50 backdrop-blur-md bg-slate-950/70 border-b border-slate-800 transition-all duration-300 ${
        scrolled ? "shadow-lg shadow-blue-500/10" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Anbumani
        </h1>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link to="/" className={linkClasses("/")}>Home</Link>
          <Link to="/about" className={linkClasses("/about")}>About</Link>
          <Link to="/projects" className={linkClasses("/projects")}>Projects</Link>
          <Link to="/certifications" className={linkClasses("/certifications")}>Certifications</Link>
          <Link to="/experience" className={linkClasses("/experience")}>Experience</Link>
          <Link to="/freelance" className={linkClasses("/freelance")}>Freelance</Link>
          <Link to="/contact" className={linkClasses("/contact")}>Contact</Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-white text-xl cursor-pointer">
          {menuOpen ? (
            <FaTimes onClick={() => setMenuOpen(false)} />
          ) : (
            <FaBars onClick={() => setMenuOpen(true)} />
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 px-6 pb-4">
          <Link to="/" className={linkClasses("/")} onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" className={linkClasses("/about")} onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/projects" className={linkClasses("/projects")} onClick={() => setMenuOpen(false)}>Projects</Link>
          <Link to="/certifications" className={linkClasses("/certifications")} onClick={() => setMenuOpen(false)}>Certifications</Link>
          <Link to="/experience" className={linkClasses("/experience")} onClick={() => setMenuOpen(false)}>Experience</Link>
          <Link to="/freelance" className={linkClasses("/freelance")} onClick={() => setMenuOpen(false)}>Freelance</Link>
          <Link to="/contact" className={linkClasses("/contact")} onClick={() => setMenuOpen(false)}>Contact</Link>
        </div>
      )}
    </nav> 
  

  );
}

export default Navbar;