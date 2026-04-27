import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Upload, X, FileText } from "lucide-react";
import AppDownloadModal from "./AppDownloadModal";
import { api } from "@/lib/api";
import { toast } from "sonner";

const MedicalInquiryForm = ({ hospitalName }: { hospitalName?: string }) => {
  const [showModal, setShowModal] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<any>({ hospitalName: hospitalName || "" });
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchPatientData = async () => {
      const role = localStorage.getItem("role");
      if (role === "patient") {
        try {
          const data = await api.get("/patient/profile");
          if (data) {
            let age = "";
            if (data.dob) {
              const birthDate = new Date(data.dob);
              const today = new Date();
              age = (today.getFullYear() - birthDate.getFullYear()).toString();
            }

            setForm({
              ...form,
              patientName: data.fullName || "",
              gender: data.gender?.toLowerCase() || "",
              age: age,
              country: data.country || "",
              city: data.city || "",
              phone: data.mobileNumber || "",
              email: data.email || ""
            });
          }
        } catch (err) {
          console.error("Failed to pre-fill inquiry form", err);
        }
      }
    };
    fetchPatientData();
  }, [hospitalName]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      toast.error("Please agree to the data sharing policy");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      Object.keys(form).forEach(key => formData.append(key, form[key]));
      files.forEach(file => formData.append("reports", file));

      await api.postFormData("/inquiry", formData);
      toast.success("Inquiry submitted successfully!");
      setShowModal(true);
      // Reset form
      setForm({ hospitalName: hospitalName || "" });
      setFiles([]);
      setAgreed(false);
    } catch (err) {
      toast.error("Failed to submit inquiry. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fieldClass = "h-10 rounded-xl bg-secondary/50 border-0 text-sm";
  const labelClass = "text-xs font-medium text-foreground mb-1 block";

  return (
    <>
      <motion.form
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        onSubmit={handleSubmit}
        className="glass-card-strong rounded-3xl p-6 space-y-4 max-h-[80vh] overflow-y-auto custom-scrollbar"
      >
        <h3 className="text-lg font-bold text-foreground">Medical Inquiry</h3>
        {hospitalName && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-blue-50 border border-blue-100 mb-2">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Targeting:</span>
            <span className="text-[11px] font-bold text-blue-900">{hospitalName}</span>
          </div>
        )}
        <p className="text-xs text-muted-foreground">Get a personalized treatment plan</p>

        {/* Patient Info */}
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className={labelClass}>Full Name</label>
            <Input
              placeholder="Patient name"
              className={fieldClass}
              value={form.patientName || ""}
              onChange={e => setForm({ ...form, patientName: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Gender</label>
            <Select onValueChange={v => setForm({ ...form, gender: v })} value={form.gender}>
              <SelectTrigger className={fieldClass}><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className={labelClass}>Age</label>
            <Input
              type="number"
              placeholder="Age"
              className={fieldClass}
              value={form.age || ""}
              onChange={e => setForm({ ...form, age: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Country</label>
            <Input
              placeholder="Country"
              className={fieldClass}
              value={form.country || ""}
              onChange={e => setForm({ ...form, country: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>City</label>
            <Input
              placeholder="City"
              className={fieldClass}
              value={form.city || ""}
              onChange={e => setForm({ ...form, city: e.target.value })}
            />
          </div>
          <div>
            <label className={labelClass}>Mobile</label>
            <Input
              type="tel"
              placeholder="+91"
              className={fieldClass}
              value={form.phone || ""}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <Input
              type="email"
              placeholder="Email"
              className={fieldClass}
              value={form.email || ""}
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
        </div>

        {/* Medical Details */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-semibold text-foreground">Medical Details</h4>
          <Textarea
            placeholder="Primary Medical Condition"
            className="rounded-xl bg-secondary/50 border-0 text-sm min-h-[60px]"
            value={form.condition || ""}
            onChange={e => setForm({ ...form, condition: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Diagnosis</label>
              <Input
                placeholder="If known"
                className={fieldClass}
                value={form.diagnosis || ""}
                onChange={e => setForm({ ...form, diagnosis: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClass}>Duration</label>
              <Input
                placeholder="e.g. 6 months"
                className={fieldClass}
                value={form.duration || ""}
                onChange={e => setForm({ ...form, duration: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Treatment */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-semibold text-foreground">Treatment Requirements</h4>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={labelClass}>Treatment Type</label>
              <Select onValueChange={v => setForm({ ...form, treatmentType: v })} value={form.treatmentType}>
                <SelectTrigger className={fieldClass}><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="surgery">Surgery</SelectItem>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="therapy">Therapy</SelectItem>
                  <SelectItem value="diagnostics">Diagnostics</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className={labelClass}>Specialty</label>
              <Select onValueChange={v => setForm({ ...form, specialty: v })} value={form.specialty}>
                <SelectTrigger className={fieldClass}><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="cardiology">Cardiology</SelectItem>
                  <SelectItem value="oncology">Oncology</SelectItem>
                  <SelectItem value="orthopedics">Orthopedics</SelectItem>
                  <SelectItem value="neurology">Neurology</SelectItem>
                  <SelectItem value="gastro">Gastroenterology</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Upload */}
        <div className="pt-2">
          <label className={labelClass}>Upload Medical Reports</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-primary/20 hover:border-primary/40 rounded-xl p-4 text-center cursor-pointer transition-colors bg-primary/5"
          >
            <Upload className="w-5 h-5 text-primary mx-auto mb-1" />
            <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Drag & drop or click</p>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
          </div>

          {/* File Preview */}
          {files.length > 0 && (
            <div className="mt-3 space-y-2">
              {files.map((file, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-secondary/50 rounded-lg group">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <FileText className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-xs text-foreground truncate">{file.name}</span>
                  </div>
                  <button type="button" onClick={(e) => { e.stopPropagation(); removeFile(idx); }} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Consent */}
        <div className="flex items-start gap-2 pt-2">
          <Checkbox id="consent" checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} className="mt-0.5" />
          <label htmlFor="consent" className="text-xs text-muted-foreground leading-relaxed">
            I agree to share my medical data for consultation purposes
          </label>
        </div>

        <Button type="submit" disabled={loading} className="w-full h-11 rounded-xl text-sm font-semibold">
          {loading ? "Submitting..." : "Submit Inquiry"}
        </Button>
      </motion.form>

      <AppDownloadModal open={showModal} onClose={() => setShowModal(false)} />
    </>
  );
};

export default MedicalInquiryForm;
