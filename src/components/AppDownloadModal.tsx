import { motion, AnimatePresence } from "framer-motion";
import { X, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AppDownloadModalProps {
  open: boolean;
  onClose: () => void;
}

const AppDownloadModal = ({ open, onClose }: AppDownloadModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="glass-card-strong rounded-3xl p-8 max-w-sm w-full text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>

            <h3 className="text-lg font-bold text-foreground">Track Your Medical Journey</h3>
            <p className="text-sm text-muted-foreground mt-2">Download the Halalmedi app for real-time updates and seamless healthcare access.</p>

            <div className="mt-6 space-y-3">
              <Button className="w-full h-11 rounded-xl text-sm font-semibold">
                Download for Android
              </Button>
              <Button variant="outline" className="w-full h-11 rounded-xl text-sm font-semibold">
                Download for iOS
              </Button>
              <button onClick={onClose} className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors pt-1">
                Continue on Website
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AppDownloadModal;
