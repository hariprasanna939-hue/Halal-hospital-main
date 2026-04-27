import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const initialDepts = [
  { id: 1, name: "Cardiology", days: "Mon-Sat", open: "8:00 AM", close: "8:00 PM" },
  { id: 2, name: "Neurology", days: "Mon-Fri", open: "9:00 AM", close: "6:00 PM" },
  { id: 3, name: "Orthopedics", days: "Mon-Sat", open: "8:30 AM", close: "7:00 PM" },
];

const DepartmentsPage = () => {
  const [depts] = useState(initialDepts);
  const { toast } = useToast();

  const handleSubmit = () => {
    toast({ title: "Change Request Submitted", description: "Department changes are pending approval." });
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Departments</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage department schedules</p>
        </div>
        <Button size="sm" className="rounded-xl h-9 text-xs gap-1">
          <Plus className="w-3.5 h-3.5" /> Add Department
        </Button>
      </motion.div>

      <div className="mt-6 space-y-4">
        {depts.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-card rounded-2xl border border-border/50 p-5 grid sm:grid-cols-4 gap-4 items-center"
          >
            <div>
              <label className="text-xs text-muted-foreground">Department</label>
              <p className="text-sm font-medium text-foreground">{d.name}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Operating Days</label>
              <p className="text-sm text-foreground">{d.days}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Opening</label>
              <p className="text-sm text-foreground">{d.open}</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Closing</label>
              <p className="text-sm text-foreground">{d.close}</p>
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

export default DepartmentsPage;
