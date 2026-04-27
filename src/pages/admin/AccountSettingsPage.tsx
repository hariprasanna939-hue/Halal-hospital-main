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

const AccountSettingsPage = () => {
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
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#0A0D14] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl py-4 space-y-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-[#1D1D1F] tracking-tight">Account Settings</h1>
          <p className="text-[#86868B] font-medium mt-1">Manage your administrative credentials and security baseline.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-6">
          {/* Security Overview */}
          <div className="space-y-6">
            <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[32px] p-6 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-[#1D1D1F] text-sm">Security Status</h3>
              <p className="text-[11px] text-[#86868B] mt-2 leading-relaxed">Your account is protected by encrypted authentication.</p>
              <div className="mt-4 flex items-center gap-2 text-green-600">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest">Active Sync</span>
              </div>
            </div>

            <div className="bg-[#0A0D14] rounded-[32px] p-6 text-white overflow-hidden relative group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-700" />
              <Key className="w-5 h-5 text-blue-400 mb-3" />
              <h4 className="font-bold text-xs uppercase tracking-wider">Access Info</h4>
              <p className="text-[10px] opacity-60 mt-1">Role: <span className="text-blue-400 font-bold">{user.role}</span></p>
            </div>
          </div>

          {/* Form Area */}
          <div className="md:col-span-2">
            <form onSubmit={handleUpdate} className="space-y-6">
              <div className="bg-white px-6 py-8 md:px-10 rounded-[32px] border border-slate-100 shadow-sm space-y-6">
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-[#1D1D1F] flex items-center gap-2">
                    <UserCircle className="w-5 h-5 text-slate-400" /> Identity
                  </h2>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Admin Name</Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          value={user.fullName}
                          onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                          className="h-12 bg-slate-50/50 border-slate-100 rounded-xl pl-11 font-medium text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Work Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          value={user.email}
                          className="h-12 bg-slate-100/30 border-slate-100 rounded-xl pl-11 font-medium text-sm opacity-60"
                          disabled
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Mobile Access</Label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                          placeholder="+91-XXXXXXXXXX"
                          value={user.mobileNumber}
                          onChange={(e) => setUser({ ...user, mobileNumber: e.target.value })}
                          className="h-12 bg-slate-50/50 border-slate-100 rounded-xl pl-11 font-medium text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-6 border-t border-slate-50">
                  <h2 className="text-lg font-bold text-[#1D1D1F] flex items-center gap-2">
                    <Lock className="w-5 h-5 text-slate-400" /> Security
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">New Password</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={passwords.newPassword}
                        onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                        className="h-12 bg-slate-50/50 border-slate-100 rounded-xl px-4 font-medium text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 ml-1">Confirm Sync</Label>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={passwords.confirmPassword}
                        onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                        className="h-12 bg-slate-50/50 border-slate-100 rounded-xl px-4 font-medium text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <Button
                    disabled={saving}
                    className="bg-[#0A0D14] hover:bg-black text-white rounded-full h-12 px-10 font-bold shadow-lg active:scale-95 transition-all gap-2"
                  >
                    {saving ? "Saving..." : "Update Vault"} <Save className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AccountSettingsPage;
