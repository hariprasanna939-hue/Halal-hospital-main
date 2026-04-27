import { motion } from "framer-motion";
import { User, Building2, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EntryLogin = () => {
  const navigate = useNavigate();

  // Apple-style smooth spring animation
  const springTransition = { type: "spring", stiffness: 300, damping: 30 };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      
      {/* Subtle ambient background glow (Apple style soft lighting) */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-400/5 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        className="w-full max-w-[420px] relative z-10"
      >
        {/* Main Glass Panel */}
        <div className="bg-white/70 backdrop-blur-[24px] border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.04)] rounded-[32px] p-10 md:p-12 text-center">
          
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, ...springTransition }}
          >
            <h1 className="text-[28px] font-bold tracking-tight text-[#1D1D1F]">
              HalalMedi
            </h1>
            <p className="text-[15px] font-medium text-[#86868B] mt-1.5">
              Your gateway to world-class healthcare
            </p>
          </motion.div>

          <div className="mt-10 space-y-3">
            {/* Primary Action - Patient (Apple Blue) */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...springTransition }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/patient-login")}
              className="group w-full flex items-center p-4 rounded-[20px] bg-[#007AFF] hover:bg-[#0071E3] shadow-[0_4px_14px_rgba(0,122,255,0.3)] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                <User className="w-5 h-5" />
              </div>
              <div className="text-left ml-4 flex-1">
                <div className="font-semibold text-[15px] text-white tracking-tight">Continue as Patient</div>
                <div className="text-[13px] text-white/80 font-medium mt-0.5">Access healthcare services</div>
              </div>
              <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
            </motion.button>

            {/* Secondary Action - Admin (Apple Light Card) */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...springTransition }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/admin-login")}
              className="group w-full flex items-center p-4 rounded-[20px] bg-white border border-black/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] group-hover:bg-[#007AFF]/10 group-hover:text-[#007AFF] transition-colors">
                <Building2 className="w-5 h-5" />
              </div>
              <div className="text-left ml-4 flex-1">
                <div className="font-semibold text-[15px] text-[#1D1D1F] tracking-tight">Hospital Admin</div>
                <div className="text-[13px] text-[#86868B] font-medium mt-0.5">Manage your hospital</div>
              </div>
              <ChevronRight className="w-5 h-5 text-[#C7C7CC] group-hover:text-[#007AFF] transition-colors" />
            </motion.button>
          </div>
          
        </div>
        
        {/* Apple Style Footer Text */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-[12px] font-medium text-[#86868B] mt-8"
        >
          Secured with end-to-end encryption.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default EntryLogin;
