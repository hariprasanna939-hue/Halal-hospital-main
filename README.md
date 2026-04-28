# 🏥 HalalMedi — Halal-Certified Healthcare Management Platform

![Project Banner](https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000)

## 🌟 Overview

**HalalMedi** is a full-stack, production-grade healthcare management ecosystem designed to connect Halal-certified medical institutions with patients worldwide. The platform provides real-time hospital administration, Halal compliance tracking, patient inquiry management, and a Super Admin coordination layer — all wrapped in a premium **"Antigravity"** design system.

---

## 🚀 Key Modules & Features

### 🏢 Hospital Administration Portal (`/admin/*`)
A centralized command center for hospital administrators.

| Page | Description |
|------|-------------|
| **Dashboard** | Overview of hospital activity and statistics |
| **Hospital Onboarding** | Multi-step onboarding with Halal compliance verification (food, prayer, gender care, Shariah compliance) |
| **Hospital Profile** | Customize banners, logos, descriptions, contact info |
| **Department Management** | Organize medical departments with specialized services |
| **Doctor Availability** | Manage specialist schedules and availability status |
| **Patient Inquiries** | View and respond to patient inquiries assigned to this hospital |
| **Change Requests** | Submit requests for profile changes (approved by Super Admin) |
| **Announcements** | Broadcast updates to the patient portal via Socket.IO |
| **Patient Overview** | Track patient interactions |
| **Account Settings** | Admin profile, password management |

### 🛡️ Super Admin Portal
A coordination layer for system-wide management.

- **Inquiry Coordination** — View all inquiries across the platform and assign them to the correct specialist hospitals
- **Hospital Approvals** — Review and approve/reject hospital change requests
- **Hospital Management** — Update any hospital profile, banner, departments, and doctors
- **Full RBAC** — Separate role-based access (`admin` / `super_admin`)

### 👤 Patient Portal
A user-centric platform for individuals to find and interact with healthcare providers.

| Page | Description |
|------|-------------|
| **Home** | Landing page with search and featured hospitals |
| **Hospitals** | Browse Halal-certified hospitals with filters (location, specialty) |
| **Hospital Preview** | Live hospital profiles with departments, doctors, and Halal compliance details |
| **Send Inquiry** | Direct communication channel to specific hospitals |
| **Patient Profile** | Complete medical profile with personal, medical, and emergency info |
| **Patient Stories** | Community health stories and experiences |
| **Blog** | Healthcare articles and Halal medical tourism content |
| **About / Contact** | Platform information and contact forms |

### 🔒 Security & Authentication

| Feature | Details |
|---------|---------|
| **Access Gateway** | Mandatory auth layer protecting all internal routes (`/login`) |
| **Role-Based Access (RBAC)** | Distinct permissions: `patient`, `hospital_admin`, `admin`, `super_admin` |
| **JWT Authentication** | Secure token-based sessions (1-hour expiry for admins, 7-day for patients) |
| **Password Hashing** | bcrypt with salted hashes |
| **Protected Routes** | Frontend `ProtectedRoute` component enforcing auth |

### ⚡ Real-Time Synchronization
Powered by **Socket.IO** — changes in the Admin Dashboard (banner updates, announcements) reflect on the Patient side instantly without page refresh. Includes fallback polling every 10 seconds.

---

## 🛠 Technology Stack

