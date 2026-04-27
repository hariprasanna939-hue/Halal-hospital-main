import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShieldAlert,
    Hospital as HospitalIcon,
    ArrowRightLeft,
    Search,
    CheckCircle2,
    Clock,
    AlertCircle,
    Loader2,
    Calendar,
    Users
} from "lucide-react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const SuperAdminInquiries = () => {
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [hospitals, setHospitals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [assigningId, setAssigningId] = useState<string | null>(null);

    useEffect(() => {
        fetchInquiries();
        fetchHospitals();
    }, []);

    const fetchInquiries = async () => {
        try {
            const data = await api.get("/inquiry/all");
            setInquiries(data);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load inquiries");
        } finally {
            setLoading(false);
        }
    };

    const fetchHospitals = async () => {
        try {
            const data = await api.get("/hospital");
            setHospitals(data);
        } catch (err) {
            console.error(err);
        }
    };

    const assignHospital = async (inquiryId: string, hospitalId: string) => {
        setAssigningId(inquiryId);
        try {
            await api.post(`/inquiry/assign/${inquiryId}`, { hospitalId });
            toast.success("Inquiry assigned successfully!");
            fetchInquiries(); // Reload
        } catch (err) {
            toast.error("Failed to assign hospital");
        } finally {
            setAssigningId(null);
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

    return (
        <div className="p-6 md:p-10 space-y-8 bg-[#F8FAFC]/50 min-h-screen">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                        <ShieldAlert className="w-8 h-8 text-blue-600" />
                        Inquiry Coordination
                    </h1>
                    <p className="text-slate-500 font-medium">As Super Admin, assign patient inquiries to the correct hospitals.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center p-20">
                    <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {inquiries.map((inquiry, idx) => (
                        <motion.div
                            key={inquiry._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white rounded-[32px] border border-slate-200/50 p-8 shadow-sm flex flex-col lg:flex-row gap-8 items-start lg:items-center"
                        >
                            {/* Patient Info */}
                            <div className="flex-1 min-w-[300px]">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
                                        {inquiry.patientName.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900">{inquiry.patientName}</h3>
                                        <p className="text-xs font-bold text-slate-400 uppercase">{inquiry.treatmentInterest || "General Inquiry"}</p>
                                    </div>
                                    <Badge className={cn("ml-auto lg:ml-0 rounded-full", getStatusColor(inquiry.status))}>
                                        {inquiry.status}
                                    </Badge>
                                </div>
                                <div className="bg-slate-50 rounded-2xl p-4 text-sm text-slate-600 italic">
                                    "{inquiry.message}"
                                </div>
                                <div className="flex items-center gap-4 mt-4 text-[10px] font-bold text-slate-400 uppercase">
                                    <div className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(inquiry.createdAt).toLocaleDateString()}</div>
                                    <div className="flex items-center gap-1"><HospitalIcon className="w-3 h-3" /> Source: {inquiry.sourceHospitalId?.name || "Global Search"}</div>
                                </div>
                            </div>

                            {/* Assignment Logic */}
                            <div className="w-full lg:w-[400px] bg-blue-50/50 rounded-3xl p-6 border border-blue-100 flex flex-col gap-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <ArrowRightLeft className="w-4 h-4 text-blue-600" />
                                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Assign Specialist Hospital</span>
                                </div>

                                {inquiry.hospitalId ? (
                                    <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-blue-200">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase">Status</p>
                                                <p className="font-black text-slate-900">{inquiry.hospitalId.name}</p>
                                            </div>
                                        </div>
                                        <Button variant="ghost" size="sm" onClick={() => setAssigningId(inquiry._id)} className="text-xs font-bold text-blue-600">Change</Button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <Select onValueChange={(val) => assignHospital(inquiry._id, val)}>
                                            <SelectTrigger className="h-12 rounded-xl bg-white border-blue-200">
                                                <SelectValue placeholder="Select target hospital..." />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl border-slate-100 italic">
                                                {hospitals.map(h => (
                                                    <SelectItem key={h._id} value={h._id} className="font-bold">{h.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <p className="text-[10px] text-blue-400 font-medium text-center italic">Hospital will get read-only access to non-sensitive medical request.</p>
                                    </div>
                                )}

                                {assigningId === inquiry._id && inquiry.hospitalId && (
                                    <Select onValueChange={(val) => assignHospital(inquiry._id, val)}>
                                        <SelectTrigger className="h-12 rounded-xl bg-white border-blue-200">
                                            <SelectValue placeholder="Re-assign to..." />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-slate-100">
                                            {hospitals.map(h => (
                                                <SelectItem key={h._id} value={h._id}>{h.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SuperAdminInquiries;
