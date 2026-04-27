"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Quote, Star, ShieldCheck, Play, ArrowRight, 
  MapPin, CheckCircle2, Video 
} from "lucide-react";
import { Button } from "@/components/ui/button";

// Premium spring animation physics (Apple feel)
const transition = { duration: 1, ease: [0.16, 1, 0.3, 1] };

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({ 
    opacity: 1, y: 0, transition: { delay: i * 0.1, ...transition } 
  }),
};

const featuredStory = {
  name: "Ahmed K.",
  country: "United Arab Emirates",
  treatment: "Complex Cardiac Bypass",
  hospital: "Apollo Indraprastha, Delhi",
  quote: "I was told my condition was too risky. Halalmedi didn't just find me a surgeon; they found me the exact specialist who pioneered this procedure. They saved my life while treating me like family.",
  img: "https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&q=80&w=2000"
};

const stories = [
  { 
    name: "Fatima S.", initials: "FS", country: "Nigeria", treatment: "Orthopedic Joint Replacement", 
    story: "From the visa assistance to the wheelchair waiting at the airport, every single step was orchestrated perfectly. I am walking pain-free for the first time in ten years.",
    color: "from-[#007AFF] to-indigo-500"
  },
  { 
    name: "Rashid M.", initials: "RM", country: "Bangladesh", treatment: "Advanced Oncology", 
    story: "Cancer is terrifying, but the Halalmedi medical board gave me clarity. The transparency in pricing and the daily check-ins from my concierge made a world of difference.",
    color: "from-teal-400 to-emerald-500"
  },
  { 
    name: "Aisha B.", initials: "AB", country: "Kenya", treatment: "Pediatric Neurology", 
    story: "Trusting someone with your child's brain surgery is the hardest thing a mother can do. The hospital was world-class, and the surgeon was an absolute angel.",
    color: "from-purple-400 to-pink-500"
  },
  { 
    name: "Omar T.", initials: "OT", country: "Saudi Arabia", treatment: "Spinal Decompression", 
    story: "I had consultations with doctors in Germany and the US, but the remote second opinion provided here was the most detailed. The surgery in India was flawless.",
    color: "from-orange-400 to-red-500"
  },
];

