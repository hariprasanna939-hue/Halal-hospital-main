import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Search, MapPin, Calendar, Mail, Phone, Filter, MoreVertical, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "sonner";

const PatientOverview = () => {
    const [patients, setPatients] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchPatients = async () => {
            try {
                const data = await api.get("/patient");
                setPatients(data);
            } catch (err) {
                toast.error("Failed to load patient records");
            } finally {
                setLoading(false);
            }
        };
        fetchPatients();
    }, []);

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.email.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-[1400px] mx-auto py-8 px-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Patient Overview</h1>
                    <p className="text-slate-500 mt-1.5 font-medium">Manage and monitor all registered patients</p>
                </motion.div>

                <div className="flex items-center gap-3">
                    <Button variant="outline" className="rounded-2xl h-12 border-slate-200 text-slate-600 font-bold px-5">
                        <Filter className="w-4 h-4 mr-2" /> Filters
                    </Button>
                    <Button className="rounded-2xl h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 shadow-lg shadow-blue-500/20">
                        <Plus className="w-4 h-4 mr-2" /> Add Patient
                    </Button>
                </div>
            </div>

            {/* Search Bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative mb-8"
            >
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                    placeholder="Search patients by name, email, or ID..."
                    className="h-14 bg-white border-slate-100 rounded-[24px] pl-14 text-[16px] shadow-sm focus-visible:ring-blue-500/20"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </motion.div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <div key={i} className="h-64 rounded-[32px] bg-slate-100 animate-pulse" />
                    ))}
                </div>
            ) : filteredPatients.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPatients.map((patient, i) => (
                        <motion.div
                            key={patient._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-white border border-slate-100 rounded-[32px] p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                                    <User className="w-7 h-7 text-blue-600" />
                                </div>
                                <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                                    <MoreVertical className="w-5 h-5" />
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                                {patient.name}
                            </h3>
                            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium mb-6">
                                <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] uppercase tracking-wider">
                                    Patient
                                </span>
                                <span className="w-1 h-1 rounded-full bg-slate-300" />
                                <span>Joined {new Date(patient.createdAt).toLocaleDateString()}</span>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-50">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Mail className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-medium">{patient.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Phone className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-medium">{patient.phone || "No phone provided"}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <span className="text-sm font-medium">DOB: {patient.dob ? new Date(patient.dob).toLocaleDateString() : "Not specified"}</span>
                                </div>
                            </div>

                            <Button className="w-full mt-8 h-12 rounded-2xl bg-slate-50 hover:bg-blue-50 text-slate-900 group-hover:text-blue-600 font-bold transition-all border-0">
                                View Medical History
                            </Button>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="bg-white rounded-[40px] border border-slate-100 p-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">No patients found</h3>
                    <p className="text-slate-500 mt-2">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
};

export default PatientOverview;
