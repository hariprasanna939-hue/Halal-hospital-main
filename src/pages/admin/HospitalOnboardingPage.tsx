import React, { useState, useEffect } from "react";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import {
    Check,
    ChevronRight,
    ChevronLeft,
    AlertCircle,
    Shield,
    Stethoscope,
    Lock,
    Scale,
    MessageSquare,
    Activity,
    FileText,
    DollarSign,
    Heart,
    Calendar as CalendarIcon,
    Search,
    Users,
    Building2,
    Clock,
    BookOpen,
    Loader2
} from "lucide-react";

import { completeOnboarding, getHospitalDetails } from "@/lib/hospitals";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";


const TREATMENT_AREAS = [
    "Cardiology", "Angiology", "Orthopedics", "Neurology", "Oncology",
    "Dental", "Pediatrics", "Gynecology", "Dermatology", "General Surgery"
];

const baseSchema = z.object({
    // 0. Basic Information
    name: z.string().min(3, "Hospital name must be at least 3 characters").max(100),
    country: z.string().min(1, "Country is required"),
    state: z.string().min(1, "State is required"),
    city: z.string().min(1, "City is required"),
    address1: z.string().min(5, "Address is required"),
    address2: z.string().optional(),
    pocName: z.string().min(2, "Contact name is required"),
    contactNumber: z.string().regex(/^\+\d{1,3}\s\d{7,12}$/, "Format: +91 9999999999"),
    contactEmail: z.string().email("Invalid email address"),
    treatmentAreas: z.array(z.string()).min(1, "Select at least one area of treatment"),
    doctors: z.array(z.object({
        name: z.string().min(2, "Doctor name is required"),
        expertise: z.string().min(1, "Expertise is required")
    })).optional(),

    // 1. Licensing
    accreditations: z.array(z.string()).min(1, "Please select at least one accreditation"),
    physicianLicensing: z.enum(["yes", "no"], { required_error: "Selection required" }),

    // 2. Privacy
    dpaCompliance: z.string().min(1, "Selection is required"),

    // 3. Insurance
    liabilityInsurance: z.enum(["yes", "no"], { required_error: "Selection required" }),
    arbitrationClause: z.enum(["yes", "no"], { required_error: "Selection required" }),

    // 4. Consent
    consentLanguage: z.enum(["yes", "no"], { required_error: "Selection required" }),
    tourismConsent: z.enum(["yes", "no"], { required_error: "Selection required" }),
    travelRiskDisclosure: z.enum(["yes", "no"], { required_error: "Selection required" }),

    // 5. Marketing
    outcomeGuarantees: z.enum(["yes", "no"], { required_error: "Selection required" }),
    marketingCompliance: z.enum(["yes", "no"], { required_error: "Selection required" }),
    financialRelationship: z.enum(["yes", "no"], { required_error: "Selection required" }),
    financialRelationshipDetails: z.string().optional(),

    // 6. Emergency
    emergencyProtocol: z.string().min(10, "Please provide at least 10 characters of detail"),
    dischargeSummary: z.enum(["yes", "no"], { required_error: "Selection required" }),
    adverseEventProcess: z.string().min(10, "Please provide at least 10 characters of detail"),

    // 7. Regulatory
    adverseEventReporting: z.enum(["yes", "no"], { required_error: "Selection required" }),
    disciplinaryActions: z.enum(["yes", "no"], { required_error: "Selection required" }),
    disciplinaryDetails: z.string().optional(),

    // 8. Financial
    pricingEstimates: z.enum(["yes", "no"], { required_error: "Selection required" }),
    refundPolicy: z.enum(["yes", "no"], { required_error: "Selection required" }),

    // 9. Halal
    halalCertification: z.enum(["yes", "no"], { required_error: "Selection required" }),
    certificateNumber: z.string().optional(),
    expiryDate: z.date().optional(),
    halalFoodKitchen: z.enum(["yes", "no"], { required_error: "Selection required" }),
    crossContaminationProcess: z.string().min(10, "Please provide detail"),
    specialDietaryMenus: z.enum(["yes", "no"], { required_error: "Selection required" }),
    prayerRooms: z.enum(["yes", "no"], { required_error: "Selection required" }),
    qiblaMarking: z.enum(["yes", "no"], { required_error: "Selection required" }),
    prayerTimetables: z.enum(["yes", "no"], { required_error: "Selection required" }),
    sameGenderCare: z.enum(["yes", "no"], { required_error: "Selection required" }),
    genderSegregatedWaiting: z.enum(["yes", "no"], { required_error: "Selection required" }),
    hijabAccommodation: z.string().min(10, "Please provide detail"),
    shariahTissueHandling: z.string().min(10, "Please provide detail"),
    bloodTransfusionPolicy: z.enum(["yes", "no"], { required_error: "Selection required" }),
    staffTraining: z.enum(["yes", "no"], { required_error: "Selection required" }),
    halalLiaison: z.enum(["yes", "no"], { required_error: "Selection required" }),
    rightsCharter: z.enum(["yes", "no"], { required_error: "Selection required" }),
    multilingualForms: z.enum(["yes", "no"], { required_error: "Selection required" }),
    annualAudits: z.enum(["yes", "no"], { required_error: "Selection required" }),
});

