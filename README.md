# 🏥 Halal Medical - Healthcare Management Platform

![Project Banner](https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000)

## 🌟 Overview
Halal Medical is a state-of-the-art, full-stack healthcare management ecosystem designed to bridge the gap between medical institutions and patients. It provides a seamless, real-time experience for hospital administration, doctor management, and patient engagement, all wrapped in a premium, high-performance user interface.

## 🚀 Key Modules & Features

### 🏢 Hospital Administration Portal
A centralized command center for hospital administrators to manage their institution's digital presence and operations.
- **Dynamic Hospital Profile:** Customize banners, logos, and descriptions in real-time.
- **Department Management:** Organize medical departments with specialized services and metadata.
- **Doctor Availability:** Manage specialist schedules and availability status.
- **Patient Overview:** Track inquiries and patient interactions.
- **Real-time Announcements:** Broadcast urgent updates to the patient portal instantly via Socket.IO.

### 👤 Patient Portal
A user-centric platform for individuals to find and interact with healthcare providers.
- **Advanced Hospital Search:** AI-powered search suggestions to find the right medical facility.
- **Interactive Previews:** View live hospital profiles with up-to-date department and doctor information.
- **Inquiry System:** Direct communication channel to send inquiries to specific hospitals.
- **Secure Health Records:** (Implementation in progress) Module for patients to upload and manage medical reports.

### 🔒 Security & Authentication
- **Access Gateway:** A mandatory authentication layer that protects internal portal data.
- **Role-Based Access Control (RBAC):** Distinct permissions for Patients, Doctors, and Hospital Admins.
- **JWT Authentication:** Secure session management across frontend and backend.

### ⚡ Real-Time Synchronization
Powered by **Socket.IO**, the platform ensures that changes made in the Admin Dashboard (such as banner updates or new announcements) are reflected on the Patient side immediately without page refreshes.

---

## 🛠 Technology Stack

### Frontend
- **Framework:** [Vite](https://vitejs.dev/) + [React](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom UI components with "Antigravity" design philosophy)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) for cinematic transitions.
- **Icons:** [Lucide React](https://lucide.dev/)
- **State Management:** React Context API & Hooks

### Backend
- **Runtime:** [Node.js](https://nodejs.org/)
- **Framework:** [Express](https://expressjs.com/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Real-time:** [Socket.IO](https://socket.io/)
- **Authentication:** JSON Web Tokens (JWT) & bcrypt

---

## 📂 Project Structure

```text
Halal-Medical-main/
├── backend/                # Node.js Express Backend
│   ├── config/             # Database & environment config
│   ├── controllers/        # Business logic for routes
│   ├── models/             # Mongoose schemas (User, hospital, etc.)
│   ├── routes/             # API endpoints
│   ├── server.js           # Entry point & Socket.IO initialization
│   └── seed.js             # Initial database seeding script
├── src/                    # Vite React Frontend
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page layouts (Admin, Patient, Public)
│   ├── lib/                # Utility functions & shared logic
│   ├── App.tsx             # Main routing & provider setup
│   └── main.tsx            # React entry point
└── public/                 # Static assets
```

---

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - New user registration
- `POST /api/auth/login` - User authentication
- `GET /api/auth/me` - Get current user context

### Hospitals
- `GET /api/hospitals` - List all hospitals
- `GET /api/hospitals/:id` - Get detailed hospital profile
- `PUT /api/hospitals/:id` - Update hospital details (Admin)

### Administration
- `GET /api/admin/doctors` - Manage doctor list
- `POST /api/admin/announcements` - Create new live announcement
- `GET /api/admin/stats` - Hospital dashboard statistics

### Inquiries
- `POST /api/inquiry/send` - Send a message to a hospital
- `GET /api/inquiry/hospital/:id` - View inquiries received by a hospital

---

## 📊 Database Schema (High-Level)
- **User:** Stores credentials and roles (Patient, Admin).
- **Hospital:** Institutional profiles including departments, services, and visuals.
- **Doctor:** Individual specialist profiles linked to hospitals.
- **Inquiry:** Patient messages and contact information.
- **Department:** Categorization of services within a hospital.

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (Running locally or MongoDB Atlas)

### 1. Setup Backend
```bash
cd backend
npm install
# Create a .env file with:
# PORT=5000
# MONGODB_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret
node server.js
```

### 2. Setup Frontend
```bash
# From the root directory
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

---

## 📈 Future Roadmap
- [ ] **Telemedicine Integration:** Virtual consultations via video calls.
- [ ] **AI Diagnostics Assistant:** Helping patients categorize symptoms before inquiry.
- [ ] **Multi-language Support:** Specialized focus on Halal-certified medical tourism.
- [ ] **Mobile App Expansion:** Dedicated React Native apps for iOS and Android.

---

## 🎨 Design Philosophy
The "Antigravity" design system used in this project focuses on:
- **Depth & Dimension:** Subtle shadows and glassmorphism.
- **Fluidity:** Every interaction is animated to provide feedback.
- **Trust:** A clean, professional aesthetic tailored for the healthcare industry.

---
© 2026 Halal Medical. Built for excellence in healthcare.
