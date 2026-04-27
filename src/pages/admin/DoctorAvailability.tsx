import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface Doctor {
  id: number;
  name: string;
  department: string;
  days: string;
  timeSlot: string;
  onLeave: boolean;
}

const initialDoctors: Doctor[] = [
  { id: 1, name: "Dr. Anil Kumar", department: "Cardiology", days: "Mon-Fri", timeSlot: "9:00 AM - 5:00 PM", onLeave: false },
  { id: 2, name: "Dr. Priya Sharma", department: "Neurology", days: "Mon-Sat", timeSlot: "10:00 AM - 6:00 PM", onLeave: false },
];

const DoctorAvailability = () => {
  const [doctors, setDoctors] = useState(initialDoctors);
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({ title: "Change Request Submitted", description: "Your changes are pending admin approval." });
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Doctor Availability</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage doctor schedules and availability</p>
        </div>
        <Button size="sm" className="rounded-xl h-9 text-xs gap-1">
          <Plus className="w-3.5 h-3.5" /> Add Doctor
        </Button>
      </motion.div>

      <div className="mt-6 space-y-4">
        {doctors.map((doc, i) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl border border-border/50 p-5"
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
              <div>
                <label className="text-xs text-muted-foreground">Name</label>
                <p className="text-sm font-medium text-foreground">{doc.name}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Department</label>
                <p className="text-sm text-foreground">{doc.department}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Days</label>
                <p className="text-sm text-foreground">{doc.days}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Time Slot</label>
                <p className="text-sm text-foreground">{doc.timeSlot}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={doc.onLeave}
                    onCheckedChange={(v) => {
                      setDoctors(docs => docs.map(d => d.id === doc.id ? { ...d, onLeave: v } : d));
                    }}
                  />
                  <span className="text-xs text-muted-foreground">On Leave</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <Button onClick={handleSubmit} className="rounded-xl h-10 text-sm font-semibold px-6">
          Submit Change Request
        </Button>
      </div>
    </div>
  );
};

export default DoctorAvailability;
