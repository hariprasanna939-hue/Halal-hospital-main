"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Heart, Shield, Globe, Users,
  Sparkles, Target, ArrowRight, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Premium spring animation physics
const transition = { duration: 1, ease: [0.16, 1, 0.3, 1] } as const;

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0, transition: { delay: i * 0.1, ...transition }
  }),
};

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="bg-[#F5F5F7] min-h-screen font-sans selection:bg-[#007AFF]/20 text-[#1D1D1F] overflow-hidden">

      {/* ================= EDITORIAL HERO ================= */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Soft Ambient Light */}
        <div className="absolute top-[-20%] left-[10%] w-[40vw] h-[40vw] bg-[#007AFF]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-teal-300/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 max-w-[1200px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-8">
              <Sparkles className="w-4 h-4 text-[#007AFF]" />
              <span className="text-[12px] font-bold text-[#1D1D1F] uppercase tracking-[0.15em]">Our Story</span>
            </div>

            <h1 className="text-[56px] md:text-[80px] font-bold leading-[0.95] tracking-tighter mb-6 text-[#1D1D1F]">
              Engineering hope. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] via-teal-500 to-[#007AFF] animate-gradient-x">
                Delivering care.
              </span>
            </h1>

            <p className="text-[20px] text-[#86868B] leading-relaxed max-w-2xl font-medium">
              We bridge the gap between international patients and India&apos;s finest healthcare institutions, ensuring ethical, transparent, and compassionate care without borders.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= FEATURED MISSION STATEMENT ================= */}
      <section className="px-6 pb-32 relative z-20">
        <div className="container mx-auto max-w-[1400px]">
          {/* Refactored to full width centered layout */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...transition }}
            className="group relative bg-[#0A0D14] rounded-[48px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] ring-1 ring-black/5 py-24 px-10 md:px-20 flex flex-col items-center text-center"
          >
            {/* Deep Glow background effect over dark bg */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/10 to-transparent opacity-50 pointer-events-none" />

            {/* Oversized Decorative Icon, centered */}
            <Target className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] text-white/5 rotate-12 pointer-events-none group-hover:rotate-0 transition-transform duration-1000" />

            {/* Centered Content Block */}
            <div className="relative z-10 max-w-4xl flex flex-col items-center">
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05] tracking-tight mb-10">
                Healthcare is a universal right, not a geographical privilege.
              </h3>

              <div className="space-y-6">
                <p className="text-xl text-slate-300 font-light leading-relaxed max-w-3xl">
                  Founded by a collective of medical professionals and logistics experts, Halalmedi was built to solve a critical global problem: navigating the complexities of international medical travel.
                </p>
                <p className="text-xl text-slate-300 font-light leading-relaxed max-w-3xl">
                  We dismantle language barriers, decode medical jargon, and bypass administrative red tape to connect you directly with the top 1% of clinical talent globally.
                </p>
              </div>

              {/* Centered Metrics */}
              <div className="mt-16 pt-10 border-t border-white/10 flex items-center justify-center gap-12 text-white w-full max-w-xl">
                <div>
                  <p className="text-5xl font-bold">10k+</p>
                  <p className="text-sm text-[#86868B] font-medium mt-1 uppercase tracking-wider">Patients Served</p>
                </div>
                <div className="w-px h-16 bg-white/10" />
                <div>
                  <p className="text-5xl font-bold">30+</p>
                  <p className="text-sm text-[#86868B] font-medium mt-1 uppercase tracking-wider">Countries</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= BENTO GRID VALUES ================= */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-[1400px]">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#007AFF]/10 text-[#007AFF] font-bold text-xs uppercase tracking-[0.2em] mb-6">
              Core Principles
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] leading-[1.1]">
              The foundation of our practice.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[340px]">
            {/* Card 1: Wide Gradient Feature (8 cols) */}
            <motion.div variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="md:col-span-8 bg-white/70 backdrop-blur-3xl rounded-[40px] p-10 lg:p-12 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#007AFF]/10 to-transparent rounded-bl-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
              <Heart className="absolute -bottom-10 -right-10 w-72 h-72 text-[#007AFF]/5 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#007AFF] to-teal-400 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="relative z-10 max-w-lg">
                <h3 className="text-3xl font-bold text-[#1D1D1F] tracking-tight mb-4">Patient First</h3>
                <p className="text-lg text-[#86868B] font-medium leading-relaxed">
                  Every logistical move, every hospital recommendation, and every clinical decision is guided solely by your wellbeing and comfort. We work for you, not the hospitals.
                </p>
              </div>
            </motion.div>

            {/* Card 2: Dark Theme (4 cols) */}
            <motion.div variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="md:col-span-4 bg-[#0A0D14] rounded-[40px] p-10 flex flex-col justify-between group relative overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#007AFF]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:rotate-12 transition-transform duration-500">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white tracking-tight mb-3">Trust & Transparency</h3>
                <p className="text-[#86868B] font-medium leading-relaxed">Verified JCI hospitals, completely transparent pricing structures, and zero hidden costs.</p>
              </div>
            </motion.div>

            {/* Card 3: Light Glass (4 cols) */}
            <motion.div variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="md:col-span-4 bg-white/80 backdrop-blur-3xl rounded-[40px] p-10 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-between group"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center group-hover:-rotate-12 transition-transform duration-500">
                <Globe className="w-7 h-7 text-teal-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-[#1D1D1F] tracking-tight mb-3">Global Access</h3>
                <p className="text-[#86868B] font-medium leading-relaxed">Seamlessly managing care logistics for patients traveling from over 30 countries worldwide.</p>
              </div>
            </motion.div>

            {/* Card 4: Light Glass Wide (8 cols) */}
            <motion.div variants={fadeUp} custom={4} initial="hidden" whileInView="visible" viewport={{ once: true }}
              className="md:col-span-8 bg-white/80 backdrop-blur-3xl rounded-[40px] p-10 lg:p-12 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col justify-between relative overflow-hidden group"
            >
              <Users className="absolute -right-10 -bottom-10 w-72 h-72 text-slate-100 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
              <div className="w-14 h-14 rounded-2xl bg-[#007AFF]/10 flex items-center justify-center mb-6 group-hover:bg-[#007AFF] transition-colors duration-500">
                <Users className="w-7 h-7 text-[#007AFF] group-hover:text-white transition-colors duration-500" />
              </div>
              <div className="relative z-10 max-w-lg">
                <h3 className="text-3xl font-bold text-[#1D1D1F] tracking-tight mb-4">Elite Expert Team</h3>
                <p className="text-lg text-[#86868B] font-medium leading-relaxed">
                  Your journey is managed by a dedicated board of clinical advisors, visa specialists, and concierge managers who act as your personal healthcare advocates.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= DARK APPLE CTA ================= */}
      <section className="bg-[#0A0D14] py-32 relative overflow-hidden mt-20">
        {/* Immersive Deep Glows */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#007AFF]/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] p-12 md:p-20 shadow-[0_0_100px_rgba(0,122,255,0.15)] relative overflow-hidden"
          >
            {/* Apple style inner ring */}
            <div className="absolute inset-0 rounded-[48px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] pointer-events-none" />

            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#007AFF] to-teal-400 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,122,255,0.5)]">
              <CheckCircle2 className="w-8 h-8 text-white" />
            </div>

            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6 leading-[1.05]">
              Experience healthcare <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] to-teal-300">without borders.</span>
            </h2>
            <p className="text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Speak with our clinical advisory board today. Let us build a transparent, personalized itinerary for your recovery.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="h-14 px-10 rounded-full bg-white hover:bg-slate-100 text-[#0A0D14] text-[16px] font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                Request Free Consultation
              </Button>
              <Button variant="outline" className="h-14 px-10 rounded-full bg-transparent border-white/20 text-white hover:bg-white/10 text-[16px] font-bold transition-all">
                Contact our Team <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}