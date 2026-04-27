import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, ShieldCheck, X, Image as ImageIcon, Zap, Phone, Mail, MapPin, ListPlus, Crop } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { api } from "@/lib/api";
import Cropper from 'react-easy-crop';
import getCroppedImg from '@/lib/cropImage';

const HospitalProfilePage = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [services, setServices] = useState<string[]>([]);
  const [newService, setNewService] = useState("");
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [hospitalId, setHospitalId] = useState<string | null>(null);

  // States for Image Upload & Cropping
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isCropModalOpen, setIsCropModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const id = typeof window !== "undefined" ? localStorage.getItem("hospitalId") : null;
    setHospitalId(id);

    const fetchHospital = async () => {
      if (!id) return;
      try {
        const response = await api.get(`/hospitals/${id}`);
        const hospitalData = response.data?.hospital || response.hospital;
        setName(hospitalData?.name || "");
        setDescription(hospitalData?.description || "");
        setServices(hospitalData?.services || []);
        setContactInfo(hospitalData?.contactInfo || { phone: "", email: "", address: "" });
        if (hospitalData?.bannerImage) {
          setPreviewUrl(hospitalData.bannerImage);
        }
      } catch (err) {
        console.error("Error fetching hospital data", err);
      }
    };

    fetchHospital();
  }, []);

  // Handle File Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB Limit
        toast.error("File is too large. Max limit is 5MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImageToCrop(reader.result as string);
        setIsCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_: any, clippedAreaPixels: any) => {
    setCroppedAreaPixels(clippedAreaPixels);
  }, []);

  const handleApplyCrop = async () => {
    try {
      if (!imageToCrop || !croppedAreaPixels) return;

      const croppedImageBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
      if (croppedImageBlob) {
        const croppedFile = new File([croppedImageBlob], "banner.jpg", { type: "image/jpeg" });
        setSelectedFile(croppedFile);
        setPreviewUrl(URL.createObjectURL(croppedImageBlob));
        setIsCropModalOpen(false);
        setImageToCrop(null);
        toast.success("Image adjusted successfully!");
      }
    } catch (e) {
      console.error(e);
      toast.error("Failed to crop image");
    }
  };

  const removeSelectedFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const addService = () => {
    if (newService.trim()) {
      setServices([...services, newService.trim()]);
      setNewService("");
    }
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  // Submit Direct Update
  const handleSaveProfile = async () => {
    if (!hospitalId) {
      toast.error("Hospital session not found. Please log in again.");
      return;
    }

    setLoading(true);
    let infoSuccess = false;
    try {
      // 1. Update Profile Info
      console.log("Updating profile info...");
      await api.put("/admin/hospital", {
        name,
        description,
        services,
        contactInfo
      });
      infoSuccess = true;
      console.log("Profile info updated successfully.");

      // 2. Update Banner if selected
      if (selectedFile) {
        console.log("Uploading banner...");
        const formData = new FormData();
        formData.append("banner", selectedFile);

        try {
          // Using the new robust upload endpoint
          const uploadRes = await api.postFormData("/hospitals/upload", formData);

          if (uploadRes.imageUrl) {
            setPreviewUrl(uploadRes.imageUrl);
            console.log("Banner uploaded successfully:", uploadRes.imageUrl);
          }
          setSelectedFile(null);
        } catch (uploadErr: any) {
          console.error("Banner Upload Error:", uploadErr);
          toast.error(`Profile info saved, but banner upload failed: ${uploadErr.message}`);
          // Don't throw here so infoSuccess remains true
        }
      }

      if (infoSuccess) {
        toast.success("Hospital profile updated successfully!");
      }
    } catch (err: any) {
      console.error("Full Profile Update Error:", err);
      toast.error(err.message || "Request failed. Please check your internet connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 font-sans selection:bg-blue-500/20">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border border-teal-100">
            <Zap className="w-3 h-3 fill-teal-600" /> Live Mode
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Hospital Settings</h1>
        <div className="flex items-center justify-between mt-1">
          <p className="text-slate-500 font-medium">Update your hospital&apos;s public details instantly</p>
          <Button
            variant="outline"
            onClick={() => window.open("/admin/preview", "_blank")}
            className="rounded-full border-blue-100 text-blue-600 hover:bg-blue-50 font-bold h-9 px-4 gap-2"
          >
            <ImageIcon className="w-4 h-4" /> View Live Preview
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-8">
        {/* Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-blue-600" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Hospital Banner</h3>
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />

          {!previewUrl ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 rounded-[24px] h-48 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-slate-50 hover:border-blue-200 transition-all group relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                <Upload className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
              </div>
              <p className="text-sm font-semibold text-slate-500 group-hover:text-blue-600 transition-colors">Click to select new banner</p>
            </div>
          ) : (
            <div className="relative rounded-[24px] overflow-hidden h-48 border border-slate-100 group">
              <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-sm">
                <Button onClick={() => fileInputRef.current?.click()} className="bg-white text-slate-900 hover:bg-slate-100 rounded-full font-bold px-6 border-0">
                  Replace Image
                </Button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Basic Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
              <Zap className="w-5 h-5 text-indigo-600" strokeWidth={2.5} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Basic Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-500 mb-2 block ml-1">Hospital Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Hospital Name"
                className="rounded-2xl border-slate-100 bg-slate-50/50 h-12 px-5"
              />
            </div>
            <div>
              <label className="text-sm font-bold text-slate-500 mb-2 block ml-1">Description</label>
              <Textarea
                placeholder="Introduce your hospital..."
                className="rounded-[20px] bg-slate-50/50 border-slate-100 text-[15px] min-h-[120px] p-5 focus-visible:ring-4 focus-visible:ring-blue-500/10 font-medium text-slate-700 transition-all"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </motion.div>

        {/* Services & Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <ListPlus className="w-5 h-5 text-amber-600" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Services</h3>
            </div>

            <div className="flex gap-2 mb-6">
              <Input
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                placeholder="Add customized service..."
                className="rounded-xl border-slate-100 bg-slate-50/50 h-10"
                onKeyPress={(e) => e.key === 'Enter' && addService()}
              />
              <Button onClick={addService} size="icon" className="rounded-xl bg-amber-600 hover:bg-amber-700 shrink-0">
                <ListPlus className="w-4 h-4" />
              </Button>
            </div>

            {/* Quick Add Recommendations */}
            <div className="mb-6">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Quick Add Recommendations</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Plastic Surgery", "Organ Transplant", "IVF Treatment", "General Checkup", "Dental Implants"
                ].filter(s => !services.includes(s)).map((s) => (
                  <button
                    key={s}
                    onClick={() => setServices([...services, s])}
                    className="px-3 py-1.5 rounded-xl bg-white border border-slate-100 text-[11px] font-bold text-slate-500 hover:border-amber-200 hover:text-amber-600 hover:bg-amber-50 transition-all shadow-sm"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto pr-2">
              <AnimatePresence>
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100 group"
                  >
                    {service}
                    <button onClick={() => removeService(index)} className="hover:text-red-600 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/70 backdrop-blur-xl rounded-[32px] p-8 border border-white shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                <Phone className="w-5 h-5 text-rose-600" strokeWidth={2.5} />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Contact Details</h3>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <Input
                  value={contactInfo.phone}
                  onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                  placeholder="Phone Number"
                  className="rounded-xl border-slate-100 bg-slate-50/50 h-11 pl-11"
                />
              </div>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <Input
                  value={contactInfo.email}
                  onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                  placeholder="Email Address"
                  className="rounded-xl border-slate-100 bg-slate-50/50 h-11 pl-11"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <Input
                  value={contactInfo.address}
                  onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                  placeholder="Street Address"
                  className="rounded-xl border-slate-100 bg-slate-50/50 h-11 pl-11"
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-end"
        >
          <Button
            onClick={handleSaveProfile}
            disabled={loading}
            className="w-full sm:w-auto rounded-full h-14 bg-[#0A0D14] hover:bg-slate-800 text-white font-bold px-16 shadow-2xl shadow-black/20 transition-all active:scale-95 text-lg"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Updating Sync...
              </span>
            ) : "Save & Go Live"}
          </Button>
        </motion.div>

        {/* Live Status indicator */}
        <div className="bg-blue-600/5 border border-blue-600/10 rounded-[24px] p-6 flex gap-4">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h4 className="font-bold text-blue-900 text-sm">Real-Time Sync Active</h4>
            <p className="text-xs text-blue-700/80 leading-relaxed mt-1 font-medium italic">
              All changes are broadcasted immediately to all patients. No approval required.
            </p>
          </div>
        </div>
      </div>

      {/* Crop Modal */}
      <Dialog open={isCropModalOpen} onOpenChange={setIsCropModalOpen}>
        <DialogContent className="max-w-2xl bg-white rounded-[32px] p-0 overflow-hidden border-0 shadow-2xl">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Crop className="w-5 h-5 text-blue-600" />
              Adjust Banner Layout
            </DialogTitle>
          </DialogHeader>

          <div className="relative h-[400px] w-full bg-slate-100 mt-4">
            {imageToCrop && (
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={21 / 9} // Typical banner ratio
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>

          <div className="p-6 bg-slate-50/50 backdrop-blur-sm">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Zoom Level</span>
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">{Math.round(zoom * 100)}%</span>
              </div>
              <Slider
                value={[zoom]}
                min={1}
                max={3}
                step={0.1}
                onValueChange={(vals) => setZoom(vals[0])}
                className="w-full"
              />
            </div>

            <DialogFooter className="mt-8 flex gap-3">
              <Button
                variant="ghost"
                onClick={() => setIsCropModalOpen(false)}
                className="rounded-full font-bold text-slate-500 hover:text-slate-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleApplyCrop}
                className="rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 shadow-xl shadow-blue-500/20"
              >
                Apply Changes
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HospitalProfilePage;