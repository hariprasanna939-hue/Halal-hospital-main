import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import EntryLogin from "./pages/EntryLogin";
import PatientLogin from "./pages/PatientLogin";
import PatientSignup from "./pages/PatientSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/AdminLayout";
import HomePage from "./pages/HomePage";
import HospitalsPage from "./pages/HospitalsPage";
import PatientStoriesPage from "./pages/PatientStoriesPage";
import BlogsPage from "./pages/BlogsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import DoctorAvailability from "./pages/admin/DoctorAvailability";
import HospitalProfilePage from "./pages/admin/HospitalProfilePage";
import DepartmentsPage from "./pages/admin/DepartmentsPage";
import AnnouncementsPage from "./pages/admin/AnnouncementsPage";
import AccountSettingsPage from "./pages/admin/AccountSettingsPage";
import PatientOverview from "./pages/admin/PatientOverview";
import PatientHospitalPreview from "./pages/PatientHospitalPreview";
import PatientProfilePage from "./pages/PatientProfilePage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Entry */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<EntryLogin />} />
          <Route path="/patient-login" element={<PatientLogin />} />
          <Route path="/patient-signup" element={<PatientSignup />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-signup" element={<AdminSignup />} />

          {/* Public Website */}
          <Route element={<PublicLayout />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/hospitals" element={<HospitalsPage />} />
            <Route path="/patient-stories" element={<PatientStoriesPage />} />
            <Route path="/blogs" element={<BlogsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>

          {/* Admin Portal */}
          <Route element={<ProtectedRoute role="hospital_admin" />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/doctors" element={<DoctorAvailability />} />
              <Route path="/admin/profile" element={<HospitalProfilePage />} />
              <Route path="/admin/departments" element={<DepartmentsPage />} />
              <Route path="/admin/announcements" element={<AnnouncementsPage />} />
              <Route path="/admin/settings" element={<AccountSettingsPage />} />
              <Route path="/admin/patients" element={<PatientOverview />} />
            </Route>
            <Route path="/admin/preview" element={<PatientHospitalPreview />} />
          </Route>

          {/* Patient Protected Routes */}
          <Route element={<ProtectedRoute role="patient" />}>
            <Route element={<PublicLayout />}>
              <Route path="/profile" element={<PatientProfilePage />} />
            </Route>
          </Route>

          <Route element={<PublicLayout />}>
            <Route path="/hospitals/:id/preview" element={<PatientHospitalPreview />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
