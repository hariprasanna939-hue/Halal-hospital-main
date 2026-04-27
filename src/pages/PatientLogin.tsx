import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { patientLogin } from "@/lib/auth";
import { toast } from "sonner";

const PatientLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await patientLogin({ email, password });
      toast.success("Login successful!");
      navigate("/home");
    } catch (err: any) {
      toast.error(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Premium background effects */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-teal-500/5 rounded-full blur-[150px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[440px] w-full"
      >
        <button
          onClick={() => navigate("/login")}
          className="group mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Back to Gateway</span>
        </button>

        <div className="bg-white/70 backdrop-blur-xl border border-white p-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">Patient Login</h2>
            <p className="text-slate-500 mt-2 text-sm font-medium">Welcome back to HalalMedi</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[13px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  type="email"
                  placeholder="name@example.com"
                  className="h-14 bg-slate-100/50 border-0 rounded-2xl pl-12 focus-visible:ring-2 focus-visible:ring-blue-500/20 text-[15px] font-medium transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[13px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                <button type="button" className="text-[12px] font-bold text-blue-500 hover:text-blue-600">Forgot Password?</button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-14 bg-slate-100/50 border-0 rounded-2xl pl-12 pr-12 focus-visible:ring-2 focus-visible:ring-blue-500/20 text-[15px] font-medium transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[16px] font-bold shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Logging in...</span>
                </div>
              ) : "Login"}
            </Button>
          </form>

          <div className="mt-8 text-center pt-8 border-t border-slate-100">
            <p className="text-slate-500 text-[14px] font-medium">
              New to HalalMedi?{" "}
              <Link to="/patient-signup" className="text-blue-600 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PatientLogin;
