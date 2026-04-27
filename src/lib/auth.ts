import { api } from "./api";

export const adminRegister = async (data: any) => {
    const res = await api.post("/auth/register-admin", data);
    if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);
        if (res.hospitalId) localStorage.setItem("hospitalId", res.hospitalId);
    }
    return res;
};

export const adminLoginPassword = async (email: string, password: string) => {
    const res = await api.post("/auth/login-password", { email, password });
    if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", res.role);
        if (res.hospitalId) localStorage.setItem("hospitalId", res.hospitalId);
    }
    return res;
};

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("hospitalId");
    window.location.href = "/login";
};

export const patientRegister = async (data: any) => {
    const res = await api.post("/patient/register", data);
    if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", "patient");
    }
    return res;
};

export const patientLogin = async (data: any) => {
    const res = await api.post("/patient/login", data);
    if (res.token) {
        localStorage.setItem("token", res.token);
        localStorage.setItem("role", "patient");
    }
    return res;
};

export const isAuthenticated = () => {
    return !!localStorage.getItem("token");
};
