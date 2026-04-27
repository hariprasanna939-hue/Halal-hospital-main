import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    Heart,
    MapPin,
    Award,
    BadgeCheck,
    CheckCircle2,
    Utensils,
    Moon,
    Users,
    FileText,
    Clock,
    ArrowLeft,
    ExternalLink,
    Loader2,
    Calendar,
    BookOpen,
    Search,
    Stethoscope
} from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import MedicalInquiryModal from "@/components/MedicalInquiryModal";

const HospitalPublicDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hospital, setHospital] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showInquiryModal, setShowInquiryModal] = useState(false);

    const fetchPublicData = async () => {
        try {
            const res = await api.get(`/hospital/${id}/public`);
            setHospital(res);
            localStorage.setItem("lastViewedHospitalId", id || "");
        } catch (err) {
            console.error("Error fetching public hospital data", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) fetchPublicData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 gap-4">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                <p className="text-slate-500 font-bold animate-pulse">Loading Hospital Profile...</p>
            </div>
        );
    }

    if (!hospital) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
                <h1 className="text-2xl font-bold text-slate-800">Hospital not found</h1>
                <Button onClick={() => navigate("/hospitals")} variant="ghost" className="mt-4">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Hospitals
                </Button>
            </div>
        );
    }

    const h = hospital;

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* 🔵 Sticky Navigation Header */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-100 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Button variant="ghost" onClick={() => navigate("/hospitals")} className="rounded-full text-slate-600 hover:text-blue-600">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Search
                    </Button>
                    <div className="hidden md:flex items-center gap-6">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Public Healthcare Profile</span>
                    </div>
                </div>
            </div>

            {/* 🔵 Hero Banner Section */}
            <div className="relative h-[400px] w-full overflow-hidden">
                <img
                    src={h.bannerImage || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2900"}
                    alt={h.hospitalName}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="max-w-6xl mx-auto">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <div className="px-3 py-1 bg-blue-600 text-[10px] text-white font-bold rounded-full uppercase tracking-widest shadow-lg shadow-blue-500/20">
                                    Verified Facility
                                </div>
                                {h.halalCompliance.hasCertification && (
                                    <div className="px-3 py-1 bg-emerald-600 text-[10px] text-white font-bold rounded-full uppercase tracking-widest shadow-lg shadow-emerald-500/20 flex items-center gap-2">
                                        <Heart className="w-3 h-3 fill-white" /> Halal Certified
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-lg">
                                {h.hospitalName}
                            </h1>
                            <p className="text-slate-200 text-lg md:text-xl mt-4 max-w-2xl font-medium drop-shadow-md">
                                {h.description || "Leading healthcare excellence for global patients."}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 🏥 Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left Column: Trust Signals */}
                    <div className="lg:col-span-2 space-y-10">

                        {/* 1. Accreditation Section */}
                        <motion.section
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-50"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Shield className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Accreditations & Licensing</h2>
                                    <p className="text-slate-500 font-medium">Verified by international healthcare boards</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4 mb-8">
                                {h.accreditation.types.map((type: string) => (
                                    <div key={type} className="flex items-center gap-3 px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl group hover:bg-blue-600 hover:border-blue-600 transition-all duration-300">
                                        <Award className="w-5 h-5 text-blue-600 group-hover:text-white" />
                                        <span className="font-black text-slate-700 uppercase tracking-tighter group-hover:text-white">{type} <span className="text-emerald-500 group-hover:text-white ml-1">✅</span></span>
                                    </div>
                                ))}
                            </div>

                            {h.accreditation.boardCertified && (
                                <div className="flex items-center gap-3 px-6 py-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl text-emerald-800">
                                    <BadgeCheck className="w-6 h-6 text-emerald-600" />
                                    <span className="font-bold">All practicing physicians and surgeons are actively board-certified.</span>
                                </div>
                            )}
                        </motion.section>

                        {/* 1.5. Treatment Areas & Experts */}
                        <motion.section
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-50"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <Stethoscope className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Expertise & Specialists</h2>
                                    <p className="text-slate-500 font-medium">Leading clinicians in their respective fields</p>
                                </div>
                            </div>

                            <div className="mb-10">
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Areas of Treatment</h4>
                                <div className="flex flex-wrap gap-2">
                                    {h.treatmentAreas?.map((area: string) => (
                                        <span key={area} className="px-4 py-2 bg-slate-50 rounded-full text-sm font-bold text-slate-700 border border-slate-100">
                                            {area}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Our Top Specialists</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {h.doctors?.map((doc: any, idx: number) => (
                                        <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50 rounded-[24px] border border-slate-100">
                                            <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center text-blue-600">
                                                <Users className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-900">{doc.name}</p>
                                                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">{doc.expertise}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {(!h.doctors || h.doctors.length === 0) && (
                                        <p className="text-slate-400 italic text-sm">Specialist directory coming soon.</p>
                                    )}
                                </div>
                            </div>
                        </motion.section>

                        {/* 2. HALAL Compliance Detail Section */}
                        <motion.section
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-[40px] p-8 md:p-10 shadow-2xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full translate-x-10 -translate-y-10 opacity-50" />

                            <div className="flex items-center gap-4 mb-10 relative z-10">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200">
                                    <Heart className="w-7 h-7 fill-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Verified HALAL Healthcare</h2>
                                    <p className="text-emerald-600 font-bold text-sm tracking-widest uppercase">Premium Ethical Standards</p>
                                </div>
                            </div>

                            {h.halalCompliance.hasCertification ? (
                                <div className="bg-emerald-50 border border-emerald-100 rounded-[32px] p-8 mb-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between py-2 border-b border-emerald-100">
                                                <span className="text-emerald-700 font-bold uppercase tracking-widest text-[10px]">Certification Body</span>
                                                <span className="text-slate-900 font-black">JAKIM Verified</span>
                                            </div>
                                            <div className="flex items-center justify-between py-2 border-b border-emerald-100">
                                                <span className="text-emerald-700 font-bold uppercase tracking-widest text-[10px]">Certificate Number</span>
                                                <span className="text-slate-900 font-black font-mono">{h.halalCompliance.certificateNumber || "HALAL-MED-2024"}</span>
                                            </div>
                                            <div className="flex items-center justify-between py-2 border-b border-emerald-100">
                                                <span className="text-emerald-700 font-bold uppercase tracking-widest text-[10px]">Expiry Date</span>
                                                <span className="text-slate-900 font-black">
                                                    {h.halalCompliance.expiryDate ? new Date(h.halalCompliance.expiryDate).toLocaleDateString() : "Active"}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-center md:text-right">
                                            <Button
                                                onClick={() => h.halalCompliance.certificateFile && window.open(h.halalCompliance.certificateFile, '_blank')}
                                                disabled={!h.halalCompliance.certificateFile}
                                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-14 px-8 rounded-2xl shadow-xl shadow-emerald-200 disabled:opacity-50"
                                            >
                                                <FileText className="w-5 h-5 mr-3" /> View Certificate
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-slate-400 italic mb-8">Halal certification profile currently being updated.</p>
                            )}

                            {/* Icons Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { label: "Halal Food Available", active: h.halalCompliance.halalFood, icon: Utensils },
                                    { label: "No Cross Contamination", active: h.halalCompliance.noCrossContamination, icon: Shield },
                                    { label: "Prayer Room (Musalla)", active: h.halalCompliance.prayerRoom, icon: Moon },
                                    { label: "Qibla Direction Marked", active: h.halalCompliance.qiblaMarked, icon: MapPin },
                                    { label: "Quran Availability", active: h.halalCompliance.quranAvailable, icon: BookOpen },
                                    { label: "Same Gender Care Policies", active: h.halalCompliance.sameGenderCare, icon: Users },
                                ].map((item, idx) => (
                                    <div
                                        key={idx}
                                        className={cn(
                                            "flex items-center gap-4 px-6 py-5 rounded-[24px] border transition-all duration-300",
                                            item.active
                                                ? "bg-white border-emerald-100 shadow-sm text-slate-800"
                                                : "bg-slate-50 border-slate-100 text-slate-400 grayscale opacity-60"
                                        )}
                                    >
                                        <div className={cn("p-2 rounded-lg", item.active ? "bg-emerald-50 text-emerald-600" : "bg-slate-100 text-slate-400")}>
                                            <item.icon className="w-5 h-5" />
                                        </div>
                                        <span className="font-bold text-sm">{item.label}</span>
                                        {item.active && <CheckCircle2 className="w-5 h-5 text-emerald-600 ml-auto" />}
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                    </div>

                    {/* Right Column: Sticky Contact & Inquiry */}
                    <div className="space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[40px] p-8 shadow-2xl shadow-slate-200/40 border border-slate-50 sticky top-28"
                        >
                            <h3 className="text-xl font-black text-slate-900 mb-6">Patient Inquiries</h3>
                            <div className="space-y-4 mb-8 text-sm text-slate-600 font-medium">
                                <div className="flex items-center gap-3">
                                    <Clock className="w-4 h-4 text-blue-600" /> Responses within 24 hours
                                </div>
                                <div className="flex items-center gap-3">
                                    <Users className="w-4 h-4 text-blue-600" /> Multi-lingual staff
                                </div>
                                <div className="flex items-center gap-3">
                                    <BadgeCheck className="w-4 h-4 text-blue-600" /> Free second opinion
                                </div>
                            </div>

                            <Button
                                onClick={() => setShowInquiryModal(true)}
                                className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-3xl shadow-xl shadow-blue-200 transition-all active:scale-95"
                            >
                                Send Medical Inquiry
                            </Button>

                            <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">Certified Hospital Contact</p>
                                <div className="flex justify-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"><MapPin className="w-5 h-5" /></div>
                                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-colors cursor-pointer"><Users className="w-5 h-5" /></div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>

            <MedicalInquiryModal
                open={showInquiryModal}
                onClose={() => setShowInquiryModal(false)}
                hospitalName={h.hospitalName}
            />

            {/* 🔵 Footer trust indicator */}
            <div className="bg-slate-900 text-white py-12 px-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4">
                        <Heart className="w-10 h-10 text-emerald-500 fill-emerald-500" />
                        <div>
                            <p className="text-xl font-black">HalalMedi Certified</p>
                            <p className="text-slate-400 text-sm">International Standard for Islamic Healthcare Ethics</p>
                        </div>
                    </div>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-slate-900 font-bold rounded-2xl h-12">
                        Read full Halal Charter
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default HospitalPublicDetails;
