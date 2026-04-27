import { api } from "./api";

export const completeOnboarding = async (data: any) => {
    const hospitalId = localStorage.getItem("hospitalId");
    if (!hospitalId) throw new Error("Hospital ID not found");

    return await api.put("/hospital/onboarding", {
        ...data,
        hospitalId
    });
};

export const getHospitals = async () => {
    return await api.get("/hospital");
};

export const getHospitalDetails = async (id: string) => {
    return await api.get(`/hospital/${id}`);
};
