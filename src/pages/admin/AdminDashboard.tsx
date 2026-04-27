import { motion } from "framer-motion";
import { Clock, CheckCircle2, AlertCircle, Bell } from "lucide-react";

const stats = [
  { icon: Clock, label: "Pending Approvals", value: "3", color: "text-amber-500 bg-amber-50" },
  { icon: CheckCircle2, label: "Last Approved", value: "Apr 12", color: "text-accent bg-accent/10" },
  { icon: Bell, label: "Platform Notices", value: "2", color: "text-primary bg-primary/10" },
];

const notices = [
  { title: "Profile update approved", time: "2 hours ago", type: "success" },
  { title: "Department hours change pending", time: "5 hours ago", type: "pending" },
  { title: "System maintenance scheduled", time: "1 day ago", type: "info" },
];

const AdminDashboard = () => (
  <div>
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
      <p className="text-sm text-muted-foreground mt-1">Welcome back, Hospital Admin</p>
    </motion.div>

    <div className="grid sm:grid-cols-3 gap-5 mt-8">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="bg-card rounded-2xl border border-border/50 p-5"
        >
          <div className={`w-10 h-10 rounded-xl ${s.color} flex items-center justify-center mb-3`}>
            <s.icon className="w-5 h-5" />
          </div>
          <div className="text-2xl font-bold text-foreground">{s.value}</div>
          <div className="text-xs text-muted-foreground mt-0.5">{s.label}</div>
        </motion.div>
      ))}
    </div>

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-8">
      <h2 className="text-sm font-semibold text-foreground mb-4">Recent Activity</h2>
      <div className="space-y-3">
        {notices.map((n, i) => (
          <div key={i} className="bg-card rounded-xl border border-border/50 p-4 flex items-center gap-3">
            <div className={`w-2 h-2 rounded-full shrink-0 ${n.type === "success" ? "bg-accent" : n.type === "pending" ? "bg-amber-400" : "bg-primary"}`} />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{n.title}</p>
              <p className="text-xs text-muted-foreground">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

export default AdminDashboard;
