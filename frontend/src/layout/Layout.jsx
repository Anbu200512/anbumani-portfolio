import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <Navbar />

      {/* Page Content */}
      <div className="pt-20 px-6">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Layout;
