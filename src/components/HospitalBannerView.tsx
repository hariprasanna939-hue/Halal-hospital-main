import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Shield,
    CheckCircle2,
    Heart,
    MapPin,
    Phone,
    Mail,
    Info,
    ChevronDown,
    Award,
    BadgeCheck,
    Building2,
    Stethoscope,
    Utensils,
    Moon,
    Users
} from "lucide-react";
import { cn } from "@/lib/utils";

interface HospitalBannerViewProps {
    hospital: any;
}

const HospitalBannerView: React.FC<HospitalBannerViewProps> = ({ hospital }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!hospital) return null;

    return (
        <div className="w-full">
            {/* 🔵 Main Banner Section */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="relative h-[360px] md:h-[440px] w-full overflow-hidden cursor-pointer group transition-all duration-500"
            >
                <img
                    src={hospital?.bannerImage || "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2900"}
                    alt="Hospital Banner"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/40 to-transparent" />

                {/* Banner Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                    <div className="max-w-5xl mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600 text-[10px] text-white font-bold uppercase tracking-widest">
                                    Verified Healthcare Provider
                                </div>
                                {hospital?.halalCertification === "yes" && (
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-600 text-[10px] text-white font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                                        <Heart className="w-3 h-3 fill-white" /> Halal Certified
                                    </div>
                                )}
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter drop-shadow-2xl">
                                {hospital?.name || "Hospital Name"}
                            </h1>

                            <p className="text-slate-200 text-lg md:text-xl mt-4 font-medium max-w-2xl leading-relaxed drop-shadow-md">
                                {hospital?.description || "A premier healthcare facility dedicated to providing world-class medical services and compassionate patient care."}
                            </p>

                            <div className="mt-8 flex items-center gap-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-white/20 transition-all shadow-xl"
                                >
                                    <Info className="w-4 h-4" /> View Trust Signals
                                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isOpen ? "rotate-180" : "")} />
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 🟢 Expanded Details Section */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "circOut" }}
                        className="overflow-hidden bg-white border-b border-slate-100"
                    >
                        <div className="max-w-5xl mx-auto px-6 py-12">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                                {/* 1. Licensing & Accreditation (Safety Badges) */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                            <Shield className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900">Licensing & Accreditations</h3>
                                            <p className="text-sm text-slate-500 font-medium tracking-tight uppercase tracking-widest text-[10px]">International Standards</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {hospital?.accreditations?.length > 0 ? (
                                            hospital.accreditations.map((acc: string) => (
                                                <span
                                                    key={acc}
                                                    className="px-4 py-2 bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-full flex items-center gap-2 hover:bg-blue-50 hover:border-blue-200 transition-colors cursor-default"
                                                >
                                                    <Award className="w-3 h-3 text-blue-600" /> {acc}
                                                </span>
                                            ))
                                        ) : (
                                            <div className="flex items-center gap-2 text-slate-400 text-sm italic py-2">
                                                <Info className="w-4 h-4" /> Regional License verified
                                            </div>
                                        )}
                                        {hospital?.physicianLicensing === "yes" && (
                                            <span className="px-4 py-2 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold rounded-full flex items-center gap-2">
                                                <BadgeCheck className="w-3 h-3" /> Licensed Physicians
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* 2. Verified Halal Compliance (Premium Highlight) */}
                                <div className={cn(
                                    "p-8 rounded-[32px] border transition-all duration-500",
                                    hospital?.halalCertification === "yes"
                                        ? "bg-emerald-50/50 border-emerald-100 shadow-[0_20px_50px_rgba(16,185,129,0.05)]"
                                        : "bg-slate-50 border-slate-200 opacity-60"
                                )}>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                                                <Heart className="w-7 h-7 fill-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-slate-900 leading-tight">Verified Halal</h3>
                                                <p className="text-slate-500 text-xs font-semibold tracking-wider uppercase">{hospital?.certificateNumber || "JAKIM Certified"}</p>
                                            </div>
                                        </div>
                                        {hospital?.halalCertification === "yes" && (
                                            <div className="hidden sm:block px-3 py-1 bg-emerald-600 text-white text-[10px] font-black uppercase rounded-lg tracking-tighter">
                                                Premium Standard
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-1 gap-3">
                                            {[
                                                { label: "Dedicated Halal Kitchen", active: hospital?.halalFoodKitchen === "yes", icon: Utensils },
                                                { label: "Prayer Rooms (Musalla)", active: hospital?.prayerRooms === "yes", icon: Moon },
                                                { label: "Same-Gender Care Policies", active: hospital?.sameGenderCare === "yes", icon: Users },
                                            ].map((item, idx) => (
                                                <div
                                                    key={idx}
                                                    className={cn(
                                                        "flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all",
                                                        item.active
                                                            ? "bg-white border-emerald-200 text-slate-800 shadow-sm"
                                                            : "bg-slate-100/50 border-slate-200 text-slate-400 grayscale"
                                                    )}
                                                >
                                                    <item.icon className={cn("w-4 h-4", item.active ? "text-emerald-600" : "text-slate-300")} />
                                                    <span className="text-[13px] font-bold">{item.label}</span>
                                                    {item.active && <CheckCircle2 className="w-4 h-4 text-emerald-600 ml-auto" />}
                                                </div>
                                            ))}
                                        </div>

                                        {hospital?.halalCertification === "yes" && (
                                            <div className="pt-4 border-t border-emerald-100">
                                                <p className="text-[10px] text-emerald-700 font-bold uppercase tracking-widest text-center opacity-70">
                                                    Global Islamic Healthcare Standard Verified
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default HospitalBannerView;
