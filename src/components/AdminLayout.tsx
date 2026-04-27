import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, UserCheck, Building2, Layers, Megaphone,
  RefreshCw, Settings, LogOut, Menu, X, Users
} from "lucide-react";

const sidebarLinks = [
  { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Patients", path: "/admin/patients", icon: Users },
  { label: "Doctor Availability", path: "/admin/doctors", icon: UserCheck },
  { label: "Hospital Profile", path: "/admin/profile", icon: Building2 },
  { label: "Departments", path: "/admin/departments", icon: Layers },
  { label: "Announcements", path: "/admin/announcements", icon: Megaphone },
  { label: "Account Settings", path: "/admin/settings", icon: Settings },
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? "w-60" : "w-0 md:w-16"} transition-all duration-300 bg-card border-r border-border/50 flex flex-col shrink-0 overflow-hidden`}>
        <div className="h-16 flex items-center justify-center border-b border-border/50 px-4">
          {sidebarOpen && <span className="font-bold text-foreground text-sm">Halalmedi Admin</span>}
        </div>
        <nav className="flex-1 py-3 px-2 space-y-0.5">
          {sidebarLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
              >
                <link.icon className="w-4 h-4 shrink-0" />
                {sidebarOpen && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-border/50">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-border/50 bg-card/80 backdrop-blur-xl flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-muted-foreground hover:text-foreground transition-colors">
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <span className="text-sm font-semibold text-foreground">Apollo Hospital</span>
          </div>
          <span className="text-xs text-muted-foreground">Admin Portal</span>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