export default function PatientStoriesPage() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="bg-[#F5F5F7] min-h-screen font-sans selection:bg-[#007AFF]/20 text-[#1D1D1F] overflow-hidden">
      
      {/* ================= APPLE GLASS HERO ================= */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Soft Ambient Light (Apple Style Background) */}
        <div className="absolute top-[-20%] left-[10%] w-[40vw] h-[40vw] bg-[#007AFF]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-teal-300/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 max-w-[1200px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={transition}
            className="flex flex-col items-center"
          >
            {/* Glassmorphic Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-8">
              <Star className="w-4 h-4 text-[#007AFF]" fill="currentColor" />
              <span className="text-[12px] font-bold text-[#1D1D1F] uppercase tracking-[0.15em]">Rated 4.9/5 Worldwide</span>
            </div>

            <h1 className="text-[56px] md:text-[80px] font-bold leading-[0.95] tracking-tighter mb-6 text-[#1D1D1F]">
              Stories of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] via-teal-500 to-[#007AFF] animate-gradient-x">
                resilience & recovery.
              </span>
            </h1>
            
            <p className="text-[20px] text-[#86868B] leading-relaxed max-w-2xl font-medium">
              Real journeys from real people. Discover how patients from over 45 countries found hope, healing, and world-class care through our network.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ================= CINEMATIC FEATURED STORY ================= */}
      <section className="relative z-20 px-6 pb-20">
        <div className="container mx-auto max-w-[1400px]">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...transition }}
            className="group relative bg-[#0A0D14] rounded-[48px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)] flex flex-col lg:flex-row min-h-[600px] ring-1 ring-black/5"
          >
            {/* Left: Cinematic Image */}
            <div className="lg:w-1/2 relative overflow-hidden h-[400px] lg:h-auto">
              <motion.img 
                style={{ y: yParallax }}
                src={featuredStory.img} 
                alt="Patient Recovery" 
                className="absolute inset-0 w-full h-[120%] object-cover object-center opacity-80 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0D14] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] to-transparent lg:hidden" />
              
              {/* Play Button Overlay (Apple Glass Style) */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-xl border border-white/30 rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 hover:scale-110 transition-all duration-300 shadow-2xl">
                  <Play className="w-8 h-8 text-white ml-1" fill="currentColor" />
                </div>
              </div>
              <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-xl border border-white/10 text-white text-xs font-bold px-4 py-2 rounded-full flex items-center gap-2">
                <Video className="w-4 h-4 text-blue-400" /> Watch Documentary
              </div>
            </div>

            {/* Right: The Quote */}
            <div className="lg:w-1/2 p-10 lg:p-20 relative flex flex-col justify-center">
              <Quote className="absolute top-10 right-10 w-32 h-32 text-white/5 rotate-12" />
              
              <div className="flex items-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-orange-400" fill="currentColor" />
                ))}
              </div>

              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.2] tracking-tight mb-10 relative z-10">
                &quot;{featuredStory.quote}&quot;
              </h3>

              <div className="flex items-center gap-4 relative z-10">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#007AFF] to-teal-400 flex items-center justify-center shadow-[0_0_30px_rgba(0,122,255,0.3)]">
                  <span className="text-xl font-bold text-white">AK</span>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">{featuredStory.name}</h4>
                  <p className="text-blue-400 text-sm font-medium flex items-center gap-1 mt-0.5">
                    <ShieldCheck className="w-4 h-4" /> Verified Patient
                  </p>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 flex flex-wrap gap-4 text-slate-400 text-sm font-medium">
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {featuredStory.country}</span>
                <span className="hidden sm:block">•</span>
                <span>{featuredStory.treatment}</span>
                <span className="hidden sm:block">•</span>
                <span>{featuredStory.hospital}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= GLASS BENTO GRID STORIES ================= */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-[1400px]">
          <div className="grid md:grid-cols-2 gap-8">
            {stories.map((s, i) => (
              <motion.div
                key={s.name}
                variants={fadeUp}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white/70 backdrop-blur-3xl rounded-[40px] p-10 lg:p-12 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_rgba(0,0,0,0.08)] transition-all duration-500 group relative overflow-hidden flex flex-col justify-between"
              >
                {/* Massive Decorative Quote Icon */}
                <Quote className="absolute -bottom-10 -right-10 w-64 h-64 text-[#F5F5F7] rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 text-orange-400" fill="currentColor" />
                    ))}
                  </div>

                  <p className="text-[20px] md:text-[22px] text-[#1D1D1F] leading-relaxed font-medium mb-10 tracking-tight">
                    &quot;{s.story}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-5 pt-8 border-t border-black/5 relative z-10">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${s.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <span className="text-lg font-bold text-white">{s.initials}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-[#1D1D1F]">{s.name}</h4>
                      <div className="bg-emerald-50 text-emerald-600 text-[11px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" /> Verified
                      </div>
                    </div>
                    <p className="text-[#86868B] text-sm mt-0.5 font-medium">{s.country} • {s.treatment}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button variant="outline" className="rounded-full h-14 px-10 border-black/10 text-[#1D1D1F] font-bold hover:bg-white hover:shadow-md transition-all">
              Load More Stories
            </Button>
          </div>
        </div>
      </section>

      {/* ================= DARK APPLE CTA ================= */}
      <section className="bg-[#0A0D14] py-32 relative overflow-hidden mt-10">
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
              Start your own <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] to-teal-300">success story.</span>
            </h2>
            <p className="text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Connect with our clinical board today. Receive a personalized, transparent treatment itinerary within 24 hours.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button className="h-14 px-10 rounded-full bg-white hover:bg-slate-100 text-[#0A0D14] text-[16px] font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)]">
                Request Free Quote
              </Button>
              <Button variant="outline" className="h-14 px-10 rounded-full bg-transparent border-white/20 text-white hover:bg-white/10 text-[16px] font-bold transition-all">
                Speak to an Expert <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}