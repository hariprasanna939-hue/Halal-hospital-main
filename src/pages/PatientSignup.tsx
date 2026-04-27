import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, Lock, User, Phone, Calendar, ChevronRight, ShieldCheck } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { patientRegister } from "@/lib/auth";
import { toast } from "sonner";

const PatientSignup = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        password: "",
        confirmPassword: "",
        dob: "",
        gender: "",
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        if (Object.values(form).some(val => !val)) {
            toast.error("Please fill in all fields");
            return;
        }
        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            await patientRegister(form);
            toast.success("Account created successfully!");
            navigate("/home");
        } catch (err: any) {
            toast.error(err.message || "Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 relative overflow-hidden">
            {/* Cinematic Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-15%] right-[-10%] w-[50%] h-[50%] bg-blue-400/10 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-teal-400/10 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
                <div className="absolute top-[30%] left-[20%] w-[30%] h-[30%] bg-purple-400/5 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[1000px] w-full grid md:grid-cols-2 bg-white/70 backdrop-blur-3xl rounded-[48px] border border-white shadow-[0_40px_100px_rgba(0,0,0,0.06)] overflow-hidden relative z-10"
            >
                {/* Left Side: Brand & Value */}
                <div className="hidden md:flex flex-col justify-between p-16 bg-[#0A0D14] text-white relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />
                        <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-500/10 rounded-full blur-[60px]" />
                    </div>

                    <div className="relative z-10">
                        <Link to="/login" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 w-fit">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-semibold">Back to Gateway</span>
                        </Link>

                        <h2 className="text-5xl font-bold tracking-tighter leading-[0.95] mb-6">
                            The future of <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">healthcare</span> <br />
                            starts here.
                        </h2>
                        <p className="text-slate-400 text-lg font-light leading-relaxed max-w-xs">
                            Join 10,000+ patients who trust HalalMedi for world-class medical transitions.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 shadow-lg">
                                <ShieldCheck className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">HIPAA Compliant</h4>
                                <p className="text-xs text-slate-500 mt-1">Your medical data is encrypted with military-grade security.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Signup Form */}
                <div className="p-10 md:p-16">
                    <div className="mb-10 text-center md:text-left">
                        <h3 className="text-3xl font-black tracking-tight text-[#1D1D1F]">Create Account</h3>
                        <p className="text-slate-500 mt-2 font-medium">Join our global healthcare ecosystem</p>
                    </div>

                    <form onSubmit={handleRegister} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2 space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Full Name</Label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        placeholder="John Carter"
                                        className="h-14 bg-gray-100/50 border-0 rounded-2xl pl-12 focus-visible:ring-2 focus-visible:ring-blue-500/20 text-[15px] font-medium"
                                        value={form.fullName}
                                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Email address</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="h-14 bg-gray-100/50 border-0 rounded-2xl pl-12 focus-visible:ring-2 focus-visible:ring-blue-500/20 text-[15px] font-medium"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Mobile Number</Label>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        placeholder="+91-XXXXXXXXXX"
                                        className="h-14 bg-gray-100/50 border-0 rounded-2xl pl-12 focus-visible:ring-2 focus-visible:ring-blue-500/20 text-[15px] font-medium"
                                        value={form.mobileNumber}
                                        onChange={(e) => setForm({ ...form, mobileNumber: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Date of Birth</Label>
                                <div className="relative group">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors pointer-events-none" />
                                    <Input
                                        type="date"
                                        className="h-14 bg-gray-100/50 border-0 rounded-2xl pl-12 focus-visible:ring-2 focus-visible:ring-blue-500/20 text-[15px] font-medium"
                                        value={form.dob}
                                        onChange={(e) => setForm({ ...form, dob: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Gender</Label>
                                <select
                                    value={form.gender}
                                    onChange={(e) => setForm({ ...form, gender: e.target.value })}
                                    className="w-full px-5 h-14 bg-gray-100/50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 transition-all outline-none text-[15px] font-medium appearance-none"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="h-14 bg-gray-100/50 border-0 rounded-2xl pl-12 focus-visible:ring-2 focus-visible:ring-blue-500/20 text-[15px] font-medium"
                                        value={form.password}
                                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[11px] font-bold uppercase tracking-widest text-slate-400 ml-1">Confirm</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="h-14 bg-gray-100/50 border-0 rounded-2xl pl-12 focus-visible:ring-2 focus-visible:ring-blue-500/20 text-[15px] font-medium"
                                        value={form.confirmPassword}
                                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-16 bg-[#0A0D14] hover:bg-black text-white rounded-2xl text-lg font-bold shadow-[0_12px_40px_rgba(0,0,0,0.1)] active:scale-[0.98] transition-all relative overflow-hidden group"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {loading ? "Initializing..." : "Register Now"}
                                {!loading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                            </span>
                        </Button>
                    </form>

                    <div className="mt-8 text-center pt-8 border-t border-slate-100">
                        <p className="text-slate-500 text-sm font-medium">
                            Already part of our network?{" "}
                            <Link to="/patient-login" className="text-blue-600 font-bold hover:underline">
                                Login Here
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PatientSignup;
