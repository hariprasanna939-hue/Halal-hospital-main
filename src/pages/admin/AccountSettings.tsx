import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    User, Mail, Phone, Lock, Save, Shield,
    ChevronRight, ArrowLeft, Key, UserCircle
} from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const AccountSettings = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        mobileNumber: "",
        role: ""
    });
    const [passwords, setPasswords] = useState({
        newPassword: "",
        confirmPassword: ""
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await api.get("/auth/me");
            setUser(data);
        } catch (error: any) {
            toast({
                title: "Authentication Error",
                description: "Could not sync account data. Please log in again.",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            setSaving(true);

            if (passwords.newPassword && passwords.newPassword !== passwords.confirmPassword) {
                toast({
                    title: "Validation Error",
                    description: "Passwords do not match.",
                    variant: "destructive",
                });
                return;
            }

            const updateData: any = {
                fullName: user.fullName,
                email: user.email,
                mobileNumber: user.mobileNumber
            };

            if (passwords.newPassword) {
                updateData.password = passwords.newPassword;
            }

            await api.put("/auth/profile", updateData);

            toast({
                title: "Settings Synchronized",
                description: "Your administrative profile has been updated.",
            });

            setPasswords({ newPassword: "", confirmPassword: "" });
        } catch (error: any) {
            toast({
                title: "Update Failed",
                description: error.message || "Could not save settings.",
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-[#0A0D14] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-10"
            >
                <div>
                    <h1 className="text-4xl font-black text-[#1D1D1F] tracking-tight">Account Settings</h1>
                    <p className="text-[#86868B] font-medium mt-2">Manage your administrative credentials and security baseline.</p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {/* Security Overview */}
                    <div className="space-y-6">
                        <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-sm">
                            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-4">
                                <Shield className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="font-bold text-[#1D1D1F]">Security Status</h3>
                            <p className="text-xs text-[#86868B] mt-2 leading-relaxed">Your account is protected by encrypted authentication and role-based access control.</p>
                            <div className="mt-4 flex items-center gap-2 text-green-600">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Secured</span>
                            </div>
                        </div>

                        <div className="bg-[#0A0D14] rounded-[32px] p-6 text-white overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110 duration-700" />
                            <Key className="w-6 h-6 text-blue-400 mb-4" />
                            <h4 className="font-bold text-sm">Auth Logs</h4>
                            <p className="text-[10px] opacity-60 mt-2">View recent login attempts and session activity.</p>
                            <Button variant="link" className="text-blue-400 p-0 h-auto mt-4 text-[11px] font-bold">
                                Download Logs <ChevronRight className="w-3 h-3 ml-1" />
                            </Button>
                        </div>
                    </div>

                    {/* Form Area */}
                    <div className="md:col-span-2">
                        <form onSubmit={handleUpdate} className="space-y-8">
                            <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[40px] p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.04)] space-y-8">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <UserCircle className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <h2 className="text-xl font-bold text-[#1D1D1F]">Identity</h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-widest text-[#86868B] ml-1">Full Name</Label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                                                <Input
                                                    value={user.fullName}
                                                    onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                                                    className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl pl-12 font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-widest text-[#86868B] ml-1">Work Email</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                                                <Input
                                                    value={user.email}
                                                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                                                    className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl pl-12 font-medium"
                                                />
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-widest text-[#86868B] ml-1">Phone Link</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#86868B]" />
                                                <Input
                                                    placeholder="+91-XXXXXXXXXX"
                                                    value={user.mobileNumber}
                                                    onChange={(e) => setUser({ ...user, mobileNumber: e.target.value })}
                                                    className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl pl-12 font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6 pt-6 border-t border-slate-100/50">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                                            <Lock className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <h2 className="text-xl font-bold text-[#1D1D1F]">Credential Update</h2>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-widest text-[#86868B] ml-1">New Password</Label>
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
                                                value={passwords.newPassword}
                                                onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                                                className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl px-6 font-medium"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-widest text-[#86868B] ml-1">Confirm Sync</Label>
                                            <Input
                                                type="password"
                                                placeholder="••••••••"
                                                value={passwords.confirmPassword}
                                                onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                                                className="h-14 bg-slate-50/50 border-slate-100 rounded-2xl px-6 font-medium"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 pt-4">
                                <Button variant="ghost" className="rounded-full h-12 text-[#86868B] font-bold">
                                    <ArrowLeft className="w-4 h-4 mr-2" /> Cancel Changes
                                </Button>
                                <Button
                                    disabled={saving}
                                    className="bg-[#0A0D14] hover:bg-black text-white rounded-full h-14 px-12 font-bold shadow-xl active:scale-95 transition-all flex items-center gap-2"
                                >
                                    {saving ? "Synchronizing..." : "Update Vault"} <Save className="w-5 h-5" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AccountSettings;
