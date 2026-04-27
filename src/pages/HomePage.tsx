"use client";

import React from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import {
  Search, Hospital, Stethoscope, Plane,
  HeartPulse, ShieldCheck, ArrowRight, ArrowUpRight, CheckCircle2,
  Clock, Lock, FileText, ChevronRight, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import MedicalInquiryForm from "@/components/MedicalInquiryForm";
import { api } from "@/lib/api";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

// Premium spring animation physics
const transition = { duration: 1, ease: [0.16, 1, 0.3, 1] } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1, y: 0, transition: { delay: i * 0.1, ...transition }
  }),
};

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const [patient, setPatient] = React.useState<any>(null);

  React.useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "patient") {
      api.get("/patient/profile")
        .then(setPatient)
        .catch(err => console.error("Failed to fetch profile", err));
    }
  }, []);

  return (
    <div className="bg-[#F8FAFC] min-h-screen font-sans selection:bg-blue-600/20 text-slate-900 overflow-hidden">

      {/* Profile Completion Banner for Patients */}
      <AnimatePresence>
        {patient && patient.profileComplete < 100 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-[#0B0F19] text-white overflow-hidden relative z-[60]"
          >
            <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-600/20 flex items-center justify-center shrink-0 border border-blue-500/20">
                  <User className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">Complete Your Health Passport</h4>
                  <p className="text-[11px] text-slate-400">Increase your profile score to {patient.profileComplete < 50 ? '80%' : '100%'} for faster surgery quotes.</p>
                </div>
              </div>

              <div className="flex items-center gap-6 w-full md:w-auto">
                <div className="flex-1 md:w-48 space-y-2">
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="text-blue-400">Profile Score</span>
                    <span>{patient.profileComplete}%</span>
                  </div>
                  <Progress value={patient.profileComplete} className="h-1.5 bg-white/5" />
                </div>
                <Link to="/profile">
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl h-10 px-6 font-bold text-xs transition-all active:scale-95 shadow-lg shadow-blue-500/20">
                    Finish Now
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= DARK CINEMATIC HERO ================= */}
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-32 pb-48 bg-[#0B0F19] overflow-hidden text-white">

        {/* Deep Background Image & Overlays */}
        <div className="absolute inset-0 z-0">
          <motion.img
            style={{ y: yParallax }}
            src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=2900"
            alt="Premium Healthcare Facility"
            className="w-full h-[120%] object-cover object-center opacity-30 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B0F19]/80 via-[#0B0F19]/60 to-[#0B0F19]" />

          {/* Subtle Color Gradients */}
          <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        </div>

        <div className="container mx-auto px-6 relative z-10 max-w-[1200px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="flex flex-col items-center"
          >
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 shadow-2xl mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-[12px] font-bold text-white uppercase tracking-[0.15em]">Global Intake Open</span>
            </div>

            <h1 className="text-[56px] md:text-[80px] lg:text-[100px] font-bold leading-[0.95] tracking-tighter mb-8">
              The world&apos;s best care.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-300 to-blue-500">
                Engineered for you.
              </span>
            </h1>

            <p className="text-[20px] text-slate-300 leading-relaxed max-w-2xl font-light">
              Connect with internationally accredited hospitals and elite specialists. Submit your case below to receive a comprehensive, transparent treatment itinerary within 24 hours.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= MASSIVE INQUIRY CENTER (OVERLAPPING HERO) ================= */}
      <section className="relative z-20 -mt-40 mb-32 px-6">
        <div className="container mx-auto max-w-[1400px]">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...transition }}
            className="bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Left Side: Information & Value Prop (5 cols) */}
            <div className="lg:w-5/12 bg-[#F8FAFC] p-10 lg:p-16 border-r border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-4">
                  Priority Case Review
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-10">
                  By submitting your inquiry, you bypass standard hospital waitlists. Our clinical board will review your medical history and match you with the exact specialist required.
                </p>

                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <Lock className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">100% Secure & Private</h4>
                      <p className="text-sm text-slate-500 mt-1">Your data is encrypted using AES-256 and complies with global HIPAA standards.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">24-Hour Turnaround</h4>
                      <p className="text-sm text-slate-500 mt-1">Receive initial consultation options and cost estimates within one business day.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900">Dedicated Case Manager</h4>
                      <p className="text-sm text-slate-500 mt-1">A single point of contact will guide you through flights, visas, and appointments.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="pt-10 mt-10 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4"></p>
                <div className="flex items-center gap-6 opacity-60 grayscale">
                  <span className="font-black text-xl"></span>
                  <span className="font-black text-xl"></span>
                  <span className="font-black text-xl"></span>
                </div>
              </div>
            </div>

            {/* Right Side: The Massive Form (7 cols) */}
            <div className="lg:w-7/12 p-10 lg:p-16 bg-white relative">
              <div className="max-w-2xl mx-auto w-full">
                {/* Form Header */}
                <div className="mb-10">
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">Patient Information</h2>
                  <p className="text-slate-500">Please provide accurate details to help our medical board assess your case efficiently.</p>
                </div>

                {/* The Extracted Form Component */}
                <div className="w-full">
                  <MedicalInquiryForm />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= BENTO GRID ECOSYSTEM ================= */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-3xl">
              <h2 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-4">Complete Architecture</h2>
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.05]">
                Surgical precision. <br /> Concierge execution.
              </h3>
            </div>
            <Button variant="outline" className="text-slate-900 font-bold border-slate-200 hover:bg-slate-50 rounded-full h-14 px-8">
              Explore All Services <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[340px]">
            {/* Card 1: Midnight Theme (4 cols) */}
            <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="md:col-span-4 bg-[#0B0F19] rounded-[40px] p-10 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] group-hover:bg-blue-500/30 transition-colors duration-700" />
              <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center relative z-10 group-hover:scale-110 transition-transform duration-500">
                <Hospital className="w-8 h-8 text-white" />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white tracking-tight mb-3">Elite Facilities</h3>
                <p className="text-slate-400 font-light leading-relaxed text-lg">Direct partnerships with the top 1% of globally accredited hospitals.</p>
              </div>
            </motion.div>

            {/* Card 2: Light Theme (8 cols) */}
            <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="md:col-span-8 bg-white rounded-[40px] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_20px_80px_rgba(0,0,0,0.06)] transition-all duration-500"
            >
              <div className="absolute top-0 right-0 p-8">
                <div className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-500 cursor-pointer">
                  <ArrowUpRight className="w-6 h-6 text-slate-400 group-hover:text-white transition-colors" />
                </div>
              </div>
              <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <div className="max-w-lg">
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Remote Board Review</h3>
                <p className="text-lg text-slate-500 font-light leading-relaxed">Before you book a flight, a multidisciplinary board of leading surgeons reviews your case via our encrypted medical portal.</p>
              </div>
            </motion.div>

            {/* Card 3: Gradient Theme (8 cols) */}
            <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="md:col-span-8 bg-gradient-to-br from-blue-50 to-teal-50/50 rounded-[40px] p-10 border border-blue-100/50 flex flex-col justify-between relative overflow-hidden group hover:shadow-[0_20px_80px_rgba(37,99,235,0.08)] transition-all duration-500"
            >
              <Plane className="absolute -right-10 -bottom-10 w-[350px] h-[350px] text-blue-600/5 group-hover:-translate-y-6 group-hover:-translate-x-6 transition-transform duration-700" />
              <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-8 h-8 text-teal-600" />
              </div>
              <div className="relative z-10 max-w-lg">
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Concierge Logistics</h3>
                <p className="text-lg text-slate-600 font-light leading-relaxed">Medical visa fast-tracking, premium flights, private airport transfers, and 5-star recovery accommodations.</p>
              </div>
            </motion.div>

            {/* Card 4: Light Theme (4 cols) */}
            <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="md:col-span-4 bg-white rounded-[40px] p-10 shadow-[0_8px_30px_rgba(0,0,0,0.02)] border border-slate-100 flex flex-col justify-between group hover:shadow-[0_20px_80px_rgba(0,0,0,0.06)] transition-all duration-500"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <HeartPulse className="w-8 h-8 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight mb-3">Post-Care</h3>
                <p className="text-lg text-slate-500 font-light leading-relaxed">Continuous remote monitoring and coordination with your local physicians.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= EDITORIAL TIMELINE ================= */}
      <section className="py-32 relative overflow-hidden bg-white border-y border-slate-100 mt-20">
        <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-[#F8FAFC] rounded-full blur-[120px] -z-10" />

        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Sticky Content Side */}
            <div className="lg:sticky lg:top-40 self-start">
              <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-slate-900 leading-[1.05] mb-6">
                Engineered for <br /> absolute clarity.
              </h2>
              <p className="text-slate-500 font-medium text-xl leading-relaxed mb-10 max-w-md">
                We have reduced the complexity of international healthcare down to four transparent, secure steps.
              </p>

              <Button className="rounded-full h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg">
                View Detailed Process
              </Button>
            </div>

            {/* Scrollable Steps */}
            <div className="space-y-8">
              {[
                { step: "01", title: "Secure Submission", desc: "Upload your records to our HIPAA-compliant portal. Your data is encrypted and reviewed only by certified professionals." },
                { step: "02", title: "Board Review", desc: "A dedicated panel of specialists evaluates your case to determine the safest and most effective treatment protocols." },
                { step: "03", title: "Itinerary Creation", desc: "You receive a comprehensive blueprint detailing hospital options, exact costs, physician credentials, and travel logistics." },
                { step: "04", title: "Execution & Care", desc: "From the moment you land, our ground team manages every detail so you can focus entirely on your recovery." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
                  className="bg-[#F8FAFC] rounded-[40px] p-10 border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_80px_rgba(0,0,0,0.06)] hover:border-blue-100 transition-all duration-500 group cursor-pointer"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-[80px] font-bold text-slate-200 leading-none group-hover:text-blue-100 transition-colors duration-500">
                      {item.step}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
                      <ChevronRight className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <h4 className="text-2xl font-bold text-slate-900 tracking-tight mb-4">{item.title}</h4>
                  <p className="text-lg text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ================= ULTRA LUXURY CTA ================= */}
      <section className="bg-[#0B0F19] py-40 relative overflow-hidden">
        {/* Immersive Deep Glows */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-[1200px] text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            view-port={{ once: true }}
            className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] p-12 md:p-24 shadow-[0_0_100px_rgba(37,99,235,0.15)] relative overflow-hidden"
          >
            <div className="absolute inset-0 rounded-[48px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] pointer-events-none" />

            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(59,130,246,0.5)]">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 leading-[1.05]">
              Begin your journey. <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300">We&apos;ll handle the rest.</span>
            </h2>
            <p className="text-xl md:text-2xl text-slate-400 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
              Scroll back up to submit your case, or connect directly with our global clinical coordinators right now.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="h-16 px-12 rounded-full bg-white hover:bg-slate-100 text-[#0B0F19] text-[18px] font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                Submit Your Case
              </Button>
              <Button variant="outline" className="h-16 px-12 rounded-full bg-transparent border-white/20 text-white hover:bg-white/10 text-[18px] font-bold transition-all">
                Talk to an Expert
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="container mx-auto px-6 max-w-[1400px]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-slate-900 font-bold text-xl tracking-tighter">HalalMedi</div>
            <div className="flex flex-wrap items-center justify-center gap-8 text-slate-500 text-sm font-medium">
              <Link to="/home" className="hover:text-blue-600 transition-colors">Home</Link>
              <Link to="/hospitals" className="hover:text-blue-600 transition-colors">Hospitals</Link>
              <Link to="/patient-stories" className="hover:text-blue-600 transition-colors">Stories</Link>
              <Link to="/blogs" className="hover:text-blue-600 transition-colors">Insights</Link>
              <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
              <Link to="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
            </div>
            <div className="text-slate-400 text-xs">© 2026 Halal Medical. Global Precision.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}