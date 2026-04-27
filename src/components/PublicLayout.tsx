import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, User, Menu, X } from "lucide-react";
import { logout } from "@/lib/auth";

const navLinks = [
  { label: "Home", path: "/home" },
  { label: "Hospitals", path: "/hospitals" },
  { label: "Patient Stories", path: "/patient-stories" },
  { label: "Blogs", path: "/blogs" },
  { label: "About Us", path: "/about" },
];

const PublicLayout = () => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-white/70 border-b border-black/5 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/home" className="text-[18px] font-semibold tracking-tight text-[#1D1D1F]">
            HalalMedi
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 relative">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative text-[14px] font-medium text-[#1D1D1F]/70 hover:text-[#1D1D1F] transition-colors"
                >
                  {link.label}
                  {active && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 -bottom-1 h-[2px] w-full bg-[#007AFF] rounded-full"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-black/5 transition">
              <Bell className="w-5 h-5 text-[#1D1D1F]/70" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <Link
              to="/profile"
              className="flex items-center gap-3 pl-4 border-l border-black/10 cursor-pointer group"
            >
              <div className="text-right">
                <p className="text-[13px] font-semibold text-[#1D1D1F] group-hover:text-[#007AFF] transition-colors">
                  Profile
                </p>
                <p className="text-[11px] text-[#1D1D1F]/50">
                  Patient
                </p>
              </div>

              <div className="w-9 h-9 rounded-full bg-[#007AFF]/10 flex items-center justify-center border border-[#007AFF]/20 group-hover:bg-[#007AFF]/20 transition-colors">
                <User className="w-4 h-4 text-[#007AFF]" />
              </div>
            </Link>

            <button
              onClick={() => logout()}
              className="px-4 py-2 text-[12px] font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-red-100"
            >
              Logout
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-white/80 backdrop-blur-xl border-t overflow-hidden"
            >
              <div className="px-6 py-4 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setOpen(false)}
                    className="block text-[15px] text-[#1D1D1F]/80"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="w-10 h-10 bg-[#007AFF]/10 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#007AFF]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Guest Patient</p>
                    <p className="text-xs text-gray-500">Patient Portal</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-black/5 bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold text-[#1D1D1F] text-lg mb-3">HalalMedi</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your trusted gateway to world-class healthcare in India.
              </p>
            </div>
            <div>
              <h5 className="font-semibold text-[#1D1D1F] text-sm mb-3">Quick Links</h5>
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.path}
                    className="block text-sm text-muted-foreground hover:text-[#007AFF] transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-[#1D1D1F] text-sm mb-3">Support</h5>
              <div className="space-y-2">
                {["Help Center", "Privacy Policy", "Terms of Service", "Cookie Policy"].map((s) => (
                  <p key={s} className="text-sm text-muted-foreground hover:text-[#007AFF] cursor-pointer transition-colors">{s}</p>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-[#1D1D1F] text-sm mb-3">Contact</h5>
              <p className="text-sm text-muted-foreground">info@halalmedi.com</p>
              <p className="text-sm text-muted-foreground">+91-800-123-4567</p>
            </div>
          </div>
          <div className="border-t border-black/5 mt-8 pt-6 text-center">
            <p className="text-xs text-muted-foreground">© 2026 HalalMedi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;