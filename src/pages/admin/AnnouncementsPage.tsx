import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AnnouncementsPage = () => {
  const { toast } = useToast();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    toast({ title: "Change Request Submitted", description: "Announcement is pending approval." });
    setTitle("");
    setMessage("");
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground">Announcements</h1>
        <p className="text-sm text-muted-foreground mt-1">Create announcements for patients</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mt-8 max-w-2xl space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Title</label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Announcement title" className="h-10 rounded-xl bg-secondary/50 border-0 text-sm" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
          <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Write your announcement..." className="rounded-xl bg-secondary/50 border-0 text-sm min-h-[120px]" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Start Date</label>
            <Input type="date" className="h-10 rounded-xl bg-secondary/50 border-0 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">End Date</label>
            <Input type="date" className="h-10 rounded-xl bg-secondary/50 border-0 text-sm" />
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSubmit} className="rounded-xl h-10 text-sm font-semibold px-6">
            Submit Change Request
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default AnnouncementsPage;
