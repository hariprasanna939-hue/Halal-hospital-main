import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare,
    Filter,
    Calendar,
    CheckCircle2,
    Clock,
    AlertCircle,
    ChevronDown,
    Search,
    Loader2
} from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const InquiriesPage = () => {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");

    useEffect(() => {
        fetchInquiries();
    }, []);

    const fetchInquiries = async () => {
        try {
            const hospitalId = localStorage.getItem("hospitalId");
            if (!hospitalId) return;
            const data = await api.get(`/inquiry/hospital/${hospitalId}`);
            setInquiries(data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load inquiries");
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            await api.patch(`/inquiry/${id}/status`, { status: newStatus });
            toast.success(`Status updated to ${newStatus}`);
            // Optimistic update
            setInquiries(prev => prev.map(inv => inv._id === id ? { ...inv, status: newStatus } : inv));
        } catch (err) {
            toast.error("Failed to update status");
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "new": return <AlertCircle className="w-4 h-4" />;
            case "in-progress": return <Clock className="w-4 h-4" />;
            case "resolved": return <CheckCircle2 className="w-4 h-4" />;
            default: return null;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "new": return "bg-blue-50 text-blue-600 border-blue-200";
            case "in-progress": return "bg-amber-50 text-amber-600 border-amber-200";
            case "resolved": return "bg-emerald-50 text-emerald-600 border-emerald-200";
            default: return "bg-slate-50 text-slate-600";
        }
    };

    const filteredInquiries = inquiries.filter(inv => filter === "all" || inv.status === filter);

    return (
        <div className="p-6 md:p-10 space-y-8 bg-[#F8FAFC]/50 min-h-screen">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <MessageSquare className="w-8 h-8 text-blue-600" />
                        Patient Inquiries
                        <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-600 border-blue-100 px-3 py-1 text-xs font-black">
                            {inquiries.length} Total
                        </Badge>
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Manage and respond to patient medical inquiries safely.</p>
                </div>

                <div className="flex items-center gap-3">
                    <Select value={filter} onValueChange={setFilter}>
                        <SelectTrigger className="w-[180px] h-11 rounded-xl bg-white border-slate-200 shadow-sm font-bold">
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-slate-400" />
                                <SelectValue placeholder="Filter Status" />
                            </div>
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                            <SelectItem value="all">All Inquiries</SelectItem>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex flex-col items-center justify-center p-20 gap-4">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Loading Inquiries...</p>
                </div>
            ) : filteredInquiries.length === 0 ? (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] p-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <MessageSquare className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">No inquiries found</h3>
                    <p className="text-slate-500 mt-2">When patients contact your hospital, they will appear here.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AnimatePresence mode="popLayout">
                        {filteredInquiries.map((inquiry, idx) => (
                            <motion.div
                                key={inquiry._id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: idx * 0.05 }}
                                className="group relative bg-white rounded-[32px] border border-slate-200/60 p-8 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-blue-200/60 transition-all duration-500"
                            >
                                {/* Header Section */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-900 flex items-center justify-center font-black text-xl border border-slate-100">
                                            {inquiry.patientName.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-slate-900 leading-tight">
                                                {inquiry.patientName}
                                            </h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                                                    {new Date(inquiry.createdAt).toLocaleDateString("en-US", {
                                                        month: "short",
                                                        day: "numeric",
                                                        year: "numeric"
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <Badge className={cn("px-4 py-1.5 rounded-full border shadow-sm font-black text-[10px] uppercase tracking-widest transition-all duration-500", getStatusColor(inquiry.status))}>
                                        <span className="flex items-center gap-1.5">
                                            {getStatusIcon(inquiry.status)}
                                            {inquiry.status}
                                        </span>
                                    </Badge>
                                </div>

                                {/* Interest Badge */}
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-100 mb-6">
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">Interest:</span>
                                    <span className="text-xs font-bold text-blue-900 uppercase">{inquiry.treatmentInterest || "General Medical"}</span>
                                </div>

                                {/* Message Content */}
                                <div className="bg-slate-50/50 rounded-2xl p-6 mb-6 border border-slate-100/50">
                                    <p className="text-slate-700 font-medium leading-relaxed">
                                        "{inquiry.message}"
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Mark Status:</span>
                                        <div className="flex gap-1.5">
                                            {["in-progress", "resolved"].map(s => (
                                                <button
                                                    key={s}
                                                    onClick={() => updateStatus(inquiry._id, s)}
                                                    disabled={inquiry.status === s}
                                                    className={cn(
                                                        "px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-300",
                                                        inquiry.status === s
                                                            ? "bg-slate-100 text-slate-400 cursor-default"
                                                            : "bg-white border border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600"
                                                    )}
                                                >
                                                    {s.replace("-", " ")}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="text-[10px] font-bold text-slate-300 uppercase tracking-tighter">
                                        Ref: {inquiry._id.slice(-8).toUpperCase()}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
};

export default InquiriesPage;
