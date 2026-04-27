import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import AppDownloadModal from "@/components/AppDownloadModal";

const ContactPage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-3xl font-bold text-foreground">Contact Us</h1>
          <p className="text-sm text-muted-foreground mt-2">We're here to help with your healthcare needs</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          <motion.div initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Email</h3>
                <p className="text-xs text-muted-foreground">info@halalmedi.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Phone</h3>
                <p className="text-xs text-muted-foreground">+91-800-123-4567</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">Office</h3>
                <p className="text-xs text-muted-foreground">New Delhi, India</p>
              </div>
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <Input placeholder="Your Name" className="h-10 rounded-xl bg-secondary/50 border-0 text-sm" />
            <Input type="email" placeholder="Email Address" className="h-10 rounded-xl bg-secondary/50 border-0 text-sm" />
            <Input placeholder="Subject" className="h-10 rounded-xl bg-secondary/50 border-0 text-sm" />
            <Textarea placeholder="Your Message" className="rounded-xl bg-secondary/50 border-0 text-sm min-h-[100px]" />
            <Button type="submit" className="w-full h-11 rounded-xl text-sm font-semibold">Send Message</Button>
          </motion.form>
        </div>
      </div>
      <AppDownloadModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
};

export default ContactPage;
