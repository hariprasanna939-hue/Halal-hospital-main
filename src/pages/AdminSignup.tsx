import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Shield, Lock, Eye, EyeOff, User, Building2 } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { adminRegister } from "@/lib/auth";
import { toast } from "sonner";

const AdminSignup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        hospitalName: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.fullName || !formData.email || !formData.password || !formData.hospitalName) {
            toast.error("All fields are required");
            return;
        }

        setLoading(true);
        try {
            await adminRegister(formData);
            toast.success("Account created successfully!");
            navigate("/admin/dashboard");
        } catch (err: any) {
            toast.error(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FBFBFD] flex items-center justify-center p-6 relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-400/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-400/5 rounded-full blur-[120px]" />

            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-[480px] w-full relative z-10"
            >
                <button
                    onClick={() => navigate("/admin-login")}
                    className="group mb-8 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
                >
                    <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                        <ArrowLeft className="w-3 h-3" />
                    </div>
                    <span className="text-sm font-medium">Back to Login</span>
                </button>

                <div className="bg-white/80 backdrop-blur-2xl border border-white p-10 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.04)]">
                    <div className="flex items-center gap-4 mb-10">
                        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
                            <Shield className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Create Admin</h2>
                            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Register your hospital</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <Input
                                    placeholder="John Doe"
                                    className="h-14 bg-slate-50 border-transparent rounded-2xl pl-12 focus-visible:ring-2 focus-visible:ring-blue-500/10 text-[15px] font-medium"
                                    value={formData.fullName}
                                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">Hospital Name</label>
                            <div className="relative group">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <Input
                                    placeholder="HalalMedi General Hospital"
                                    className="h-14 bg-slate-50 border-transparent rounded-2xl pl-12 focus-visible:ring-2 focus-visible:ring-blue-500/10 text-[15px] font-medium"
                                    value={formData.hospitalName}
                                    onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">Work Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <Input
                                    type="email"
                                    placeholder="admin@hospital.com"
                                    className="h-14 bg-slate-50 border-transparent rounded-2xl pl-12 focus-visible:ring-2 focus-visible:ring-blue-500/10 text-[15px] font-medium"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[12px] font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    className="h-14 bg-slate-50 border-transparent rounded-2xl pl-12 pr-12 focus-visible:ring-2 focus-visible:ring-blue-500/10 text-[15px] font-medium"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                            className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[16px] font-bold shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98] mt-4"
                        >
                            {loading ? "Creating Account..." : "Register Hospital Admin"}
                        </Button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-slate-50 text-center">
                        <p className="text-sm text-slate-500 font-medium">
                            Already have an admin account?{" "}
                            <Link to="/admin-login" className="text-blue-600 font-bold hover:underline">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminSignup;
