import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
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
    BookOpen
} from "lucide-react";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// --- Schema Definitions ---

const onboardingSchema = z.object({
    // 1. Licensing & Accreditation
    accreditations: z.array(z.string()).min(1, "Select at least one accreditation"),
    physicianLicensing: z.enum(["yes", "no"]),

    // 2. Patient Privacy & Data Protection
    dpaCompliance: z.string().min(1, "Required"),

    // 3. Medical Malpractice & Insurance
    liabilityInsurance: z.enum(["yes", "no"]),
    arbitrationClause: z.enum(["yes", "no"]),

    // 4. Informed Consent & Language Access
    consentLanguage: z.enum(["yes", "no"]),
    tourismConsent: z.enum(["yes", "no"]),
    travelRiskDisclosure: z.enum(["yes", "no"]),

    // 5. Advertising & Marketing Compliance
    outcomeGuarantees: z.enum(["yes", "no"]),
    marketingCompliance: z.enum(["yes", "no"]),
    financialRelationship: z.enum(["yes", "no"]),
    financialRelationshipDetails: z.string().optional(),

    // 6. Emergency & Continuity of Care
    emergencyProtocol: z.string().min(10, "Please provide more detail"),
    dischargeSummary: z.enum(["yes", "no"]),
    adverseEventProcess: z.string().min(10, "Please provide more detail"),

    // 7. Regulatory Reporting & Vigilance
    adverseEventReporting: z.enum(["yes", "no"]),
    disciplinaryActions: z.enum(["yes", "no"]),
    disciplinaryDetails: z.string().optional(),

    // 8. Financial & Billing Transparency
    pricingEstimates: z.enum(["yes", "no"]),
    refundPolicy: z.enum(["yes", "no"]),

    // 9. General HALAL Compliance & Certification
    halalCertification: z.enum(["yes", "no"]),
    certificateNumber: z.string().optional(),
    expiryDate: z.date().optional(),
    halalFoodKitchen: z.enum(["yes", "no"]),
    crossContaminationProcess: z.string().min(10, "Please provide more detail"),
    specialDietaryMenus: z.enum(["yes", "no"]),
    prayerRooms: z.enum(["yes", "no"]),
    qiblaMarking: z.enum(["yes", "no"]),
    prayerTimetables: z.enum(["yes", "no"]),
    sameGenderCare: z.enum(["yes", "no"]),
    genderSegregatedWaiting: z.enum(["yes", "no"]),
    hijabAccommodation: z.string().min(10, "Please provide more detail"),
    shariahTissueHandling: z.string().min(10, "Please provide more detail"),
    bloodTransfusionPolicy: z.enum(["yes", "no"]),
    staffTraining: z.enum(["yes", "no"]),
    halalLiaison: z.enum(["yes", "no"]),
    rightsCharter: z.enum(["yes", "no"]),
    multilingualForms: z.enum(["yes", "no"]),
    annualAudits: z.enum(["yes", "no"]),
});

type OnboardingValues = z.infer<typeof onboardingSchema>;

const STEPS = [
    { id: "licensing", title: "Licensing", icon: Shield },
    { id: "privacy", title: "Privacy", icon: Lock },
    { id: "insurance", title: "Insurance", icon: DollarSign },
    { id: "consent", title: "Consent", icon: FileText },
    { id: "marketing", title: "Marketing", icon: Search },
    { id: "care", title: "Care", icon: Stethoscope },
    { id: "regulatory", title: "Regulatory", icon: Scale },
    { id: "financial", title: "Financial", icon: Activity },
    { id: "halal", title: "Halal", icon: Heart },
];

const HospitalOnboardingPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<OnboardingValues>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            accreditations: [],
            physicianLicensing: "no",
            dpaCompliance: "",
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
        mode: "onBlur",
    });

    const nextStep = async () => {
        // Basic validation for the current step fields could be added here
        // For now, we'll just increment
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(s => s + 1);
            window.scrollTo(0, 0);
        }
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(s => s - 1);
            window.scrollTo(0, 0);
        }
    };

    const onSubmit = (data: OnboardingValues) => {
        console.log("Full Hospital Onboarding Payload:", JSON.stringify(data, null, 2));
        setIsSubmitted(true);
    };

    const progress = ((currentStep + 1) / STEPS.length) * 100;

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-emerald-50 rounded-full p-6 mb-6"
                >
                    <Check className="w-16 h-16 text-emerald-600" />
                </motion.div>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Onboarding Complete!</h1>
                <p className="text-slate-600 max-w-md mb-8">
                    Thank you for providing your hospital details. Our team will review your submission and activate your full portal shortly.
                </p>
                <Button onClick={() => window.location.href = "/admin/dashboard"} size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                    Go to Dashboard
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            {/* Header */}
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
                    Hospital Onboarding
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Complete your profile to join the HalalMedi network. This information ensures compliance
                    with international medical standards and Halal healthcare ethics.
                </p>
            </div>

            {/* Progress Wizard */}
            <div className="mb-12 relative">
                <div className="flex items-center justify-between mb-4 overflow-x-auto pb-4 no-scrollbar">
                    {STEPS.map((step, index) => {
                        const Icon = step.icon;
                        const isActive = index === currentStep;
                        const isCompleted = index < currentStep;

                        return (
                            <div
                                key={step.id}
                                className={cn(
                                    "flex flex-col items-center min-w-[80px] transition-all duration-300",
                                    isActive ? "scale-110 opacity-100" : "opacity-50"
                                )}
                            >
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center mb-2 border-2",
                                        isActive ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-200" :
                                            isCompleted ? "bg-emerald-100 border-emerald-600 text-emerald-600" :
                                                "bg-white border-slate-200 text-slate-400"
                                    )}
                                >
                                    {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                                </div>
                                <span className={cn(
                                    "text-xs font-semibold whitespace-nowrap",
                                    isActive ? "text-emerald-700" : "text-slate-500"
                                )}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
                <Progress value={progress} className="h-2 bg-slate-100" />
            </div>

            {/* Form Area */}
            <Card className="shadow-2xl border-slate-100 overflow-hidden">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="p-1">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentStep}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    exit={{ x: -20, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="p-6 md:p-8"
                                >
                                    {/* Step 1: Licensing */}
                                    {currentStep === 0 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 pb-2 border-b">
                                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                                    <Shield className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-900">Licensing & Accreditation</h2>
                                                    <p className="text-slate-500">Global medical standards and quality certifications</p>
                                                </div>
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="accreditations"
                                                render={() => (
                                                    <FormItem>
                                                        <div className="mb-4">
                                                            <FormLabel className="text-base font-bold">Hospital Accreditations</FormLabel>
                                                            <FormDescription>Select all that apply to your institution.</FormDescription>
                                                        </div>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                            {["NABH", "Joint Commission International (JCI)", "ISO", "Global Healthcare Accreditation", "Other"].map((item) => (
                                                                <FormField
                                                                    key={item}
                                                                    control={form.control}
                                                                    name="accreditations"
                                                                    render={({ field }) => (
                                                                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-slate-50 transition-colors">
                                                                            <FormControl>
                                                                                <Checkbox
                                                                                    checked={field.value?.includes(item)}
                                                                                    onCheckedChange={(checked) => {
                                                                                        return checked
                                                                                            ? field.onChange([...field.value, item])
                                                                                            : field.onChange(field.value?.filter((value) => value !== item));
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <div className="space-y-1 leading-none">
                                                                                <FormLabel className="font-medium cursor-pointer">{item}</FormLabel>
                                                                            </div>
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                            ))}
                                                        </div>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                            <FormField
                                                control={form.control}
                                                name="physicianLicensing"
                                                render={({ field }) => (
                                                    <FormItem className="space-y-3 p-4 bg-slate-50 rounded-xl">
                                                        <FormLabel className="text-base font-bold">Physician Licensing</FormLabel>
                                                        <FormDescription>Are all physicians and surgeons on staff actively licensed and board-certified in their specialties?</FormDescription>
                                                        <FormControl>
                                                            <RadioGroup
                                                                onValueChange={field.onChange}
                                                                defaultValue={field.value}
                                                                className="flex gap-6 mt-2"
                                                            >
                                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl><RadioGroupItem value="yes" /></FormControl>
                                                                    <FormLabel className="font-normal cursor-pointer">Yes</FormLabel>
                                                                </FormItem>
                                                                <FormItem className="flex items-center space-x-3 space-y-0">
                                                                    <FormControl><RadioGroupItem value="no" /></FormControl>
                                                                    <FormLabel className="font-normal cursor-pointer">No</FormLabel>
                                                                </FormItem>
                                                            </RadioGroup>
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )}

                                    {/* Step 2: Privacy */}
                                    {currentStep === 1 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 pb-2 border-b">
                                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                                    <Lock className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-900">Patient Privacy & Data Protection</h2>
                                                    <p className="text-slate-500">Compliance with global and local data laws</p>
                                                </div>
                                            </div>

                                            <FormField
                                                control={form.control}
                                                name="dpaCompliance"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel className="text-base font-bold">DPA Compliance</FormLabel>
                                                        <FormDescription>Does the hospital have a written data processing agreement compliant with applicable laws?</FormDescription>
                                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                            <FormControl>
                                                                <SelectTrigger className="w-full mt-2 h-12">
                                                                    <SelectValue placeholder="Select compliance type" />
                                                                </SelectTrigger>
                                                            </FormControl>
                                                            <SelectContent>
                                                                <SelectItem value="gdpr">Yes - GDPR</SelectItem>
                                                                <SelectItem value="hipaa">Yes - HIPAA</SelectItem>
                                                                <SelectItem value="local">Yes - Local Equivalent</SelectItem>
                                                                <SelectItem value="no">No</SelectItem>
                                                            </SelectContent>
                                                        </Select>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                        </div>
                                    )}

                                    {/* Step 3: Insurance */}
                                    {currentStep === 2 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 pb-2 border-b">
                                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                                    <DollarSign className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-900">Medical Malpractice & Insurance</h2>
                                                    <p className="text-slate-500">Liability coverage and dispute resolution</p>
                                                </div>
                                            </div>

                                            <div className="grid gap-6">
                                                <FormField
                                                    control={form.control}
                                                    name="liabilityInsurance"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-3 p-5 border rounded-xl shadow-sm">
                                                            <FormLabel className="text-base font-bold">Professional Liability Insurance</FormLabel>
                                                            <FormDescription>Does the hospital carry professional liability insurance covering international patients, including post-discharge?</FormDescription>
                                                            <FormControl>
                                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 mt-2">
                                                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                                                        <FormControl><RadioGroupItem value="yes" /></FormControl>
                                                                        <FormLabel className="font-normal">Yes</FormLabel>
                                                                    </FormItem>
                                                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                                                        <FormControl><RadioGroupItem value="no" /></FormControl>
                                                                        <FormLabel className="font-normal">No</FormLabel>
                                                                    </FormItem>
                                                                </RadioGroup>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="arbitrationClause"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-3 p-5 border rounded-xl shadow-sm">
                                                            <FormLabel className="text-base font-bold">Arbitration Clause</FormLabel>
                                                            <FormDescription>Does the hospital require patients to sign a binding arbitration or jurisdiction clause in case of disputes?</FormDescription>
                                                            <FormControl>
                                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 mt-2">
                                                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                                                        <FormControl><RadioGroupItem value="yes" /></FormControl>
                                                                        <FormLabel className="font-normal">Yes</FormLabel>
                                                                    </FormItem>
                                                                    <FormItem className="flex items-center space-x-2 space-y-0">
                                                                        <FormControl><RadioGroupItem value="no" /></FormControl>
                                                                        <FormLabel className="font-normal">No</FormLabel>
                                                                    </FormItem>
                                                                </RadioGroup>
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 4: Consent */}
                                    {currentStep === 3 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 pb-2 border-b">
                                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                                    <FileText className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-900">Informed Consent & Language Access</h2>
                                                    <p className="text-slate-500">Patient communication and risk disclosure</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <FormField
                                                    control={form.control}
                                                    name="consentLanguage"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-3 p-4 bg-slate-50 rounded-xl">
                                                            <FormLabel className="font-bold">Consent Form Language</FormLabel>
                                                            <FormDescription>Does the hospital provide informed consent forms in the patient’s primary language, with certified medical translation?</FormDescription>
                                                            <FormControl>
                                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label>Yes</label></div>
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label>No</label></div>
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="tourismConsent"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-3 p-4 bg-slate-50 rounded-xl">
                                                            <FormLabel className="font-bold">Tourism Package Consent</FormLabel>
                                                            <FormDescription>Are consent forms reviewed separately for procedures performed as part of a medical tourism package?</FormDescription>
                                                            <FormControl>
                                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label>Yes</label></div>
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label>No</label></div>
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="travelRiskDisclosure"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-3 p-4 bg-slate-50 rounded-xl">
                                                            <FormLabel className="font-bold">Travel Risk Disclosure</FormLabel>
                                                            <FormDescription>Does the hospital disclose known risks specific to travel/post-op repatriation?</FormDescription>
                                                            <FormControl>
                                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label>Yes</label></div>
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label>No</label></div>
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 5: Marketing */}
                                    {currentStep === 4 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 pb-2 border-b">
                                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                                    <Search className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-900">Advertising & Marketing Compliance</h2>
                                                    <p className="text-slate-500">Truthfulness and transparency in marketing</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <FormField
                                                    control={form.control}
                                                    name="outcomeGuarantees"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-3 p-4 bg-slate-50 rounded-xl">
                                                            <FormLabel className="font-bold">Outcome Guarantees</FormLabel>
                                                            <FormDescription>Does the hospital avoid guarantees of medical outcomes in portal listings?</FormDescription>
                                                            <FormControl>
                                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label>Yes</label></div>
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label>No</label></div>
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="marketingCompliance"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-3 p-4 bg-slate-50 rounded-xl">
                                                            <FormLabel className="font-bold">Photo/Testimonial Compliance</FormLabel>
                                                            <FormDescription>Are before/after photos and patient testimonials compliant with local medical advertising laws?</FormDescription>
                                                            <FormControl>
                                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label>Yes</label></div>
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label>No</label></div>
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="p-6 border rounded-2xl space-y-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="financialRelationship"
                                                        render={({ field }) => (
                                                            <FormItem className="space-y-3">
                                                                <FormLabel className="font-bold">Financial Relationship Disclosure</FormLabel>
                                                                <FormDescription>Does the hospital disclose any financial relationship with the medical tourism portal?</FormDescription>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="w-full mt-2"><SelectValue placeholder="Select" /></SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectItem value="yes">Yes</SelectItem>
                                                                        <SelectItem value="no">No</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {form.watch("financialRelationship") === "yes" && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}>
                                                            <FormField
                                                                control={form.control}
                                                                name="financialRelationshipDetails"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-sm font-semibold">Please explain:</FormLabel>
                                                                        <FormControl>
                                                                            <Textarea {...field} className="min-h-[100px]" placeholder="Provide details of the relationship..." />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 6: Emergency & Care */}
                                    {currentStep === 5 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 pb-2 border-b">
                                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                                    <Stethoscope className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-900">Emergency & Continuity of Care</h2>
                                                    <p className="text-slate-500">Managing post-discharge and international complications</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <FormField
                                                    control={form.control}
                                                    name="emergencyProtocol"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="font-bold">Emergency Protocol</FormLabel>
                                                            <FormDescription>What is the hospital’s protocol for managing a patient’s emergency after discharge?</FormDescription>
                                                            <FormControl>
                                                                <Textarea {...field} className="min-h-[120px] bg-slate-50" placeholder="Describe the steps..." />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="dischargeSummary"
                                                    render={({ field }) => (
                                                        <FormItem className="space-y-3 p-4 border rounded-xl">
                                                            <FormLabel className="font-bold">Discharge Summary</FormLabel>
                                                            <FormDescription>Does the hospital provide a written discharge summary and care plan suitable for home physician?</FormDescription>
                                                            <FormControl>
                                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6">
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label>Yes</label></div>
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label>No</label></div>
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="adverseEventProcess"
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel className="font-bold">Adverse Event Process</FormLabel>
                                                            <FormDescription>Describe the process for handling adverse events that occur after the patient leaves the country.</FormDescription>
                                                            <FormControl>
                                                                <Textarea {...field} className="min-h-[120px] bg-slate-50" placeholder="Outline the process..." />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 7: Regulatory */}
                                    {currentStep === 6 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 pb-2 border-b">
                                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                                    <Scale className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-900">Regulatory Reporting & Vigilance</h2>
                                                    <p className="text-slate-500">Legal compliance and incident reporting</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <FormField
                                                    control={form.control}
                                                    name="adverseEventReporting"
                                                    render={({ field }) => (
                                                        <FormItem className="p-4 bg-slate-50 rounded-xl">
                                                            <FormLabel className="font-bold">Adverse Event Reporting</FormLabel>
                                                            <FormDescription>Does the hospital report serious adverse events to relevant authorities?</FormDescription>
                                                            <FormControl>
                                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 mt-2">
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label>Yes</label></div>
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label>No</label></div>
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <div className="p-6 border rounded-2xl space-y-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="disciplinaryActions"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="font-bold">Disciplinary Actions</FormLabel>
                                                                <FormDescription>Is the hospital subject to any current disciplinary actions, restrictions, or litigation?</FormDescription>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl><SelectTrigger className="mt-2"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                                                                    <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No</SelectItem></SelectContent>
                                                                </Select>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {form.watch("disciplinaryActions") === "yes" && (
                                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}>
                                                            <FormField
                                                                control={form.control}
                                                                name="disciplinaryDetails"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-sm font-semibold">Please provide details:</FormLabel>
                                                                        <FormControl>
                                                                            <Textarea {...field} className="min-h-[100px]" />
                                                                        </FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 8: Financial */}
                                    {currentStep === 7 && (
                                        <div className="space-y-8">
                                            <div className="flex items-center gap-3 pb-2 border-b">
                                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                                    <Activity className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-900">Financial & Billing Transparency</h2>
                                                    <p className="text-slate-500">Upfront pricing and refund policies</p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <FormField
                                                    control={form.control}
                                                    name="pricingEstimates"
                                                    render={({ field }) => (
                                                        <FormItem className="p-4 border rounded-xl">
                                                            <FormLabel className="font-bold">Pricing Estimates</FormLabel>
                                                            <FormDescription>Are bundled pricing estimates provided upfront, with a breakdown excluding non-medical costs?</FormDescription>
                                                            <FormControl>
                                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 mt-2">
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label>Yes</label></div>
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label>No</label></div>
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />

                                                <FormField
                                                    control={form.control}
                                                    name="refundPolicy"
                                                    render={({ field }) => (
                                                        <FormItem className="p-4 border rounded-xl">
                                                            <FormLabel className="font-bold">Refund Policy</FormLabel>
                                                            <FormDescription>Is there a clear refund or readmission policy for complications?</FormDescription>
                                                            <FormControl>
                                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-6 mt-2">
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label>Yes</label></div>
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label>No</label></div>
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 9: Halal */}
                                    {currentStep === 8 && (
                                        <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-4 custom-scrollbar">
                                            <div className="flex items-center gap-3 pb-2 border-b sticky top-0 bg-white z-10">
                                                <div className="p-2 bg-emerald-100 rounded-lg text-emerald-700">
                                                    <Heart className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-slate-900">General HALAL Compliance</h2>
                                                    <p className="text-slate-500">Religious and ethical healthcare standards</p>
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                {/* Certification Section */}
                                                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-6">
                                                    <FormField
                                                        control={form.control}
                                                        name="halalCertification"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="font-bold text-emerald-900">Do you hold a valid HALAL certification?</FormLabel>
                                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                                    <FormControl><SelectTrigger className="bg-white"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                                                                    <SelectContent><SelectItem value="yes">Yes</SelectItem><SelectItem value="no">No</SelectItem></SelectContent>
                                                                </Select>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    {form.watch("halalCertification") === "yes" && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2"
                                                        >
                                                            <FormField
                                                                control={form.control}
                                                                name="certificateNumber"
                                                                render={({ field }) => (
                                                                    <FormItem>
                                                                        <FormLabel className="text-sm font-semibold">Certificate Number</FormLabel>
                                                                        <FormControl><Input {...field} className="bg-white" /></FormControl>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                            <FormField
                                                                control={form.control}
                                                                name="expiryDate"
                                                                render={({ field }) => (
                                                                    <FormItem className="flex flex-col">
                                                                        <FormLabel className="text-sm font-semibold">Expiry Date</FormLabel>
                                                                        <Popover>
                                                                            <PopoverTrigger asChild>
                                                                                <FormControl>
                                                                                    <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal bg-white", !field.value && "text-muted-foreground")}>
                                                                                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                                                                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                                    </Button>
                                                                                </FormControl>
                                                                            </PopoverTrigger>
                                                                            <PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date < new Date()} initialFocus /></PopoverContent>
                                                                        </Popover>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        </motion.div>
                                                    )}
                                                </div>

                                                {/* Food & Kitchen */}
                                                <div className="space-y-6 p-4 border rounded-xl">
                                                    <h3 className="text-lg font-bold flex items-center gap-2"><div className="w-2 h-6 bg-emerald-500 rounded-full" /> Food & Kitchen</h3>
                                                    <FormField
                                                        control={form.control}
                                                        name="halalFoodKitchen"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="font-semibold">Is all patient food Halal-certified and prepared in a dedicated kitchen?</FormLabel>
                                                                <FormControl>
                                                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 mt-2">
                                                                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label>Yes</label></div>
                                                                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label>No</label></div>
                                                                    </RadioGroup>
                                                                </FormControl>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="crossContaminationProcess"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="font-semibold">Describe the process to prevent cross-contamination:</FormLabel>
                                                                <FormControl><Textarea {...field} className="bg-slate-50" /></FormControl>
                                                            </FormItem>
                                                        )}
                                                    />

                                                    <FormField
                                                        control={form.control}
                                                        name="specialDietaryMenus"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="font-semibold">Are menu options available for special dietary needs?</FormLabel>
                                                                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 mt-2">
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label>Yes</label></div>
                                                                    <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label>No</label></div>
                                                                </RadioGroup>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                {/* Spiritual Support */}
                                                <div className="space-y-6 p-4 border rounded-xl">
                                                    <h3 className="text-lg font-bold flex items-center gap-2"><div className="w-2 h-6 bg-emerald-500 rounded-full" /> Spiritual Support</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <FormField
                                                            control={form.control}
                                                            name="prayerRooms"
                                                            render={({ field }) => (
                                                                <FormItem className="p-3 bg-slate-50 rounded-lg">
                                                                    <FormLabel className="text-sm font-semibold">Separate Prayer Rooms & Wudu?</FormLabel>
                                                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 mt-2">
                                                                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label className="text-sm">Yes</label></div>
                                                                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label className="text-sm">No</label></div>
                                                                    </RadioGroup>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="qiblaMarking"
                                                            render={({ field }) => (
                                                                <FormItem className="p-3 bg-slate-50 rounded-lg">
                                                                    <FormLabel className="text-sm font-semibold">Qibla direction marked in rooms?</FormLabel>
                                                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 mt-2">
                                                                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label className="text-sm">Yes</label></div>
                                                                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label className="text-sm">No</label></div>
                                                                    </RadioGroup>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="prayerTimetables"
                                                            render={({ field }) => (
                                                                <FormItem className="p-3 bg-slate-50 rounded-lg">
                                                                    <FormLabel className="text-sm font-semibold">Prayer timetables & Quran available?</FormLabel>
                                                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 mt-2">
                                                                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label className="text-sm">Yes</label></div>
                                                                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label className="text-sm">No</label></div>
                                                                    </RadioGroup>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Gender-Sensitive Care */}
                                                <div className="space-y-6 p-4 border rounded-xl">
                                                    <h3 className="text-lg font-bold flex items-center gap-2"><div className="w-2 h-6 bg-emerald-500 rounded-full" /> Gender-Sensitive Care</h3>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                        <FormField
                                                            control={form.control}
                                                            name="sameGenderCare"
                                                            render={({ field }) => (
                                                                <FormItem className="p-3 bg-slate-50 rounded-lg">
                                                                    <FormLabel className="text-sm font-semibold">Same-gender care policies?</FormLabel>
                                                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 mt-2">
                                                                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label className="text-sm">Yes</label></div>
                                                                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label className="text-sm">No</label></div>
                                                                    </RadioGroup>
                                                                </FormItem>
                                                            )}
                                                        />
                                                        <FormField
                                                            control={form.control}
                                                            name="genderSegregatedWaiting"
                                                            render={({ field }) => (
                                                                <FormItem className="p-3 bg-slate-50 rounded-lg">
                                                                    <FormLabel className="text-sm font-semibold">Gender-segregated waiting areas?</FormLabel>
                                                                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex gap-4 mt-2">
                                                                        <div className="flex items-center space-x-2"><RadioGroupItem value="yes" /><label className="text-sm">Yes</label></div>
                                                                        <div className="flex items-center space-x-2"><RadioGroupItem value="no" /><label className="text-sm">No</label></div>
                                                                    </RadioGroup>
                                                                </FormItem>
                                                            )}
                                                        />
                                                    </div>
                                                    <FormField
                                                        control={form.control}
                                                        name="hijabAccommodation"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="font-semibold">How do you accommodate hijab/niqab during procedures?</FormLabel>
                                                                <FormControl><Textarea {...field} className="bg-slate-50" /></FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                </div>

                                                {/* Ethics & Staffing */}
                                                <div className="space-y-6 p-4 border rounded-xl">
                                                    <h3 className="text-lg font-bold flex items-center gap-2"><div className="w-2 h-6 bg-emerald-500 rounded-full" /> Ethics & Operations</h3>
                                                    <FormField
                                                        control={form.control}
                                                        name="shariahTissueHandling"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel className="font-semibold">Describe Shariah-compliant handling of tissues/blood/placenta:</FormLabel>
                                                                <FormControl><Textarea {...field} className="bg-slate-50" /></FormControl>
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        {[
                                                            { id: "bloodTransfusionPolicy", label: "Safe/Permissible Blood Sourcing?" },
                                                            { id: "staffTraining", label: "Staff trained in Halal standards?" },
                                                            { id: "halalLiaison", label: "24/7 Halal patient liaison?" },
                                                            { id: "rightsCharter", label: "Halal patient rights charter?" },
                                                            { id: "multilingualForms", label: "Multilingual consent forms?" },
                                                            { id: "annualAudits", label: "Annual external Halal audits?" },
                                                        ].map((item) => (
                                                            <FormField
                                                                key={item.id}
                                                                control={form.control}
                                                                name={item.id as keyof OnboardingValues}
                                                                render={({ field }) => (
                                                                    <FormItem className="p-3 border rounded-lg bg-white shadow-sm">
                                                                        <FormLabel className="text-sm font-semibold">{item.label}</FormLabel>
                                                                        <RadioGroup onValueChange={field.onChange} value={field.value as string} className="flex gap-4 mt-2">
                                                                            <div className="flex items-center space-x-1"><RadioGroupItem value="yes" className="h-3 w-3" /><label className="text-xs">Yes</label></div>
                                                                            <div className="flex items-center space-x-1"><RadioGroupItem value="no" className="h-3 w-3" /><label className="text-xs">No</label></div>
                                                                        </RadioGroup>
                                                                    </FormItem>
                                                                )}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <CardFooter className="flex justify-between border-t p-6 bg-slate-50">
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={prevStep}
                                disabled={currentStep === 0}
                                className="flex items-center gap-2"
                            >
                                <ChevronLeft className="w-4 h-4" /> Previous
                            </Button>

                            {currentStep === STEPS.length - 1 ? (
                                <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 h-11 px-8 shadow-lg shadow-emerald-100 flex items-center gap-2 transition-all">
                                    Submit Onboarding <Check className="w-4 h-4" />
                                </Button>
                            ) : (
                                <Button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-emerald-600 hover:bg-emerald-700 h-11 px-8 shadow-lg shadow-emerald-100 flex items-center gap-2 transition-all"
                                >
                                    Save & Next <ChevronRight className="w-4 h-4" />
                                </Button>
                            )}
                        </CardFooter>
                    </form>
                </Form>
            </Card>

            <div className="mt-8 flex items-center justify-center gap-4 text-slate-400 text-sm">
                <div className="flex items-center gap-1"><Shield className="w-4 h-4" /> Secure Submission</div>
                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                <div className="flex items-center gap-1"><Check className="w-4 h-4" /> HIPAA/GDPR Compliant</div>
                <div className="w-1 h-1 bg-slate-300 rounded-full" />
                <div className="flex items-center gap-1"><Lock className="w-4 h-4" /> Encrypted Data</div>
            </div>
        </div>
    );
};

export default HospitalOnboardingPage;
