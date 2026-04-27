"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Calendar, Clock, ArrowUpRight, Search, 
  Sparkles, ChevronRight, Mail 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Premium spring animation physics
const transition = { duration: 1, ease: [0.16, 1, 0.3, 1] };

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ 
    opacity: 1, y: 0, transition: { delay: i * 0.1, ...transition } 
  }),
};

// Enhanced mock data to fit an editorial layout
const featuredPost = {
  title: "The Future of Global Healthcare: Why Millions are Choosing Borderless Treatment.",
  date: "April 12, 2026",
  readTime: "8 min read",
  category: "Industry Insights",
  excerpt: "With a unique blend of JCI-accredited facilities, top-tier surgical talent, and concierge-level logistics, the paradigm of international healthcare is shifting dramatically.",
  img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000"
};

const posts = [
  { 
    title: "Understanding International Medical Visas", 
    date: "Mar 15, 2026", 
    readTime: "5 min read",
    category: "Travel Guide",
    excerpt: "A comprehensive, step-by-step breakdown of how to secure a medical visa quickly and efficiently for your treatment in India.",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Top 5 Cardiac Excellence Centers", 
    date: "Mar 10, 2026", 
    readTime: "6 min read",
    category: "Hospital Spotlight",
    excerpt: "Explore the highest-rated cardiac care centers equipped with cutting-edge robotic surgery technology and elite surgical teams.",
    img: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "Post-Surgery: The Golden Rules of Recovery", 
    date: "Feb 28, 2026", 
    readTime: "4 min read",
    category: "Patient Care",
    excerpt: "Essential recovery guidelines and nutritional advice to ensure a smooth, complication-free healing process after major surgery.",
    img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800"
  },
  { 
    title: "How Remote Second Opinions Save Lives", 
    date: "Feb 15, 2026", 
    readTime: "7 min read",
    category: "Clinical Tech",
    excerpt: "Before booking a flight, learn why connecting with a multidisciplinary medical board via encrypted video is the ultimate first step.",
    img: "https://images.unsplash.com/photo-1576091160550-2173ff9e5ee5?auto=format&fit=crop&q=80&w=800"
  },
];

