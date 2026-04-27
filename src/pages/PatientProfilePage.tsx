import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    User, Phone, Mail, Calendar, Save, Camera, Shield, CheckCircle,
    MapPin, Activity, PhoneCall, FileText, ChevronRight, ChevronLeft,
    Stethoscope, Pill, AlertCircle, Heart, Globe, CreditCard
} from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const PatientProfilePage = () => {
    const { toast } = useToast();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [activeSection, setActiveSection] = useState("personal");
    const [profile, setProfile] = useState<any>({
        fullName: "",
        email: "",
        mobileNumber: "",
        dob: "",
        gender: "",
        passportNumber: "",
        bloodGroup: "",
        maritalStatus: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        medicalInfo: {
            allergies: "",
            currentMedications: "",
            pastConditions: "",
            chronicDiseases: "",
            surgeries: "",
        },
        emergencyContact: {
            name: "",
            relationship: "",
            phone: "",
        },
        profileComplete: 0
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            const data = await api.get("/patient/profile");
            setProfile({
                ...data,
                dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : "",
            });
        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message || "Failed to load profile",
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        try {
            setSaving(true);
            const data = await api.put("/patient/profile", profile);
            setProfile({
                ...data,
                dob: data.dob ? new Date(data.dob).toISOString().split('T')[0] : "",
            });
            toast({
                title: "Profile Updated",
                description: "Your health passport has been successfully synchronized.",
            });
        } catch (error: any) {
            toast({
                title: "Update Failed",
                description: error.message || "Failed to save profile details.",
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
                <div className="space-y-4 text-center">
                    <div className="w-12 h-12 border-4 border-[#0A0D14] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-[#1D1D1F] font-medium tracking-tight">Syncing Health Data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F5F5F7] py-20 px-6">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">

                {/* Fixed Navigation Sidebar */}
                <div className="lg:col-span-3 space-y-6 lg:sticky lg:top-24 h-fit">
                    <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[40px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] ring-1 ring-black/5">
                        <div className="flex flex-col items-center mb-10">
                            <div className="relative group mb-6">
                                <div className="w-24 h-24 rounded-[32px] bg-gradient-to-br from-[#0A0D14] to-[#2D3139] flex items-center justify-center text-white text-3xl font-bold shadow-2xl border-4 border-white transition-transform group-hover:scale-105 duration-500">
                                    {profile.fullName?.charAt(0).toUpperCase()}
                                </div>
                                <button className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl border border-black/5 shadow-xl hover:scale-110 active:scale-95 transition-all text-[#1D1D1F]">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold text-[#1D1D1F] tracking-tight text-center">{profile.fullName}</h2>
                            <p className="text-[#86868B] text-sm mt-1 font-medium">{profile.email}</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-2 px-1">
                                <span className="text-[12px] font-bold text-[#86868B] uppercase tracking-widest">Profile Score</span>
                                <span className="text-sm font-black text-[#1D1D1F]">{profile.profileComplete}%</span>
                            </div>
                            <Progress value={profile.profileComplete} className="h-2 bg-slate-100 rounded-full" />
                        </div>

                        <nav className="mt-10 space-y-2">
                            {[
                                { id: "personal", label: "My Profile", icon: User },
                                { id: "contact", label: "Global Address", icon: MapPin },
                                { id: "medical", label: "Clinical Context", icon: Activity },
                                { id: "emergency", label: "Crisis Contact", icon: PhoneCall },
                            ].map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setActiveSection(s.id)}
                                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 ${activeSection === s.id ? 'bg-[#0A0D14] text-white shadow-xl translate-x-1' : 'text-[#86868B] hover:bg-slate-100/80 hover:text-[#1D1D1F]'}`}
                                >
                                    <s.icon className={`w-5 h-5 ${activeSection === s.id ? 'text-white' : 'text-[#86868B]'}`} />
                                    <span className="text-sm font-bold">{s.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>

                    <div className="bg-[#0A0D14] rounded-[40px] p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:bg-white/10 transition-colors duration-700" />
                        <Shield className="w-10 h-10 text-white mb-4 relative z-10" />
                        <h4 className="font-bold mb-2 relative z-10">Data Privacy</h4>
                        <p className="text-[12px] text-[#86868B] mb-6 relative z-10 leading-relaxed font-medium">Your health passport is secured with military-grade AES-256 encryption & HIPAA compliance.</p>
                        <Button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/10 rounded-2xl h-12 text-xs font-bold transition-all relative z-10">
                            Review Protocols
                        </Button>
                    </div>
                </div>

                {/* Main Dynamic Content Container */}
                <div className="lg:col-span-9 space-y-8">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, scale: 0.98, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="bg-white/70 backdrop-blur-xl border border-white rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] overflow-hidden"
                    >
                        <div className="p-10 md:p-14 border-b border-slate-100/50 flex items-center justify-between">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-[#1D1D1F]">
                                    {activeSection === "personal" && "Personal Baseline"}
                                    {activeSection === "contact" && "Geographic Identity"}
                                    {activeSection === "medical" && "Clinical History"}
                                    {activeSection === "emergency" && "Surrogate Info"}
                                </h1>
                                <p className="text-[#86868B] text-lg mt-2 font-medium">Manage your verified healthcare data</p>
                            </div>
                            <Button
                                onClick={handleUpdate}
                                disabled={saving}
                                className="hidden md:flex bg-[#0A0D14] hover:bg-black text-white rounded-full h-14 px-8 font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all gap-2"
                            >
                                <Save className="w-5 h-5" /> {saving ? "Saving..." : "Update Vault"}
                            </Button>
                        </div>

                        <div className="p-10 md:p-14">
                            <AnimatePresence mode="wait">
                                {activeSection === "personal" && (
                                    <motion.div key="personal" className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868B] ml-1">Full Identity</Label>
                                            <div className="relative">
                                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                                                <Input
                                                    value={profile.fullName}
                                                    onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                                                    className="h-16 bg-slate-50/50 border-slate-100 rounded-2xl pl-12 text-[#1D1D1F] font-semibold focus-visible:ring-black/5"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868B] ml-1">Primary Email</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                                                <Input
                                                    disabled
                                                    value={profile.email}
                                                    className="h-16 bg-slate-100/30 border-slate-100 rounded-2xl pl-12 text-[#86868B] font-semibold opacity-60 cursor-not-allowed"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868B] ml-1">Mobile Access</Label>
                                            <div className="relative">
                                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                                                <Input
                                                    value={profile.mobileNumber}
                                                    onChange={(e) => setProfile({ ...profile, mobileNumber: e.target.value })}
                                                    className="h-16 bg-slate-50/50 border-slate-100 rounded-2xl pl-12 text-[#1D1D1F] font-semibold"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868B] ml-1">Date of Birth</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                                                <Input
                                                    type="date"
                                                    value={profile.dob}
                                                    onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
                                                    className="h-16 bg-slate-50/50 border-slate-100 rounded-2xl pl-12 text-[#1D1D1F] font-semibold appearance-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868B] ml-1">Passport Identifier</Label>
                                            <div className="relative">
                                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                                                <Input
                                                    placeholder="Passport Number (A1234567)"
                                                    value={profile.passportNumber}
                                                    onChange={(e) => setProfile({ ...profile, passportNumber: e.target.value })}
                                                    className="h-16 bg-slate-50/50 border-slate-100 rounded-2xl pl-12 text-[#1D1D1F] font-semibold"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868B] ml-1">Gender Expression</Label>
                                            <select
                                                value={profile.gender}
                                                onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                                                className="w-full h-16 bg-slate-50/50 border border-slate-100 rounded-2xl px-6 text-[#1D1D1F] font-semibold outline-none appearance-none"
                                            >
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </motion.div>
                                )}

                                {activeSection === "contact" && (
                                    <motion.div key="contact" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="md:col-span-2 space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868B] ml-1">Full Address</Label>
                                            <Input
                                                value={profile.address}
                                                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                                                className="h-16 bg-slate-50/50 border-slate-100 rounded-2xl px-6 text-[#1D1D1F] font-semibold"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868B] ml-1">City / Region</Label>
                                            <Input
                                                value={profile.city}
                                                onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                                                className="h-16 bg-slate-50/50 border-slate-100 rounded-2xl px-6 text-[#1D1D1F] font-semibold"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868B] ml-1">Country</Label>
                                            <div className="relative">
                                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#86868B]" />
                                                <Input
                                                    value={profile.country}
                                                    onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                                                    className="h-16 bg-slate-50/50 border-slate-100 rounded-2xl pl-12 text-[#1D1D1F] font-semibold"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeSection === "medical" && (
                                    <motion.div key="medical" className="space-y-10">
                                        <div className="grid md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868B] ml-1 flex items-center gap-2"><Stethoscope className="w-4 h-4" /> Major Allergies</Label>
                                                <Input
                                                    value={profile.medicalInfo?.allergies}
                                                    onChange={(e) => setProfile({ ...profile, medicalInfo: { ...profile.medicalInfo, allergies: e.target.value } })}
                                                    className="h-16 bg-slate-50/50 border-slate-100 rounded-2xl px-6 text-[#1D1D1F] font-semibold"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868B] ml-1 flex items-center gap-2"><Pill className="w-4 h-4" /> Current Pharmacy</Label>
                                                <Input
                                                    value={profile.medicalInfo?.currentMedications}
                                                    onChange={(e) => setProfile({ ...profile, medicalInfo: { ...profile.medicalInfo, currentMedications: e.target.value } })}
                                                    className="h-16 bg-slate-50/50 border-slate-100 rounded-2xl px-6 text-[#1D1D1F] font-semibold"
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {activeSection === "emergency" && (
                                    <motion.div key="emergency" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868B] ml-1">Contact Name</Label>
                                            <Input
                                                value={profile.emergencyContact?.name}
                                                onChange={(e) => setProfile({ ...profile, emergencyContact: { ...profile.emergencyContact, name: e.target.value } })}
                                                className="h-16 bg-slate-50/50 border-slate-100 rounded-2xl px-6 text-[#1D1D1F] font-semibold"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#86868B] ml-1">Phone Link</Label>
                                            <Input
                                                value={profile.emergencyContact?.phone}
                                                onChange={(e) => setProfile({ ...profile, emergencyContact: { ...profile.emergencyContact, phone: e.target.value } })}
                                                className="h-16 bg-slate-50/50 border-slate-100 rounded-2xl px-6 text-[#1D1D1F] font-semibold"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="p-10 md:p-14 bg-slate-50/30 border-t border-slate-100/50 flex flex-col md:flex-row items-center justify-between gap-6">
                            <p className="text-[11px] text-[#86868B] font-bold uppercase tracking-widest max-w-sm text-center md:text-left leading-relaxed">
                                Verified medical profile data is essential for accurate cross-border surgical consultations.
                            </p>
                            <Button
                                onClick={handleUpdate}
                                disabled={saving}
                                className="w-full md:w-auto bg-[#0A0D14] hover:bg-black text-white rounded-full h-16 px-12 font-bold shadow-2xl hover:scale-105 active:scale-95 transition-all text-lg"
                            >
                                {saving ? "Synchronizing Vault..." : "Save My Health Passport"}
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PatientProfilePage;
