"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, CheckCircle2, ArrowLeft, Zap } from "lucide-react";
import { api } from "@/lib/api";
import { socket } from "@/lib/socket";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MedicalInquiryModal from "@/components/MedicalInquiryModal";

const PatientHospitalPreview = () => {
    const [hospital, setHospital] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showInquiryModal, setShowInquiryModal] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchHospital = async () => {
        try {
            const targetId = id || localStorage.getItem("hospitalId");
            if (!targetId) return;

            const res = await api.get(`/hospitals/${targetId}`);
            const data = res.data?.hospital || res.hospital;
            setHospital(data);
        } catch (err) {
            console.error("Error fetching hospital", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHospital();

        socket.on("hospitalUpdated", (updatedHospital: any) => {
            const targetId = id || localStorage.getItem("hospitalId");
            if (updatedHospital._id === targetId) {
                setHospital(updatedHospital);
            }
        });

        return () => {
            socket.off("hospitalUpdated");
        };
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-slate-50 text-slate-500 gap-4">
                <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
                <p className="font-bold animate-pulse text-slate-900">Entering Live Preview...</p>
            </div>
        );
    }

    return (
        <div className="font-sans bg-[#F8FAFC] min-h-screen selection:bg-blue-500/10">

            {/* 🔵 Sticky Header for Admin */}
            {!id && (
                <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between sticky top-0 z-50 backdrop-blur-md bg-slate-900/90 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white fill-white" />
                        </div>
                        <span className="text-sm font-bold tracking-tight">Live Preview Mode</span>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/admin/profile")}
                        className="text-white hover:bg-white/10 h-9 px-4 rounded-full gap-2 border border-white/20"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                    </Button>
                </div>
            )}

            {/* 🔵 Banner */}
            <div className="relative h-[340px] w-full overflow-hidden">
                <img
                    src={hospital?.bannerImage || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2900"}
                    alt="Hospital Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="max-w-5xl mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-[10px] text-white font-bold uppercase tracking-widest mb-4">
                                Verified Healthcare Facility
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter">
                                {hospital?.name || "Hospital Name"}
                            </h1>
                            <p className="text-slate-300 text-lg md:text-xl mt-4 font-light max-w-2xl leading-relaxed">
                                {hospital?.description || "A premier healthcare facility dedicated to providing world-class medical services and compassionate patient care."}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 🏥 Main Content */}
            <div className="max-w-5xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Left Column (2/3) */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* 🧾 Services */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-slate-100"
                        >
                            <h2 className="text-2xl font-bold mb-6 text-slate-900 tracking-tight flex items-center gap-3">
                                <div className="w-2 h-8 bg-blue-600 rounded-full" />
                                Medical Services
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {hospital?.services?.length > 0 ? (
                                    hospital.services.map((service: string, i: number) => (
                                        <div
                                            key={i}
                                            className="px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-700 text-sm font-bold flex items-center gap-3 hover:bg-white hover:shadow-md transition-all group"
                                        >
                                            <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 group-hover:bg-blue-600 transition-colors">
                                                <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 group-hover:text-white" />
                                            </div>
                                            {service}
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-slate-400 text-sm italic">Detailed services list coming soon...</p>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column (1/3) */}
                    <div className="space-y-8">

                        {/* 🔥 Send Inquiry Primary Action */}
                        <Button
                            onClick={() => setShowInquiryModal(true)}
                            className="w-full h-16 rounded-[24px] bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg shadow-[0_20px_40px_rgba(37,99,235,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Send Medical Inquiry
                        </Button>

                        {/* ⚡ Live Indicator (Floating Style) */}
                        <div className="bg-emerald-50 border border-emerald-100 rounded-[24px] p-6 flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                            </div>
                            <div>
                                <h4 className="font-bold text-emerald-900 text-sm">Real-Time Active</h4>
                                <p className="text-[11px] text-emerald-700/80 leading-relaxed mt-1 font-medium italic">
                                    Changes on the admin side reflect here instantly.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <MedicalInquiryModal
                open={showInquiryModal}
                onClose={() => setShowInquiryModal(false)}
                hospitalName={hospital?.name}
            />
        </div>
    );
};

export default PatientHospitalPreview;