export default function BlogsPage() {
  const { scrollYProgress } = useScroll();
  const yParallax = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <div className="bg-[#F5F5F7] min-h-screen font-sans selection:bg-[#007AFF]/20 text-[#1D1D1F] overflow-hidden">
      
      {/* ================= EDITORIAL HERO & SEARCH ================= */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        {/* Soft Ambient Light */}
        <div className="absolute top-[-20%] left-[10%] w-[40vw] h-[40vw] bg-[#007AFF]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-[10%] right-[10%] w-[30vw] h-[30vw] bg-teal-300/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10 max-w-[1400px]">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={transition}
              className="max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 backdrop-blur-xl border border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.04)] mb-8">
                <Sparkles className="w-4 h-4 text-[#007AFF]" />
                <span className="text-[12px] font-bold text-[#1D1D1F] uppercase tracking-[0.15em]">Insights & Resources</span>
              </div>

              <h1 className="text-[56px] md:text-[72px] font-bold leading-[0.95] tracking-tighter mb-6 text-[#1D1D1F]">
                The Editorial <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#007AFF] via-teal-500 to-[#007AFF] animate-gradient-x">
                  Journal.
                </span>
              </h1>
              
              <p className="text-[20px] text-[#86868B] leading-relaxed font-medium">
                Expert medical guides, hospital spotlights, and essential travel intelligence for your healthcare journey.
              </p>
            </motion.div>

            {/* Premium Floating Search */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, ...transition }}
              className="w-full lg:w-[400px] relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#007AFF] to-teal-400 rounded-full blur opacity-0 group-hover:opacity-10 transition duration-500" />
              <div className="relative flex items-center bg-white/80 backdrop-blur-xl border border-white shadow-lg rounded-full p-2 hover:shadow-xl transition-all duration-300">
                <Search className="w-5 h-5 text-slate-400 ml-4" />
                <Input
                  placeholder="Search articles..."
                  className="flex-1 h-12 bg-transparent border-none text-[16px] focus-visible:ring-0 placeholder:text-slate-400 shadow-none px-4"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= CINEMATIC FEATURED POST ================= */}
      <section className="px-6 py-10 relative z-20">
        <div className="container mx-auto max-w-[1400px]">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, ...transition }}
            className="group relative bg-[#0A0D14] rounded-[48px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.12)] min-h-[550px] lg:min-h-[650px] flex items-end cursor-pointer ring-1 ring-black/5"
          >
            {/* Background Image */}
            <motion.img 
              style={{ y: yParallax }}
              src={featuredPost.img} 
              alt={featuredPost.title}
              className="absolute inset-0 w-full h-[120%] object-cover opacity-60 mix-blend-luminosity group-hover:scale-105 transition-transform duration-1000"
            />
            
            {/* Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/40 to-transparent opacity-90" />
            
            {/* Content */}
            <div className="relative z-10 p-10 lg:p-16 w-full max-w-4xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-white/20 backdrop-blur-md border border-white/20 text-white text-[12px] font-bold px-4 py-2 rounded-full">
                  {featuredPost.category}
                </span>
                <span className="text-white/70 text-sm font-medium flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> {featuredPost.readTime}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6 group-hover:text-blue-100 transition-colors duration-500">
                {featuredPost.title}
              </h2>
              
              <p className="text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-10 max-w-2xl">
                {featuredPost.excerpt}
              </p>

              <div className="flex items-center justify-between border-t border-white/10 pt-8">
                <div className="flex items-center gap-2 text-white/70 font-medium text-sm">
                  <Calendar className="w-4 h-4" /> {featuredPost.date}
                </div>
                <div className="w-14 h-14 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <ArrowUpRight className="w-6 h-6 text-[#1D1D1F]" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= BENTO GRID POSTS ================= */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-[1400px]">
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold tracking-tight text-[#1D1D1F]">Latest Insights</h3>
            <div className="hidden md:flex gap-2">
              {["All", "Travel", "Hospitals", "Recovery"].map((tag, i) => (
                <span key={tag} className={`px-5 py-2 rounded-full text-sm font-bold cursor-pointer transition-all ${i === 0 ? "bg-[#1D1D1F] text-white" : "bg-white border border-black/5 text-[#86868B] hover:bg-black/5"}`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                custom={i + 1}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white/70 backdrop-blur-3xl rounded-[40px] p-4 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_80px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-500 group relative flex flex-col cursor-pointer"
              >
                {/* Image Area */}
                <div className="relative h-60 overflow-hidden rounded-[32px] mb-6">
                  <img 
                    src={p.img} 
                    alt={p.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] rounded-[32px] pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1D1D1F] text-[12px] font-bold px-4 py-2 rounded-full shadow-lg">
                    {p.category}
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 flex flex-col flex-1">
                  <div className="flex-1">
                    <h4 className="text-[24px] font-bold text-[#1D1D1F] leading-[1.2] tracking-tight mb-3 group-hover:text-[#007AFF] transition-colors duration-300">
                      {p.title}
                    </h4>
                    <p className="text-[15px] text-[#86868B] font-medium leading-relaxed line-clamp-2">
                      {p.excerpt}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-8 pt-6 border-t border-black/5">
                    <div className="flex items-center gap-4 text-[13px] font-medium text-[#86868B]">
                      <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {p.date}</span>
                      <span className="hidden sm:inline">•</span>
                      <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {p.readTime}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center group-hover:border-[#007AFF] group-hover:bg-[#007AFF] transition-colors duration-300">
                      <ArrowUpRight className="w-4 h-4 text-[#86868B] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Button variant="outline" className="rounded-full h-14 px-10 border-black/10 text-[#1D1D1F] font-bold hover:bg-white hover:shadow-md transition-all">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* ================= DARK NEWSLETTER CTA ================= */}
      <section className="bg-[#0A0D14] py-32 relative overflow-hidden mt-10">
        {/* Immersive Deep Glows */}
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#007AFF]/20 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="container mx-auto px-6 max-w-5xl text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[48px] p-12 md:p-20 shadow-[0_0_100px_rgba(0,122,255,0.15)] relative overflow-hidden"
          >
            <div className="absolute inset-0 rounded-[48px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] pointer-events-none" />
            
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#007AFF] to-teal-400 flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(0,122,255,0.5)]">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-6 leading-[1.05]">
              Stay ahead of the curve.
            </h2>
            <p className="text-xl text-slate-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
              Join 50,000+ readers. Get the latest insights on medical breakthroughs, hospital rankings, and travel advisories delivered straight to your inbox.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
              <Input 
                placeholder="Enter your email address" 
                className="h-14 w-full rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus-visible:ring-1 focus-visible:ring-[#007AFF] px-6 text-[16px]"
              />
              <Button className="h-14 w-full sm:w-auto px-10 rounded-full bg-white hover:bg-slate-100 text-[#0A0D14] text-[16px] font-bold transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.15)] shrink-0">
                Subscribe
              </Button>
            </div>
            <p className="text-[13px] text-slate-500 mt-6">We respect your privacy. Unsubscribe at any time.</p>
          </motion.div>
        </div>
      </section>

    </div>
  );
}