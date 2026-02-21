import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Freelance from "./pages/Freelance";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import ProtectedRoute from "./admin/ProtectedRoute";
import AdminLayout from "./admin/AdminLayout";
import Messages from "./admin/Messages";
import ProjectsAdmin from "./admin/ProjectsAdmin";
import SkillsAdmin from "./admin/SkillsAdmin";
import ScrollProgress from "./components/ScrollProgress";
import ResumeAdmin from "./admin/ResumeAdmin";
import ProjectDetails from "./pages/ProjectDetails";


function AnimatedRoutes() {
  const location = useLocation();

  return (
    <>
      <ScrollProgress />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Admin Login */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Protected */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="messages" element={<Messages />} />
            <Route path="skills" element={<SkillsAdmin />} />
            <Route path="resume" element={<ResumeAdmin />} />
          </Route>

          {/* Public Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="freelance" element={<Freelance />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;