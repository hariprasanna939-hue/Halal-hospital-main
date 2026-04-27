const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

const handleResponse = async (res: Response) => {
    if (!res.ok) {
        let errorMessage = "Request failed";
        try {
            const errorData = await res.json();
            errorMessage = errorData.msg || errorData.message || errorMessage;
        } catch (e) {
            // Not JSON or no error message
        }
        throw new Error(errorMessage);
    }
    return res.json();
};

export const api = {
    get: async (url: string) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}${url}`, {
            headers: {
                "Authorization": token || ""
            }
        });
        return handleResponse(res);
    },

    post: async (url: string, data: any) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token || ""
            },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    postFormData: async (url: string, formData: FormData) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}${url}`, {
            method: "POST",
            headers: {
                "Authorization": token || ""
            },
            body: formData,
        });
        return handleResponse(res);
    },

    put: async (url: string, data: any) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}${url}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token || ""
            },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },

    putFormData: async (url: string, formData: FormData) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}${url}`, {
            method: "PUT",
            headers: {
                "Authorization": token || ""
            },
            body: formData,
        });
        return handleResponse(res);
    },

    patch: async (url: string, data: any) => {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}${url}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token || ""
            },
            body: JSON.stringify(data),
        });
        return handleResponse(res);
    },
};
