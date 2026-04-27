"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import MedicalInquiryForm from "./MedicalInquiryForm";
import { X } from "lucide-react";

interface MedicalInquiryModalProps {
    open: boolean;
    onClose: () => void;
    hospitalName?: string;
}

const MedicalInquiryModal = ({ open, onClose, hospitalName }: MedicalInquiryModalProps) => {
    return (
        <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
            <DialogContent className="max-w-[480px] p-0 bg-transparent border-none shadow-none">
                <DialogHeader className="hidden">
                    <DialogTitle>Medical Inquiry</DialogTitle>
                </DialogHeader>

                <div className="relative">
                    {/* Subtle Close Button (Standard Dialog close is enough, but adding custom feel) */}
                    <MedicalInquiryForm hospitalName={hospitalName} />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MedicalInquiryModal;
