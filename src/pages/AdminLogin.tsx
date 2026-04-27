import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Shield, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminLoginPassword } from "@/lib/auth";
import { toast } from "sonner";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      await adminLoginPassword(email, password);
      toast.success("Access granted!");
      navigate("/admin/dashboard");
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials. Access denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-400/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-400/5 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-[440px] w-full relative z-10"
      >
        <button
          onClick={() => navigate("/login")}
          className="group mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-3 h-3" />
          </div>
          <span className="text-sm font-medium">Gateway</span>
        </button>

        <div className="bg-white/80 backdrop-blur-2xl border border-white p-10 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Hospital Portal</h2>
              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Administrator Login</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                <Input
                  type="email"
                  placeholder="admin@hospital.com"
                  className="h-14 bg-slate-50 border-transparent rounded-2xl pl-12 focus-visible:ring-2 focus-visible:ring-slate-900/5 text-[15px] font-medium"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-slate-900 transition-colors" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-14 bg-slate-50 border-transparent rounded-2xl pl-12 pr-12 focus-visible:ring-2 focus-visible:ring-slate-900/5 text-[15px] font-medium"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl text-[16px] font-bold shadow-xl shadow-slate-900/10 transition-all active:scale-[0.98]"
            >
              {loading ? "Verifying..." : "Login to Dashboard"}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-50 text-center">
            <p className="text-sm text-slate-500 font-medium">
              New hospital admin?{" "}
              <Link to="/admin-signup" className="text-blue-600 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