### Frontend
| Technology | Purpose |
|-----------|---------|
| [Vite](https://vitejs.dev/) v5 | Build tooling & dev server |
| [React](https://reactjs.org/) v18 + TypeScript | UI framework |
| [Tailwind CSS](https://tailwindcss.com/) v3 | Utility-first styling |
| [shadcn/ui](https://ui.shadcn.com/) + Radix UI | Premium UI components |
| [Framer Motion](https://www.framer.com/motion/) | Cinematic animations |
| [Lucide React](https://lucide.dev/) | Icon system |
| [React Router](https://reactrouter.com/) v6 | Client-side routing |
| [Socket.IO Client](https://socket.io/) | Real-time updates |
| [Sonner](https://sonner.emilkowal.dev/) | Toast notifications |
| [Recharts](https://recharts.org/) | Dashboard charts |
| [Zod](https://zod.dev/) + React Hook Form | Form validation |

### Backend
| Technology | Purpose |
|-----------|---------|
| [Node.js](https://nodejs.org/) v18+ | Runtime |
| [Express](https://expressjs.com/) v5 | API framework |
| [MongoDB Atlas](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/) v9 | Database & ODM |
| [Socket.IO](https://socket.io/) v4 | Real-time WebSockets |
| [JWT](https://jwt.io/) + bcryptjs | Authentication |
| [Multer](https://github.com/expressjs/multer) | File upload (banner images) |
| [Cloudinary](https://cloudinary.com/) | Cloud image storage |

---

## 📂 Project Structure

```
Halal-Medical-main/
├── backend/                    # Node.js Express Backend
│   ├── config/
│   │   ├── db.js               # MongoDB connection
│   │   └── multer.js           # File upload configuration
│   ├── controllers/
│   │   ├── adminController.js  # Hospital management (Super Admin)
│   │   ├── authController.js   # Registration, login, profile
│   │   ├── changeRequestController.js  # Change request workflow
│   │   ├── hospitalController.js       # Hospital CRUD + onboarding
│   │   ├── inquiryController.js        # Inquiry submit, assign, status
│   │   └── patientController.js        # Patient auth & profile
│   ├── middleware/
│   │   ├── auth.js             # JWT verification middleware
│   │   └── roles.js            # RBAC: hospitalOnly, superAdminOnly
│   ├── models/
│   │   ├── ChangeRequest.js    # Change request schema
│   │   ├── Department.js       # Hospital departments
│   │   ├── Doctor.js           # Doctor profiles
│   │   ├── Hospital.js         # Hospital profile + Halal compliance
│   │   ├── Inquiry.js          # Patient inquiries
│   │   ├── Patient.js          # Patient profile + medical info
│   │   └── User.js             # Admin/Hospital user accounts
│   ├── routes/
│   │   ├── adminRoutes.js      # /api/admin/*
│   │   ├── authRoutes.js       # /api/auth/*
│   │   ├── hospitalRoutes.js   # /api/hospital/*
│   │   ├── inquiryRoutes.js    # /api/inquiry/*
│   │   └── patientRoutes.js    # /api/patient/*
│   ├── .env                    # Environment variables
│   ├── server.js               # Entry point + Socket.IO init
│   └── seed.js                 # Database seeding script
│
├── src/                        # Vite React Frontend
│   ├── components/
│   │   ├── ui/                 # 49 shadcn/ui components
│   │   ├── AdminLayout.tsx     # Hospital admin sidebar layout
│   │   ├── PublicLayout.tsx    # Public pages navbar + footer
│   │   ├── ProtectedRoute.tsx  # Auth guard wrapper
│   │   ├── HospitalBannerView.tsx
│   │   ├── MedicalInquiryForm.tsx
│   │   └── MedicalInquiryModal.tsx
│   ├── pages/
│   │   ├── admin/              # Hospital & Super Admin pages
│   │   │   ├── AdminDashboard.tsx
│   │   │   ├── HospitalOnboardingPage.tsx
│   │   │   ├── HospitalProfilePage.tsx
│   │   │   ├── InquiriesPage.tsx
│   │   │   ├── SuperAdminInquiries.tsx
│   │   │   ├── DepartmentsPage.tsx
│   │   │   ├── DoctorAvailability.tsx
│   │   │   ├── AnnouncementsPage.tsx
│   │   │   ├── PatientOverview.tsx
│   │   │   ├── AccountSettings.tsx
│   │   │   └── AccountSettingsPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── HospitalsPage.tsx
│   │   ├── HospitalPublicDetails.tsx
│   │   ├── PatientHospitalPreview.tsx
│   │   ├── PatientLogin.tsx
│   │   ├── PatientSignup.tsx
│   │   ├── PatientProfilePage.tsx
│   │   ├── AdminLogin.tsx
│   │   ├── AdminSignup.tsx
│   │   ├── EntryLogin.tsx
│   │   ├── AboutPage.tsx
│   │   ├── BlogsPage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── PatientStoriesPage.tsx
│   │   └── NotFound.tsx
│   ├── lib/
│   │   ├── api.ts              # Centralized API helper (fetch wrapper)
│   │   ├── auth.ts             # Auth service (login, register, logout)
│   │   ├── socket.ts           # Socket.IO client instance
│   │   └── utils.ts            # Utility functions
│   ├── App.tsx                 # Main routing & provider setup
│   └── main.tsx                # React entry point
│
└── public/                     # Static assets
```

---

## 📡 API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register-admin` | ❌ | Register new hospital admin (auto-creates hospital) |
| `POST` | `/login-password` | ❌ | Admin login (email + password) |
| `GET` | `/me` | ✅ | Get current logged-in user |
| `PUT` | `/profile` | ✅ | Update user profile |

### Hospitals (`/api/hospital`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/` | ❌ | List all hospitals (public) |
| `GET` | `/:id` | ❌ | Hospital details with departments & doctors |
| `GET` | `/:id/public` | ❌ | Public Halal compliance data |
| `POST` | `/login` | ❌ | Hospital login by mobile number |
| `POST` | `/upload` | ✅🏥 | Upload hospital banner image |
| `PUT` | `/onboarding` | ✅🏥 | Complete hospital onboarding |
| `POST` | `/change-request` | ✅🏥 | Submit a change request |
| `GET` | `/change-requests` | ✅🏥 | View submitted change requests |

### Patient (`/api/patient`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/register` | ❌ | Patient registration |
| `POST` | `/login` | ❌ | Patient login |
| `GET` | `/` | ✅ | List all patients (admin) |
| `GET` | `/profile` | ✅ | Get patient profile |
| `PUT` | `/profile` | ✅ | Update patient profile |

### Inquiries (`/api/inquiry`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/` | ❌ | Submit new inquiry |
| `GET` | `/hospital/:id` | ✅ | Get inquiries for a hospital |
| `PATCH` | `/:id/status` | ✅ | Update inquiry status |
| `GET` | `/all` | ✅👑 | All inquiries (Super Admin only) |
| `POST` | `/assign/:id` | ✅👑 | Assign inquiry to hospital |

### Administration (`/api/admin`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/login` | ❌ | Super Admin login |
| `PUT` | `/hospital` | ✅👑 | Update any hospital |
| `PUT` | `/hospital/banner` | ✅👑 | Update hospital banner |
| `POST` | `/departments` | ✅👑 | Add department |
| `POST` | `/doctors` | ✅👑 | Add doctor |
| `GET` | `/change-requests` | ✅👑 | View all change requests |
| `POST` | `/approve/:id` | ✅👑 | Approve change request |
| `POST` | `/reject/:id` | ✅👑 | Reject change request |

> **Legend:** ✅ = Requires auth token | 🏥 = Hospital Admin only | 👑 = Super Admin only

---

## 📊 Database Models

| Model | Description | Key Fields |
|-------|-------------|------------|
| **User** | Admin/Hospital user accounts | `fullName`, `email`, `password`, `role`, `hospitalId` |
| **Patient** | Patient profiles with medical info | `fullName`, `email`, `dob`, `gender`, `bloodGroup`, `medicalInfo`, `emergencyContact`, `profileComplete` |
| **Hospital** | Hospital profiles + full Halal compliance | `name`, `city`, `bannerImage`, `treatmentAreas`, `halalCertification`, `prayerRooms`, `sameGenderCare`, `halalFoodKitchen`, `onboardingStatus` |
| **Department** | Hospital departments | `name`, `hospitalId`, `services` |
| **Doctor** | Doctor profiles | `name`, `expertise`, `hospitalId`, `availability` |
| **Inquiry** | Patient medical inquiries | `patientName`, `message`, `treatmentInterest`, `hospitalId`, `sourceHospitalId`, `status` |
| **ChangeRequest** | Hospital change requests | `hospitalId`, `requestType`, `details`, `status` |

---

## ⚙️ Getting Started

### Prerequisites
- **Node.js** v18+
- **MongoDB** (MongoDB Atlas recommended)

### 1. Clone the Repository
```bash
git clone https://github.com/hariprasanna939/Halal-hospital-main.git
cd Halal-Medical-main
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
PORT=5050
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend server:
```bash
node server.js
# Server running on port 5050
# MongoDB Connected: ...
```

### 3. Setup Frontend
```bash
# From root directory
npm install
npm run dev
```

The application will be available at `http://localhost:8080` (or the next available port).

### 4. Access the Application

| Portal | URL | Credentials |
|--------|-----|-------------|
| **Entry Gateway** | `/login` | Choose Patient or Admin |
| **Patient Login** | `/patient-login` | Register new account |
| **Admin Login** | `/admin-login` | Register new hospital admin |
| **Admin Dashboard** | `/admin/dashboard` | After admin login |
| **Hospitals (Public)** | `/hospitals` | No login needed |

---

## 🌙 Halal Compliance Features

HalalMedi uniquely tracks and verifies:

- ✅ **Halal Food Kitchen** — Certified Halal food preparation
- ✅ **Prayer Rooms** — Dedicated prayer spaces with Qibla marking
- ✅ **Same-Gender Care** — Gender-segregated medical services
- ✅ **Shariah-Compliant Tissue Handling** — Ethical medical procedures
- ✅ **Hijab Accommodation** — Cultural sensitivity in care
- ✅ **Blood Transfusion Policy** — Compliant policies
- ✅ **Halal Liaison Officer** — Dedicated compliance staff
- ✅ **Annual Halal Audits** — Ongoing certification verification

---

## 📈 Future Roadmap

- [ ] **Telemedicine Integration** — Virtual consultations via video calls
- [ ] **AI Diagnostics Assistant** — Symptom categorization before inquiry
- [ ] **Multi-Language Support** — Arabic, Malay, Turkish, Urdu
- [ ] **Halal Medical Tourism Packages** — End-to-end travel + treatment booking
- [ ] **Mobile App** — React Native apps for iOS and Android
- [ ] **Payment Gateway** — Secure payment processing for consultations

---

## 🎨 Design Philosophy

The **"Antigravity"** design system focuses on:

- **Depth & Dimension** — Glassmorphism, subtle shadows, layered cards with rounded corners (`rounded-[32px]`)
- **Fluidity** — Every interaction animated with Framer Motion (spring physics, staggered reveals)
- **Trust** — Clean, professional aesthetic tailored for healthcare (Apple-inspired color palette)
- **Premium Feel** — Custom color tokens, `slate-900` dark accents, gradient overlays, micro-animations

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

© 2026 HalalMedi. Built for excellence in Halal-certified healthcare.
