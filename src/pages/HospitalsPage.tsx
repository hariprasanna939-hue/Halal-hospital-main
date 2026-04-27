"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  MapPin, Search, Filter, Star, ShieldCheck,
  ChevronRight, Sparkles, Building2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AppDownloadModal from "@/components/AppDownloadModal";
import MedicalInquiryModal from "@/components/MedicalInquiryModal";
import { api } from "@/lib/api";
import { toast } from "sonner";

import { socket } from "@/lib/socket";

// Premium spring animation physics
const transition = { duration: 1, ease: [0.16, 1, 0.3, 1] } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0, transition: { delay: i * 0.1, ...transition }
  }),
};

export default function HospitalsPage() {
  const [showModal, setShowModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [selectedHospitalName, setSelectedHospitalName] = useState("");
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const data = await api.get("/hospital");
        console.log("Fetched Hospitals:", data);
        setHospitals(data);
      } catch (err) {
        toast.error("Failed to load hospitals. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchHospitals();

    // Setup Real-time Listener
    socket.on("hospitalUpdated", (updatedHospital: any) => {
      console.log("Real-time Update Received:", updatedHospital);
      setHospitals((prev) =>
        prev.map((h) => h._id === updatedHospital._id ? updatedHospital : h)
      );
    });

    // Fallback Polling (Every 10 seconds)
    const pollInterval = setInterval(fetchHospitals, 10000);

    return () => {
      socket.off("hospitalUpdated");
      clearInterval(pollInterval);
    };
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans selection:bg-blue-600/20 text-slate-900 overflow-hidden">

      {/* ================= DARK CINEMATIC HERO ================= */}
      <section className="relative min-h-[60vh] flex flex-col justify-center pt-32 pb-48 bg-[#0B0F19] overflow-hidden text-white">

        {/* Deep Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <motion.img
            style={{ y: yParallax }}
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2900"
            alt="Premium Healthcare Facility"
            className="w-full h-[120%] object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-[#0B0F19]/60 to-[#0B0F19]" />

          {/* Subtle Color Gradients */}
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-[1400px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="flex flex-col items-center"
          >
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl mb-8">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-[12px] font-bold text-white uppercase tracking-[0.15em]">Elite Global Network</span>
            </div>

            <h1 className="text-[48px] md:text-[64px] lg:text-[80px] font-bold leading-[0.95] tracking-tighter mb-6">
              World-Class Hospitals.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-blue-500">
                At your fingertips.
              </span>
            </h1>

            <p className="text-[18px] md:text-[20px] text-slate-300 leading-relaxed max-w-2xl font-light">
              Explore our highly curated network of JCI and NABH accredited medical facilities. Filter by specialty, location, and expert ratings.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= OVERLAPPING COMMAND CENTER (FILTER BAR) ================= */}
      <section className="relative z-20 -mt-24 mb-20 px-6">
        <div className="container mx-auto max-w-[1200px]">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...transition }}
            className="bg-white/90 backdrop-blur-2xl rounded-[32px] md:rounded-full shadow-[0_30px_100px_rgba(0,0,0,0.12)] border border-white p-3 flex flex-col md:flex-row gap-3 relative"
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 rounded-[32px] md:rounded-full shadow-[inset_0_0_0_1px_rgba(255,255,255,1)] pointer-events-none" />

            {/* Search Input */}
            <div className="relative flex-1 group">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <Input
                placeholder="Search hospitals by name or ID..."
                className="h-16 w-full rounded-full bg-slate-50/50 hover:bg-slate-50 border-none pl-14 pr-6 text-[16px] text-slate-900 placeholder:text-slate-400 focus-visible:ring-0 shadow-none transition-colors"
              />
            </div>

            {/* Divider (Desktop) */}
            <div className="hidden md:block w-px h-10 bg-slate-200 self-center mx-2" />

            {/* Selectors */}
            <div className="flex flex-col sm:flex-row gap-3 md:w-auto">
              <div className="flex-1 md:w-[200px]">
                <Select>
                  <SelectTrigger className="h-16 rounded-full border-none bg-slate-50/50 hover:bg-slate-50 transition-colors shadow-none text-[16px] font-medium px-6 text-slate-700">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl shadow-2xl border-slate-100">
                    <SelectItem value="all">All Cities</SelectItem>
                    <SelectItem value="delhi">Delhi, NCR</SelectItem>
                    <SelectItem value="mumbai">Mumbai</SelectItem>
                    <SelectItem value="bangalore">Bangalore</SelectItem>
                    <SelectItem value="gurugram">Gurugram</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex-1 md:w-[220px]">
                <Select>
                  <SelectTrigger className="h-16 rounded-full border-none bg-slate-50/50 hover:bg-slate-50 transition-colors shadow-none text-[16px] font-medium px-6 text-slate-700">
                    <SelectValue placeholder="Speciality" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl shadow-2xl border-slate-100">
                    <SelectItem value="all">All Specialities</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="oncology">Oncology</SelectItem>
                    <SelectItem value="neurology">Neurology</SelectItem>
                    <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Action Button */}
              <Button className="h-16 px-10 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-[16px] shadow-[0_8px_20px_rgba(37,99,235,0.25)] transition-all hover:scale-[1.02]">
                Find
              </Button>
            </div>
          </motion.div>

          {/* Results Summary */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center justify-between mt-8 px-4"
          >
            <p className="text-slate-500 font-medium">Showing <span className="text-slate-900 font-bold">{hospitals.length}</span> top-tier facilities</p>
            <div className="flex items-center gap-2 text-sm font-semibold text-blue-600 cursor-pointer hover:text-blue-700">
              <Filter className="w-4 h-4" /> Advanced Filters
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= HOSPITAL BENTO GRID ================= */}
      <section className="pb-32 px-6">
        <div className="container mx-auto max-w-[1400px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {loading ? (
              // Loading Skeleton
              [1, 2, 3].map(i => (
                <div key={i} className="h-[400px] rounded-[32px] bg-slate-200 animate-pulse" />
              ))
            ) : hospitals.length > 0 ? (
              hospitals.map((h, i) => (
                <motion.div
                  key={h._id || i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  onClick={() => navigate(`/hospital/${h._id}`)}
                  className="group relative bg-white rounded-[32px] overflow-hidden border border-slate-200/60 hover:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] transition-all duration-700 flex flex-col cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    {(() => {
                      const imgUrl = h.bannerImage || h.imageUrl || h.banner;
                      return (
                        <img
                          src={imgUrl || "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80"}
                          alt={h.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80";
                          }}
                        />
                      );
                    })()}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="absolute top-4 right-4 h-8 px-3 rounded-full bg-white/90 backdrop-blur-md flex items-center gap-1.5 shadow-sm">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span className="text-[12px] font-bold">{h.rating || "4.5"}</span>
                    </div>

                    {h.accredited !== false && (
                      <div className="absolute top-4 left-4 h-8 px-3 rounded-full bg-[#007AFF] text-white flex items-center gap-1.5 shadow-lg shadow-blue-500/20">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Verified</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-[#007AFF] font-bold text-[12px] uppercase tracking-wider mb-3">
                        <Building2 className="w-4 h-4" />
                        {h.specialties?.[0] || "Multi-Specialty"} Center
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight group-hover:text-[#007AFF] transition-colors">
                        {h.name}
                      </h3>
                      <div className="flex items-center gap-1.5 text-slate-500 text-sm font-medium mb-4">
                        <MapPin className="w-4 h-4" />
                        {h.city}, {h.country || "India"}
                      </div>
                      <p className="text-[15px] text-slate-500 font-light leading-relaxed line-clamp-2">
                        {h.description || "World-class treatments equipped with advanced medical technology and top-tier clinical experts."}
                      </p>
                    </div>

                    {/* Editorial Actions */}
                    <div className="flex gap-4 mt-8 pt-6 border-t border-slate-100">
                      <Button
                        className="flex-1 rounded-full h-14 bg-slate-900 hover:bg-slate-800 text-white text-[15px] font-bold shadow-lg transition-all hover:scale-[1.02]"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedHospitalName(h.name);
                          setShowInquiryModal(true);
                        }}
                      >
                        Send Inquiry
                      </Button>
                      <Button
                        variant="outline"
                        className="w-14 h-14 rounded-full border-slate-200 bg-white hover:bg-slate-50 text-slate-900 p-0 flex items-center justify-center transition-all group/btn"
                      >
                        <ChevronRight className="w-6 h-6 text-slate-400 group-hover/btn:text-blue-600 transition-colors" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-white rounded-[40px] border border-slate-100 shadow-sm">
                <p className="text-slate-500 font-medium text-lg">No hospitals found matching your criteria.</p>
                <Button variant="link" className="text-blue-600 mt-2">Clear all filters</Button>
              </div>
            )}
          </div>

          {/* Load More Option */}
          <div className="mt-20 text-center">
            <Button variant="outline" className="rounded-full h-14 px-10 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 hover:text-slate-900 transition-all">
              Load More Facilities
            </Button>
          </div>
        </div>
      </section>

      <AppDownloadModal open={showModal} onClose={() => setShowModal(false)} />
      <MedicalInquiryModal
        open={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
        hospitalName={selectedHospitalName}
      />
    </div>
  );
}