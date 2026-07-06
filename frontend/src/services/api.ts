import axios from "axios";

const api = axios.create({

    baseURL: "http://localhost:5000/api"

});

// ================= Dashboard =================

export async function getDashboardStats() {

    const response = await api.get("/dashboard/stats");

    return response.data;

}

// ================= Records =================

export async function getRecords(params: {
    search?: string;
    page?: number;
    limit?: number;
    city?: string;
    sort?: string;
    order?: string;
}) {

    const response = await api.get("/records", {

        params

    });

    return response.data;

}

export async function getUploadHistory() {

    const response = await api.get("/upload/history");

    return response.data;

}
// ================= Upload CSV =================

export async function uploadCSV(file: File) {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(

        "/upload",

        formData,

        {

            headers: {

                "Content-Type": "multipart/form-data"

            }

        }

    );

    return response.data;

}

export default api;