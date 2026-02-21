import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  return (
    <div className="h-screen flex bg-slate-950 text-white overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between transform transition-transform duration-300 z-50
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold text-blue-400">Admin Panel</h2>
            <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
              <FaTimes />
            </button>
          </div>

          <nav className="space-y-4 text-gray-300">
            <Link
              to="/admin/dashboard"
              onClick={() => setSidebarOpen(false)}
              className="block hover:text-blue-400 transition"
            >
              Dashboard
            </Link>

            <Link
              to="/admin/projects"
              onClick={() => setSidebarOpen(false)}
              className="block hover:text-blue-400 transition"
            >
              Projects
            </Link>
            <Link
              to="/admin/skills"
              className="block hover:text-blue-400 transition"
              onClick={() => setSidebarOpen(false)}
            >
              Skills
            </Link>

            <Link
              to="/admin/resume" 
              className="block hover:text-blue-400 transition"
              onClick={() => setSidebarOpen(false)}
            >
              Resume
            </Link> 

            <Link
              to="/admin/messages"
              onClick={() => setSidebarOpen(false)}
              className="block hover:text-blue-400 transition"
            >
              Messages
            </Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
        >
          Logout
        </button>
      </div>

      {/* Overlay (Mobile Only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar (Mobile) */}
        <div className="md:hidden flex items-center justify-between bg-slate-900 p-4 border-b border-slate-800">
          <button onClick={() => setSidebarOpen(true)}>
            <FaBars />
          </button>
          <h1 className="text-lg font-semibold text-blue-400">Admin</h1>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