const onboardingSchema = baseSchema.superRefine((data, ctx) => {
    if (data.halalCertification === "yes") {
        if (!data.certificateNumber || data.certificateNumber.trim() === "") {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Certificate number is required for Halal certification",
                path: ["certificateNumber"]
            });
        }
        if (!data.expiryDate) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Expiry date is required for Halal certification",
                path: ["expiryDate"]
            });
        }
    }
});

type OnboardingValues = z.infer<typeof baseSchema>;

const STEPS = [
    { id: "basic", title: "Basic Info", description: "General hospital details", icon: Building2 },
    { id: "licensing", title: "Licensing", description: "Accreditation & Staff", icon: Shield },
    { id: "privacy", title: "Privacy", description: "Data protection rules", icon: Lock },
    { id: "insurance", title: "Insurance", description: "Liability & Global care", icon: DollarSign },
    { id: "consent", title: "Consent", description: "Patient rights & Travel", icon: FileText },
    { id: "marketing", title: "Marketing", description: "Transparency & Standards", icon: Search },
    { id: "care", title: "Care", description: "Continuity of care", icon: Stethoscope },
    { id: "regulatory", title: "Regulatory", description: "Compliance reporting", icon: Scale },
    { id: "financial", title: "Financial", description: "Pricing & Billing", icon: Activity },
    { id: "halal", title: "Halal", description: "Shariah compliance", icon: Heart },
];

const ACCREDITATION_OPTIONS = [
    { id: "nabh", label: "NABH (National Accreditation Board for Hospitals)" },
    { id: "jci", label: "JCI (Joint Commission International)" },
    { id: "iso", label: "ISO 9001:2015" },
    { id: "nquery", label: "NQUERY" },
    { id: "other", label: "Other International Standards" }
];

const HospitalOnboardingPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [hospitalStatus, setHospitalStatus] = useState<string | null>(null);

    const form = useForm<OnboardingValues>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            name: "",
            country: "",
            state: "",
            city: "",
            address1: "",
            address2: "",
            pocName: "",
            contactNumber: "+91 ",
            contactEmail: "",
            treatmentAreas: [],
            doctors: [{ name: "", expertise: "" }],
            accreditations: [],
            physicianLicensing: "no",
            dpaCompliance: "none",
            liabilityInsurance: "no",
            arbitrationClause: "no",
            consentLanguage: "no",
            tourismConsent: "no",
            travelRiskDisclosure: "no",
            outcomeGuarantees: "no",
            marketingCompliance: "no",
            financialRelationship: "no",
            financialRelationshipDetails: "",
            emergencyProtocol: "",
            dischargeSummary: "no",
            adverseEventProcess: "",
            adverseEventReporting: "no",
            disciplinaryActions: "no",
            disciplinaryDetails: "",
            pricingEstimates: "no",
            refundPolicy: "no",
            halalCertification: "no",
            certificateNumber: "",
            expiryDate: undefined,
            halalFoodKitchen: "no",
            crossContaminationProcess: "",
            specialDietaryMenus: "no",
            prayerRooms: "no",
            qiblaMarking: "no",
            prayerTimetables: "no",
            sameGenderCare: "no",
            genderSegregatedWaiting: "no",
            hijabAccommodation: "",
            shariahTissueHandling: "",
            bloodTransfusionPolicy: "no",
            staffTraining: "no",
            halalLiaison: "no",
            rightsCharter: "no",
            multilingualForms: "no",
            annualAudits: "no",
        },
        mode: "onTouched",
    });

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "doctors"
    });

    useEffect(() => {
        const loadData = async () => {
            const hospitalId = localStorage.getItem("hospitalId");
            if (hospitalId) {
                try {
                    const data = await getHospitalDetails(hospitalId);
                    if (data.hospital) {
                        setHospitalStatus(data.hospital.onboardingStatus);
                        const existingData = { ...data.hospital };

                        if (existingData.expiryDate) {
                            existingData.expiryDate = new Date(existingData.expiryDate);
                        }

                        const fetchedValues: any = {};
                        Object.keys(baseSchema.shape).forEach(key => {
                            if (existingData[key] !== null && existingData[key] !== undefined) {
                                fetchedValues[key] = existingData[key];
                            }
                        });

                        const finalValues = {
                            ...form.getValues(),
                            ...fetchedValues,
                            pocName: existingData.contactInfo?.pocName || "",
                            contactNumber: existingData.contactInfo?.phone || "",
                            contactEmail: existingData.contactInfo?.email || "",
                            address1: existingData.address1 || existingData.contactInfo?.address || "",
                        };

                        form.reset(finalValues);
                    }
                } catch (error) {
                    console.error("Failed to load hospital data:", error);
                } finally {
                    setIsLoadingData(false);
                }
            } else {
                setIsLoadingData(false);
            }
        };
        loadData();
    }, [form]);

    const onSubmit = async (data: OnboardingValues) => {
        setIsSubmitting(true);
        try {
            const response = await completeOnboarding(data);
            setIsSubmitted(true);
            toast.success("Successfully saved onboarding data!");
        } catch (error: any) {
            const errorMsg = error.response?.data?.msg || error.message || "Failed to submit onboarding.";
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onError = (errors: any) => {
        toast.error("Please fix missing fields in the current section.");
    };

    const nextStep = async () => {
        const fields = getFieldsForStep(currentStep);
        const isValid = await form.trigger(fields as any);

        if (isValid) {
            if (currentStep < STEPS.length - 1) {
                setCurrentStep(s => s + 1);
                window.scrollTo(0, 0);
            }
        } else {
            toast.warning("Please complete all required fields in this section.");
        }
    };

    const getFieldsForStep = (step: number) => {
        switch (step) {
            case 0: return ["name", "country", "state", "city", "address1", "pocName", "contactNumber", "contactEmail", "treatmentAreas", "doctors"];
            case 1: return ["accreditations", "physicianLicensing"];
            case 2: return ["dpaCompliance"];
            case 3: return ["liabilityInsurance", "arbitrationClause"];
            case 4: return ["consentLanguage", "tourismConsent", "travelRiskDisclosure"];
            case 5: return ["outcomeGuarantees", "marketingCompliance", "financialRelationship", "financialRelationshipDetails"];
            case 6: return ["emergencyProtocol", "dischargeSummary", "adverseEventProcess"];
            case 7: return ["adverseEventReporting", "disciplinaryActions", "disciplinaryDetails"];
            case 8: return ["pricingEstimates", "refundPolicy"];
            case 9: return [
                "halalCertification", "certificateNumber", "expiryDate", "halalFoodKitchen",
                "crossContaminationProcess", "specialDietaryMenus", "prayerRooms", "qiblaMarking",
                "prayerTimetables", "sameGenderCare", "genderSegregatedWaiting", "hijabAccommodation",
                "shariahTissueHandling", "bloodTransfusionPolicy", "staffTraining", "halalLiaison",
                "rightsCharter", "multilingualForms", "annualAudits"
            ];
            default: return [];
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(s => s - 1);
            window.scrollTo(0, 0);
        }
    };

    const progress = ((currentStep + 1) / STEPS.length) * 100;
    const currentStepData = STEPS[currentStep];

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-emerald-50 rounded-full p-6 mb-6">
                    <Check className="w-16 h-16 text-emerald-600" />
                </motion.div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                    {hospitalStatus === "completed" ? "Profile Updated!" : "Onboarding Complete!"}
                </h1>
                <p className="text-slate-600 max-w-md mb-8">
                    {hospitalStatus === "completed"
                        ? "Your compliance profile has been successfully updated."
                        : "Thank you for joining HalalMedi. Your profile is now being reviewed."}
                </p>
                <Button onClick={() => window.location.href = "/admin/dashboard"} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                    Go to Dashboard
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Hospital Compliance Portal</h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">Verify your institution's standards and Halal healthcare readiness.</p>
            </div>

            <div className="mb-12 relative overflow-hidden">
                <div className="flex items-center justify-between mb-4 overflow-x-auto pb-4 no-scrollbar">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;
                        return (
                            <div key={step.id} className={cn("flex flex-col items-center min-w-[80px] transition-all", isActive ? "scale-110" : "opacity-50")}>
                                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2",
                                    isActive ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200" :
                                        isCompleted ? "bg-emerald-100 border-emerald-600 text-emerald-600" : "bg-white border-slate-200 text-slate-400")}>
                                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                </div>
                                <span className={cn("text-[10px] font-bold uppercase tracking-tighter", isActive ? "text-emerald-700" : "text-slate-500")}>{step.title}</span>
                            </div>
                        );
                    })}
                </div>
                <Progress value={progress} className="h-1.5 bg-slate-100" />
            </div>

            <Card className="shadow-2xl border-slate-100 overflow-hidden bg-white/80 backdrop-blur-xl">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit, onError)}>
                        <div className="p-6 md:p-10">
                            <div className="flex gap-3 mb-8">
                                <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
                                    <currentStepData.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">{currentStepData.title}</h2>
                                    <p className="text-slate-500 font-medium">{currentStepData.description}</p>
                                </div>
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-8"
                                >
                                    {/* SECTION 0: BASIC INFO */}
                                    {currentStep === 0 && (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="md:col-span-2">
                                                <FormField control={form.control} name="name" render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-sm font-bold uppercase tracking-widest text-slate-400">Hospital Name</FormLabel>
                                                        <FormControl><Input placeholder="Internal Medical Center" {...field} className="h-12 rounded-xl focus:ring-blue-500" /></FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                            </div>

                                            <FormField control={form.control} name="country" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-bold uppercase tracking-widest text-slate-400">Country</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select Country" /></SelectTrigger></FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="india">India</SelectItem>
                                                            <SelectItem value="uae">United Arab Emirates</SelectItem>
                                                            <SelectItem value="uk">United Kingdom</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />

                                            <FormField control={form.control} name="state" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-bold uppercase tracking-widest text-slate-400">State / Province</FormLabel>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl><SelectTrigger className="h-12 rounded-xl"><SelectValue placeholder="Select State" /></SelectTrigger></FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="dubai">Dubai</SelectItem>
                                                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                                                            <SelectItem value="london">London</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />

                                            <FormField control={form.control} name="city" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-bold uppercase tracking-widest text-slate-400">City</FormLabel>
                                                    <FormControl><Input placeholder="Enter City" {...field} className="h-12 rounded-xl" /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />

                                            <FormField control={form.control} name="pocName" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-bold uppercase tracking-widest text-slate-400">POC Name</FormLabel>
                                                    <FormControl><Input placeholder="John Doe" {...field} className="h-12 rounded-xl" /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />

                                            <FormField control={form.control} name="address1" render={({ field }) => (
                                                <FormItem className="md:col-span-2">
                                                    <FormLabel className="text-sm font-bold uppercase tracking-widest text-slate-400">Address Line 1</FormLabel>
                                                    <FormControl><Input placeholder="St. 45, Healthcare City" {...field} className="h-12 rounded-xl" /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />

                                            <FormField control={form.control} name="contactNumber" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-bold uppercase tracking-widest text-slate-400">Contact Number</FormLabel>
                                                    <FormControl><Input placeholder="+91 9876543210" {...field} className="h-12 rounded-xl" /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />

                                            <FormField control={form.control} name="contactEmail" render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="text-sm font-bold uppercase tracking-widest text-slate-400">Contact Email</FormLabel>
                                                    <FormControl><Input placeholder="contact@hospital.com" {...field} className="h-12 rounded-xl" /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />

                                            <div className="md:col-span-2 space-y-4">
                                                <FormLabel className="text-sm font-bold uppercase tracking-widest text-slate-400">Areas of Treatment</FormLabel>
                                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                                    {TREATMENT_AREAS.map(area => (
                                                        <FormField key={area} control={form.control} name="treatmentAreas" render={({ field }) => (
                                                            <FormItem className="flex items-center space-x-3 space-y-0 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                                                <FormControl>
                                                                    <Checkbox
                                                                        checked={field.value?.includes(area)}
                                                                        onCheckedChange={(checked) => {
                                                                            const current = Array.isArray(field.value) ? field.value : [];
                                                                            return checked ? field.onChange([...current, area]) : field.onChange(current.filter(v => v !== area))
                                                                        }}
                                                                    />
                                                                </FormControl>
                                                                <span className="text-sm font-bold text-slate-700">{area}</span>
                                                            </FormItem>
                                                        )} />
                                                    ))}
                                                </div>
                                            </div>

                                            {/* DYNAMIC DOCTORS SECTION */}
                                            <div className="md:col-span-2 space-y-6 mt-8 pt-8 border-t border-slate-100">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="text-lg font-black text-slate-900">Medical Specialists</h3>
                                                    <Button type="button" variant="outline" size="sm" onClick={() => append({ name: "", expertise: "" })} className="rounded-xl border-blue-200 text-blue-600 font-bold">
                                                        + Add Doctor
                                                    </Button>
                                                </div>

                                                {fields.map((item, index) => (
                                                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/50 p-4 rounded-2xl border border-slate-100 relative group">
                                                        <FormField control={form.control} name={`doctors.${index}.name`} render={({ field }) => (
                                                            <FormItem className="md:col-span-1">
                                                                <FormControl><Input placeholder="Dr. Sarah" {...field} className="bg-white rounded-xl" /></FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                        <FormField control={form.control} name={`doctors.${index}.expertise`} render={({ field }) => (
                                                            <FormItem className="md:col-span-1">
                                                                <Select onValueChange={field.onChange} value={field.value}>
                                                                    <FormControl><SelectTrigger className="bg-white rounded-xl"><SelectValue placeholder="Expertise" /></SelectTrigger></FormControl>
                                                                    <SelectContent>
                                                                        {form.watch("treatmentAreas").map(area => (
                                                                            <SelectItem key={area} value={area}>{area}</SelectItem>
                                                                        ))}
                                                                        {form.watch("treatmentAreas").length === 0 && <SelectItem value="none" disabled>Select Treatment Areas first</SelectItem>}
                                                                    </SelectContent>
                                                                </Select>
                                                                <FormMessage />
                                                            </FormItem>
                                                        )} />
                                                        <div className="flex items-center">
                                                            <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)} className="text-red-500 hover:text-red-600 font-bold ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                                                Remove
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* SECTION 1: LICENSING */}
                                    {currentStep === 1 && (
                                        <div className="space-y-8">
                                            <StepHeader title="Licensing & Accreditations" desc="Quality and safety certifications" icon={Shield} />
                                            <FormField control={form.control} name="accreditations" render={() => (
                                                <FormItem className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
                                                    <FormLabel className="text-base font-bold">Institutional Accreditations</FormLabel>
                                                    <FormDescription>Select all that apply.</FormDescription>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                                        {ACCREDITATION_OPTIONS.map((item) => (
                                                            <FormField key={item.id} control={form.control} name="accreditations" render={({ field }) => (
                                                                <FormItem key={item.id} className="flex items-start space-x-3 space-y-0 p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                                                    <FormControl>
                                                                        <Checkbox checked={field.value?.includes(item.id)} onCheckedChange={(checked) => {
                                                                            const current = Array.isArray(field.value) ? field.value : [];
                                                                            return checked ? field.onChange([...current, item.id]) : field.onChange(current.filter((value) => value !== item.id))
                                                                        }} />
                                                                    </FormControl>
                                                                    <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">{item.label}</FormLabel>
                                                                </FormItem>
                                                            )} />
                                                        ))}
                                                    </div>
                                                    <FormMessage className="text-red-500 text-xs font-bold mt-2" />
                                                </FormItem>
                                            )} />
                                            <RadioField form={form} name="physicianLicensing" label="Active Physician Licensing" desc="Are all surgeons actively licensed and board-certified?" />
                                        </div>
                                    )}

                                    {/* SECTION 2: PRIVACY */}
                                    {currentStep === 2 && (
                                        <div className="space-y-8">
                                            <StepHeader title="Privacy & Data Protection" desc="Global compliance standards" icon={Lock} />
                                            <FormField control={form.control} name="dpaCompliance" render={({ field }) => (
                                                <FormItem className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
                                                    <FormLabel className="text-base font-bold">Data Processing Agreement (DPA)</FormLabel>
                                                    <FormDescription>Does the hospital have a written DPA compliant with applicable laws?</FormDescription>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <FormControl><SelectTrigger className="h-12 bg-white"><SelectValue placeholder="Select compliance level" /></SelectTrigger></FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="gdpr">Fully GDPR Compliant</SelectItem>
                                                            <SelectItem value="hipaa">Fully HIPAA Compliant</SelectItem>
                                                            <SelectItem value="both">Both GDPR & HIPAA Compliant</SelectItem>
                                                            <SelectItem value="local">Local Regulation Compliant</SelectItem>
                                                            <SelectItem value="none">Not Currently Compliant</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage className="text-red-500 text-xs font-bold mt-2" />
                                                </FormItem>
                                            )} />
                                        </div>
                                    )}

                                    {/* SECTION 3: INSURANCE */}
                                    {currentStep === 3 && (
                                        <div className="space-y-8">
                                            <StepHeader title="Insurance & Liability" desc="Risk management and protection" icon={DollarSign} />
                                            <RadioField form={form} name="liabilityInsurance" label="Medical Liability Insurance" desc="Does the hospital maintain active professional liability insurance?" />
                                            <RadioField form={form} name="arbitrationClause" label="Arbitration Clauses" desc="Do patient contracts include binding arbitration agreements?" />
                                        </div>
                                    )}

                                    {/* 4. Consent */}
                                    {currentStep === 3 && (
                                        <div className="space-y-8">
                                            <StepHeader title="Informed Consent" desc="Transparency for international patients" icon={FileText} />
                                            <RadioField form={form} name="consentLanguage" label="Native Language Consent" desc="Are consent forms available in the patient's primary language?" />
                                            <RadioField form={form} name="tourismConsent" label="Medical Tourism Specific Consent" desc="Is there a separate consent for international medical tourists?" />
                                            <RadioField form={form} name="travelRiskDisclosure" label="Travel Risk Disclosure" desc="Are patients briefed on travel risks related to surgery?" />
                                        </div>
                                    )}

                                    {/* 5. Marketing */}
                                    {currentStep === 4 && (
                                        <div className="space-y-8">
                                            <StepHeader title="Marketing Compliance" desc="Truthful advertising standards" icon={Search} />
                                            <RadioField form={form} name="outcomeGuarantees" label="No Outcome Guarantees" desc="Does the hospital avoid promising specific medical outcomes?" />
                                            <RadioField form={form} name="marketingCompliance" label="Advertising Regulations" desc="Does marketing comply with local 'Truth in Advertising' laws?" />
                                            <RadioField form={form} name="financialRelationship" label="Third-Party Commissions" desc="Does the hospital disclose financial relationships with agencies?" />
                                            {form.watch("financialRelationship") === "yes" && (
                                                <TextAreaField form={form} name="financialRelationshipDetails" label="Commission Details" placeholder="Describe how referrals are handled..." />
                                            )}
                                        </div>
                                    )}

                                    {/* 6. Emergency */}
                                    {currentStep === 5 && (
                                        <div className="space-y-8">
                                            <StepHeader title="Emergency & Continuity" desc="Protocols for patient safety" icon={Activity} />
                                            <TextAreaField form={form} name="emergencyProtocol" label="Emergency Protocol" placeholder="Describe handling of unexpected complications..." />
                                            <RadioField form={form} name="dischargeSummary" label="Comprehensive Discharge" desc="Is a full medical summary provided upon discharge?" />
                                            <TextAreaField form={form} name="adverseEventProcess" label="Adverse Event Management" placeholder="Describe follow-up after an adverse event..." />
                                        </div>
                                    )}

                                    {/* 7. Regulatory */}
                                    {currentStep === 6 && (
                                        <div className="space-y-8">
                                            <StepHeader title="Regulatory Vigilance" desc="Professional conduct and reporting" icon={Scale} />
                                            <RadioField form={form} name="adverseEventReporting" label="Mandatory Event Reporting" desc="Are complications reported to national health authorities?" />
                                            <RadioField form={form} name="disciplinaryActions" label="Disciplinary Disclosure" desc="Has any lead surgeon faced license revocation in 5 years?" />
                                            {form.watch("disciplinaryActions") === "yes" && (
                                                <TextAreaField form={form} name="disciplinaryDetails" label="Disciplinary History" placeholder="Explain circumstances and resolution..." />
                                            )}
                                        </div>
                                    )}

                                    {/* 8. Financial */}
                                    {currentStep === 7 && (
                                        <div className="space-y-8">
                                            <StepHeader title="Financial Transparency" desc="Billing and refund integrity" icon={DollarSign} />
                                            <RadioField form={form} name="pricingEstimates" label="Binding Cost Estimates" desc="Are patients provided exact cost breakdowns beforehand?" />
                                            <RadioField form={form} name="refundPolicy" label="Clear Refund Policy" desc="Does a written refund policy exist for canceled treatments?" />
                                        </div>
                                    )}

                                    {/* 9. Halal */}
                                    {currentStep === 8 && (
                                        <div className="space-y-8">
                                            <StepHeader title="Halal Compliance" desc="Islamic healthcare ethical standards" icon={Heart} />

                                            <div className="p-8 bg-emerald-50/50 border border-emerald-100 rounded-[32px] space-y-6">
                                                <RadioField form={form} name="halalCertification" label="Halal Institutionally Certified?" desc="Is there a global Halal certification (JAKIM, MUI)?" />

                                                {form.watch("halalCertification") === "yes" && (
                                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-emerald-100">
                                                        <FormField control={form.control} name="certificateNumber" render={({ field }) => (
                                                            <FormItem><FormLabel className="font-bold text-emerald-900">Certificate No.</FormLabel><FormControl><Input {...field} className="bg-white border-emerald-200" placeholder="e.g., JAKIM/H/2024/001" /></FormControl><FormMessage className="text-red-500 text-xs font-bold" /></FormItem>
                                                        )} />
                                                        <FormField control={form.control} name="expiryDate" render={({ field }) => (
                                                            <FormItem className="flex flex-col"><FormLabel className="font-bold text-emerald-900 mt-2">Expiry Date</FormLabel>
                                                                <Popover><PopoverTrigger asChild><FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal border-emerald-200 h-10", !field.value && "text-muted-foreground")}>
                                                                    {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}<CalendarIcon className="ml-auto h-4 w-4 opacity-50" /></Button></FormControl></PopoverTrigger>
                                                                    <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus /></PopoverContent>
                                                                </Popover>
                                                                <FormMessage className="text-red-500 text-xs font-bold" />
                                                            </FormItem>
                                                        )} />
                                                    </motion.div>
                                                )}
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <RadioField form={form} name="halalFoodKitchen" label="Halal Food/Kitchen" desc="Is the kitchen certified and non-crosscontaminated?" />
                                                <RadioField form={form} name="prayerRooms" label="Prayer Rooms (Musalla)" desc="Available within the facility?" />
                                                <RadioField form={form} name="sameGenderCare" label="Same-Gender Care" desc="Policies for gender-segregated clinical care?" />
                                                <RadioField form={form} name="bloodTransfusionPolicy" label="Ethical Blood Handling" desc="Standards for tissue and blood management?" />
                                            </div>

                                            <TextAreaField form={form} name="crossContaminationProcess" label="Cross-Contamination Protocol" placeholder="Describe kitchen segregation..." />
                                            <TextAreaField form={form} name="hijabAccommodation" label="Modesty & Hijab Policy" placeholder="Policies for patient attire..." />
                                            <TextAreaField form={form} name="shariahTissueHandling" label="Shariah Tissue Handling" placeholder="Describe ethical disposal/usage..." />

                                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {["specialDietaryMenus", "qiblaMarking", "prayerTimetables", "genderSegregatedWaiting", "staffTraining", "halalLiaison", "rightsCharter", "multilingualForms", "annualAudits"].map(id => (
                                                    <RadioField key={id} form={form} name={id as any} label={id.replace(/([A-Z])/g, ' $1').trim()} hideDesc compact />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <CardFooter className="flex justify-between p-8 bg-slate-50/50 border-t border-slate-100">
                            <Button type="button" variant="ghost" onClick={prevStep} disabled={currentStep === 0 || isSubmitting || isLoadingData} className="h-12 px-6 rounded-xl font-bold">
                                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                            </Button>

                            {currentStep === STEPS.length - 1 ? (
                                <Button type="submit" disabled={isSubmitting || isLoadingData} className="bg-emerald-600 hover:bg-emerald-700 h-12 px-10 rounded-xl shadow-xl shadow-emerald-200 font-bold transition-all active:scale-[0.98]">
                                    {isSubmitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</> : <><Check className="w-4 h-4 mr-2" /> Complete Registration</>}
                                </Button>
                            ) : (
                                <Button type="button" onClick={nextStep} disabled={isLoadingData} className="bg-emerald-600 hover:bg-emerald-700 h-12 px-10 rounded-xl shadow-xl shadow-emerald-200 font-bold transition-all active:scale-[0.98]">
                                    Save & Continue <ChevronRight className="w-4 h-4 ml-2" />
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Form>
            </Card>
        </div>
    );
};

// UI Components
const StepHeader = ({ title, desc, icon: Icon }: any) => (
    <div className="flex items-center gap-4 pb-4 border-b">
        <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-xl shadow-emerald-200"><Icon className="w-6 h-6" /></div>
        <div><h2 className="text-2xl font-black text-slate-900 tracking-tight">{title}</h2><p className="text-slate-500 font-medium">{desc}</p></div>
    </div>
);

const RadioField = ({ form, name, label, desc, hideDesc, compact }: any) => (
    <FormField control={form.control} name={name} render={({ field }) => (
        <FormItem className={cn("p-5 border transition-all rounded-2xl", field.value === "yes" ? "bg-emerald-50/20 border-emerald-100 shadow-sm" : "bg-white border-slate-100", compact ? "p-3" : "p-5")}>
            <div className={cn(compact ? "" : "mb-3")}>
                <FormLabel className="text-[15px] font-extrabold text-slate-900">{label}</FormLabel>
                {!hideDesc && <FormDescription className="text-xs font-medium text-slate-500 leading-relaxed max-w-sm mt-0.5">{desc}</FormDescription>}
            </div>
            <FormControl>
                <RadioGroup onValueChange={field.onChange} value={field.value} className="flex gap-6 mt-3">
                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="yes" /></FormControl><FormLabel className="font-bold text-slate-700 cursor-pointer text-sm">Yes</FormLabel></FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0"><FormControl><RadioGroupItem value="no" /></FormControl><FormLabel className="font-bold text-slate-700 cursor-pointer text-sm">No</FormLabel></FormItem>
                </RadioGroup>
            </FormControl>
            <FormMessage className="text-red-500 text-[10px] font-black uppercase mt-2" />
        </FormItem>
    )} />
);

const TextAreaField = ({ form, name, label, placeholder }: any) => (
    <FormField control={form.control} name={name} render={({ field }) => (
        <FormItem className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
            <FormLabel className="text-[15px] font-extrabold text-slate-900">{label}</FormLabel>
            <FormControl><Textarea {...field} placeholder={placeholder} className="min-h-[120px] mt-3 bg-white border-slate-200 rounded-xl focus-visible:ring-emerald-500 text-sm font-medium" /></FormControl>
            <FormMessage className="text-red-500 text-[10px] font-black uppercase mt-2" />
        </FormItem>
    )} />
);

export default HospitalOnboardingPage;
